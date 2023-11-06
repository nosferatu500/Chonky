import React, { useState } from 'react';
import { Nullable } from 'tsdef';

import { selectFileData, selectIsFileSelected } from '../../redux/selectors';
import { useParamSelector } from '../../redux/store';
import { FileEntryProps } from '../../types/file-list.types';
import { FileViewMode } from '../../types/file-view.types';
import { FileHelper } from '../../util/file-helper';
import { ClickableWrapper, ClickableWrapperProps } from '../internal/ClickableWrapper';
import { useFileClickHandlers } from './FileEntry-hooks';
import { GridEntry } from './GridEntry';
import { ListEntry } from './ListEntry';
import { GlobalToken, theme } from 'antd';

export interface SmartFileEntryProps {
    fileId: Nullable<string>;
    displayIndex: number;
    fileViewMode: FileViewMode;
}

export const SmartFileEntry: React.FC<SmartFileEntryProps> = React.memo(({ fileId, displayIndex, fileViewMode }) => {
    const { token } = theme.useToken();
    const classes = makeStyles(token);

    // Basic properties
    const file = useParamSelector(selectFileData, fileId);
    const selected = useParamSelector(selectIsFileSelected, fileId);

    // Clickable wrapper properties
    const fileClickHandlers = useFileClickHandlers(file, displayIndex);
    const [focused, setFocused] = useState(false);
    const clickableWrapperProps: ClickableWrapperProps = {
        wrapperTag: 'div',
        passthroughProps: { style: classes.fileEntryClickableWrapper },
        ...(FileHelper.isClickable(file) ? fileClickHandlers : undefined),
        setFocused,
    };

    // File entry properties
    const fileEntryProps: FileEntryProps = {
        file,
        selected,
        focused,
    };

    let EntryComponent: React.FC<FileEntryProps>;
    if (fileViewMode === FileViewMode.List) EntryComponent = ListEntry;
    else EntryComponent = GridEntry;

    return (
        <ClickableWrapper {...clickableWrapperProps}>
            <EntryComponent {...fileEntryProps} />
        </ClickableWrapper>
    );
});
SmartFileEntry.displayName = 'SmartFileEntry';

const makeStyles = (_token: GlobalToken): Record<string, React.CSSProperties> => ({
    fileEntryClickableWrapper: {
        // We disable default browser outline because Chonky provides its own outline
        // (which doesn't compromise accessibility, hopefully)
        outline: 'none !important',
        position: 'relative',
        height: '100%',
    },
});
