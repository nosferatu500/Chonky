import React, { useContext } from 'react';
import { Nullable } from 'tsdef';

import { ChonkyIconName } from '../../types/icons.types';
import { ChonkyIconContext } from '../../util/icon-helper';
import { c, important, makeLocalChonkyStyles } from '../../util/styles';
import { FileThumbnail } from './FileThumbnail';

export type FileEntryState = {
    color: string;
    icon: ChonkyIconName | string;
    thumbnailUrl: Nullable<string>;
    iconSpin: boolean;
    selected: boolean;
    focused: boolean;
};

export interface FileEntryPreviewProps {
    className?: string;
    entryState: FileEntryState;
}

export const GridEntryPreviewFolder: React.FC<FileEntryPreviewProps> = React.memo(props => {
    const { className: externalClassName, entryState } = props;

    const folderClasses = useFolderStyles(entryState);
    const fileClasses = useFileStyles(entryState);
    const commonClasses = useCommonEntryStyles(entryState);
    const className = c({
        [folderClasses.previewFile]: true,
        [externalClassName || '']: !!externalClassName,
    });
    return (
        <div className={className}>
            <div className={folderClasses.folderBackSideMid}>
                <div className={folderClasses.folderBackSideTop} />
                <div className={folderClasses.folderFrontSide}>
                    <div className={commonClasses.selectionIndicator}></div>
                    <FileThumbnail className={fileClasses.thumbnail} thumbnailUrl={entryState.thumbnailUrl} />
                </div>
            </div>
        </div>
    );
});
GridEntryPreviewFolder.displayName = 'GridEntryPreviewFolder';

// @ts-ignore
const useFolderStyles = makeLocalChonkyStyles(theme => ({
    previewFile: {
        borderRadius: theme.gridFileEntry.borderRadius,
        position: 'relative',
        overflow: 'hidden',
    },
    folderBackSideTop: {
        backgroundColor: (state: FileEntryState) => state.color,
        boxShadow: (state: FileEntryState) => {
            let color = theme.gridFileEntry.folderBackColorTint;
            if (state.focused) color = 'rgba(0, 0, 0, 0.3)';
            else if (state.selected) color = 'rgba(0, 153, 255, .4)';
            return `inset ${color} 0 0 0 999px`;
        },
        borderTopLeftRadius: theme.gridFileEntry.borderRadius,
        borderTopRightRadius: 10,
        position: 'absolute',
        right: '60%',
        height: 13,
        top: -10,
        left: 0,
        '&:after': {
            borderRightColor: theme.palette.background.paper,
            borderTopColor: theme.palette.background.paper,
            borderBottomColor: 'transparent',
            borderLeftColor: 'transparent',
            borderWidth: [0, 15, 10, 0],
            borderStyle: 'solid',
            position: 'absolute',
            display: 'block',
            content: '""',
            right: 0,
            top: 0,
        },
    },
    folderBackSideMid: {
        backgroundColor: (state: FileEntryState) => state.color,
        boxShadow: (state: FileEntryState) => {
            let color = theme.gridFileEntry.folderBackColorTint;
            if (state.focused) color = 'rgba(0, 0, 0, 0.3)';
            else if (state.selected) color = 'rgba(0, 153, 255, .4)';
            return `inset ${color} 0 0 0 999px`;
        },
        borderTopRightRadius: theme.gridFileEntry.borderRadius,
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        top: 10,
    },
    folderFrontSide: {
        boxShadow: (state: FileEntryState) => {
            const shadows: string[] = [];
            if (state.focused) shadows.push('inset rgba(0, 0, 0, 1) 0 0 0 3px');
            if (state.selected) shadows.push('inset rgba(0, 153, 255, .65) 0 0 0 3px');
            shadows.push(`inset ${theme.gridFileEntry.folderFrontColorTint} 0 0 0 999px`);
            return shadows.join(', ');
        },
        backgroundColor: (state: FileEntryState) => state.color,
        borderRadius: theme.gridFileEntry.borderRadius,
        position: 'absolute',
        overflow: 'hidden',
        bottom: 0,
        right: 0,
        left: 0,
        top: 10,
    },
}));

export const GridEntryPreviewFile: React.FC<FileEntryPreviewProps> = React.memo(props => {
    const { className: externalClassName, entryState } = props;

    const fileClasses = useFileStyles(entryState);
    const commonClasses = useCommonEntryStyles(entryState);
    const ChonkyIcon = useContext(ChonkyIconContext);
    const className = c({
        [fileClasses.previewFile]: true,
        [externalClassName || '']: !!externalClassName,
    });
    return (
        <div className={className}>
            <div className={fileClasses.fileIcon}>
                <ChonkyIcon icon={entryState.icon} spin={entryState.iconSpin} />
            </div>
            <div className={commonClasses.selectionIndicator}></div>
            <FileThumbnail className={fileClasses.thumbnail} thumbnailUrl={entryState.thumbnailUrl} />
        </div>
    );
});
GridEntryPreviewFile.displayName = 'GridEntryPreviewFile';

// @ts-ignore
const useFileStyles = makeLocalChonkyStyles(theme => ({
    previewFile: {
        boxShadow: (state: FileEntryState) => {
            const shadows: string[] = [];
            if (state.selected) shadows.push('inset rgba(0,153,255, .65) 0 0 0 3px');
            if (state.focused) shadows.push('inset rgba(0, 0, 0, 1) 0 0 0 3px');
            shadows.push(`inset ${theme.gridFileEntry.fileColorTint} 0 0 0 999px`);
            return shadows.join(', ');
        },
        backgroundColor: (state: FileEntryState) => state.color,
        borderRadius: theme.gridFileEntry.borderRadius,
        position: 'relative',
        overflow: 'hidden',
    },
    fileIcon: {
        transform: 'translate3d(-50%, -50%, 0)',
        fontSize: theme.gridFileEntry.iconSize,
        opacity: (state: FileEntryState) => (state.thumbnailUrl && !state.focused ? 0 : 1),
        color: (state: FileEntryState) =>
            state.focused ? theme.gridFileEntry.iconColorFocused : theme.gridFileEntry.iconColor,
        position: 'absolute',
        left: '50%',
        zIndex: 12,
        top: '50%',
    },
    thumbnail: {
        borderRadius: theme.gridFileEntry.borderRadius,
        position: 'absolute',
        zIndex: 6,
        bottom: 5,
        right: 5,
        left: 5,
        top: 5,
    },
}));

export const useCommonEntryStyles = makeLocalChonkyStyles({
    // @ts-ignore
    selectionIndicator: {
        display: (state: FileEntryState) => (state.selected ? 'block' : 'none'),
        background:
            'repeating-linear-gradient(' +
            '45deg,' +
            'rgba(0,153,255,.14),' +
            'rgba(0,153,255,.14) 10px,' +
            'rgba(0,153,255,.25) 0,' +
            'rgba(0,153,255,.25) 20px' +
            ')',
        backgroundColor: 'rgba(0, 153, 255, .14)',
        position: 'absolute',
        height: '100%',
        width: '100%',
        zIndex: 10,
    },
    focusIndicator: {
        display: (state: FileEntryState) => (state.focused ? 'block' : 'none'),
        boxShadow: 'inset rgba(0, 0, 0, 1) 0 0 0 2px',
        position: 'absolute',
        height: '100%',
        width: '100%',
        zIndex: 11,
    },
});
