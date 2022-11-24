import React, {
    HTMLProps, useCallback, useEffect, useMemo, useRef, useState
} from 'react';
import { Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Nullable, Undefinable } from 'tsdef';

import { ChonkyActions } from '../../action-definitions/index';
import { selectThumbnailGenerator } from '../../redux/selectors';
import { thunkRequestFileAction } from '../../redux/thunks/dispatchers.thunks';
import { FileData } from '../../types/file.types';
import { ChonkyIconName } from '../../types/icons.types';
import { FileHelper } from '../../util/file-helper';
import { ColorsDark, ColorsLight, useIconData } from '../../util/icon-helper';
import { Logger } from '../../util/logger';
import { TextPlaceholder } from '../external/TextPlaceholder';
import { KeyboardClickEvent, MouseClickEvent } from '../internal/ClickableWrapper';
import { FileEntryState } from './GridEntryPreview';

export const useFileEntryHtmlProps = (file: Nullable<FileData>): HTMLProps<HTMLDivElement> => {
    return useMemo(() => {
        const dataProps: { [prop: string]: Undefinable<string> } = {
            'data-test-id': 'file-entry',
            'data-chonky-file-id': file ? file.id : undefined,
        };

        return {
            role: 'listitem',
            ...dataProps,
        };
    }, [file]);
};

export const useFileEntryState = (file: Nullable<FileData>, selected: boolean, focused: boolean) => {
    const iconData = useIconData(file);
    const { thumbnailUrl, thumbnailLoading } = useThumbnailUrl(file);

    return useMemo<FileEntryState>(() => {
        const fileColor = thumbnailUrl ? ColorsDark[iconData.colorCode] : ColorsLight[iconData.colorCode];
        const iconSpin = thumbnailLoading || !file;
        const icon = thumbnailLoading ? ChonkyIconName.loading : iconData.icon;

        return {
            childrenCount: FileHelper.getChildrenCount(file),
            icon: file && file.icon !== undefined ? file.icon : icon,
            iconSpin: iconSpin,
            thumbnailUrl: thumbnailUrl,
            color: file && file.color !== undefined ? file.color : fileColor,
            selected: selected,
            focused: !!focused,
        };
    }, [file, focused, iconData, selected, thumbnailLoading, thumbnailUrl]);
};

export const useFileNameComponent = (file: Nullable<FileData>, className: string) => {
    return useMemo(() => {
        if (!file) return <TextPlaceholder minLength={15} maxLength={20} />;

        return <Typography.Text className={className} ellipsis>{file.name}</Typography.Text>
    }, [file]);
};

export const useThumbnailUrl = (file: Nullable<FileData>) => {
    const thumbnailGenerator = useSelector(selectThumbnailGenerator);
    const [thumbnailUrl, setThumbnailUrl] = useState<Nullable<string>>(null);
    const [thumbnailLoading, setThumbnailLoading] = useState<boolean>(false);
    const loadingAttempts = useRef(0);

    useEffect(() => {
        let loadingCancelled = false;

        if (file) {
            if (thumbnailGenerator) {
                if (loadingAttempts.current === 0) {
                    setThumbnailLoading(true);
                }
                loadingAttempts.current++;
                Promise.resolve()
                    .then(() => thumbnailGenerator(file))
                    .then((thumbnailUrl: any) => {
                        if (loadingCancelled) return;
                        setThumbnailLoading(false);

                        if (thumbnailUrl && typeof thumbnailUrl === 'string') {
                            setThumbnailUrl(thumbnailUrl);
                        }
                    })
                    .catch(error => {
                        if (!loadingCancelled) setThumbnailLoading(false);
                        Logger.error(`User-defined "thumbnailGenerator" handler threw an error: ${error.message}`);
                    });
            } else if (file.thumbnailUrl) {
                setThumbnailUrl(file.thumbnailUrl);
            }
        }

        return () => {
            loadingCancelled = true;
        };
    }, [file, setThumbnailUrl, setThumbnailLoading, thumbnailGenerator]);

    return { thumbnailUrl, thumbnailLoading };
};

export const useFileClickHandlers = (file: Nullable<FileData>, displayIndex: number) => {
    const dispatch = useDispatch();

    // Prepare base handlers
    const onMouseClick = useCallback(
        (event: MouseClickEvent, clickType: 'single' | 'double') => {
            if (!file) return;

            dispatch(
                // @ts-ignore
                thunkRequestFileAction(ChonkyActions.MouseClickFile, {
                    clickType,
                    file,
                    fileDisplayIndex: displayIndex,
                    altKey: event.altKey,
                    ctrlKey: event.ctrlKey,
                    shiftKey: event.shiftKey,
                })
            );
        },
        [dispatch, file, displayIndex]
    );
    const onKeyboardClick = useCallback(
        (event: KeyboardClickEvent) => {
            if (!file) return;

            dispatch(
                // @ts-ignore
                thunkRequestFileAction(ChonkyActions.KeyboardClickFile, {
                    file,
                    fileDisplayIndex: displayIndex,
                    enterKey: event.enterKey,
                    spaceKey: event.spaceKey,
                    altKey: event.altKey,
                    ctrlKey: event.ctrlKey,
                    shiftKey: event.shiftKey,
                })
            );
        },
        [dispatch, file, displayIndex]
    );

    // Prepare single/double click handlers
    const onSingleClick = useCallback((event: MouseClickEvent) => onMouseClick(event, 'single'), [onMouseClick]);
    const onDoubleClick = useCallback((event: MouseClickEvent) => onMouseClick(event, 'double'), [onMouseClick]);

    return {
        onSingleClick,
        onDoubleClick,
        onKeyboardClick,
    };
};
