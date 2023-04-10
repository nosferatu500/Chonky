import React, { UIEvent, useCallback } from 'react';
import { useSelector } from 'react-redux';
import AutoSizer, { Size } from 'react-virtualized-auto-sizer';

import { ChonkyActions } from '../../action-definitions/index';
import { selectFileViewConfig, selectors } from '../../redux/selectors';
import { FileViewMode } from '../../types/file-view.types';
import {
    c, makeGlobalChonkyStyles, makeLocalChonkyStyles
} from '../../util/styles';
import { FileListEmpty } from './FileListEmpty';
import { GridContainer } from './GridContainer';
import { ListContainer } from './ListContainer';

export interface FileListProps {
    onScroll?: (e: UIEvent<HTMLDivElement>) => void;
}

export const FileList: React.FC<FileListProps> = React.memo((props: FileListProps) => {
    const displayFileIds = useSelector(selectors.getDisplayFileIds);
    const viewConfig = useSelector(selectFileViewConfig);

    const localClasses = useLocalStyles();
    const classes = useStyles(viewConfig);
    const { onScroll } = props;

    // In Chonky v0.x, this field was user-configurable. In Chonky v1.x+, we hardcode
    // this to `true` to simplify configuration. Users can just wrap Chonky in their
    // own `div` if they want to have finer control over the height.
    const fillParentContainer = true;

    const listRenderer = useCallback(
        (size: Size) => {
            if (displayFileIds.length === 0) {
                return <FileListEmpty width={size.width || 300} height={viewConfig.entryHeight} />;
            } else if (viewConfig.mode === FileViewMode.List) {
                return <ListContainer width={size.width || 300} height={(size.height || 300) + 150} />;
            } else {
                return <GridContainer width={size.width || 300} height={(size.height || 300) + 150} />;
            }
        },
        [displayFileIds, viewConfig]
    );

    return (
        <div onScroll={onScroll} className={c([classes.fileListWrapper, localClasses.fileListWrapper])} role="list">
            <AutoSizer disableHeight={!fillParentContainer}>{listRenderer}</AutoSizer>
        </div>
    );
});
FileList.displayName = 'FileList';

const useLocalStyles = makeLocalChonkyStyles({
    // @ts-ignore
    fileListWrapper: {
        minHeight: ChonkyActions.EnableGridView.fileViewConfig.entryHeight + 2,
        background: () => 'none',
    },
});

const useStyles = makeGlobalChonkyStyles(() => ({
    fileListWrapper: {
        height: '100%',
        maxHeight: '100%',
    },
}));
