import React, { useContext, useMemo } from 'react';

import { FileEntryProps } from '../../types/file-list.types';
import { useLocalizedFileEntryStrings } from '../../util/i18n';
import { ChonkyIconContext } from '../../util/icon-helper';
import { c, makeLocalChonkyStyles } from '../../util/styles';
import { TextPlaceholder } from '../external/TextPlaceholder';
import {
    useFileEntryHtmlProps,
    useFileEntryState,
} from './FileEntry-hooks';
import { FileEntryName } from './FileEntryName';
import { FileEntryState, useCommonEntryStyles } from './GridEntryPreview';

interface StyleState {
    entryState: FileEntryState;
}

export const ListEntry: React.FC<FileEntryProps> = React.memo(
    ({ file, selected, focused }) => {
        const entryState: FileEntryState = useFileEntryState(file, selected, focused);

        const { fileModDateString, fileSizeString } = useLocalizedFileEntryStrings(
            file
        );
        const styleState = useMemo<StyleState>(
            () => ({
                entryState,
            }),
            [entryState]
        );
        const classes = useStyles(styleState);
        const commonClasses = useCommonEntryStyles(entryState);
        const ChonkyIcon = useContext(ChonkyIconContext);
        const fileEntryHtmlProps = useFileEntryHtmlProps(file);
        return (
            <div className={classes.listFileEntry} {...fileEntryHtmlProps}>
                <div className={commonClasses.focusIndicator}></div>
                <div
                    className={c([
                        commonClasses.selectionIndicator,
                        classes.listFileEntrySelection,
                    ])}
                ></div>
                <div className={classes.listFileEntryIcon}>
                    <ChonkyIcon
                        icon={entryState.icon}
                        spin={entryState.iconSpin}
                        fixedWidth={true}
                    />
                </div>
                <div
                    className={classes.listFileEntryName}
                    title={file ? file.name : undefined}
                >
                    <FileEntryName file={file} />
                </div>
                <div className={classes.listFileEntryProperty}>
                    {file ? (
                        fileModDateString ?? <span>—</span>
                    ) : (
                        <TextPlaceholder minLength={5} maxLength={15} />
                    )}
                </div>
                <div className={classes.listFileEntryProperty}>
                    {file ? (
                        fileSizeString ?? <span>—</span>
                    ) : (
                        <TextPlaceholder minLength={10} maxLength={20} />
                    )}
                </div>
            </div>
        );
    }
);

// @ts-ignore
const useStyles = makeLocalChonkyStyles(theme => ({
    listFileEntry: {
        boxShadow: `inset ${theme.palette.divider} 0 -1px 0`,
        fontSize: theme.listFileEntry.fontSize,
        color: () => 'inherit',
        alignItems: 'center',
        position: 'relative',
        display: 'flex',
        height: '100%',
    },
    listFileEntrySelection: {
        opacity: 0.6,
    },
    listFileEntryIcon: {
        color: ({ entryState }: StyleState) => entryState.color,
        fontSize: theme.listFileEntry.iconFontSize,
        boxSizing: 'border-box',
        padding: [2, 4],
        zIndex: 20,
    },
    listFileEntryName: {
        textOverflow: 'ellipsis',
        boxSizing: 'border-box',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        flex: '1 1 300px',
        paddingLeft: 8,
        zIndex: 20,
    },
    listFileEntryProperty: {
        fontSize: theme.listFileEntry.propertyFontSize,
        boxSizing: 'border-box',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        flex: '0 1 150px',
        padding: [2, 8],
        zIndex: 20,
    },
}));
