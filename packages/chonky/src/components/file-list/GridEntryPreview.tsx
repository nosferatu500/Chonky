import React, { useContext } from 'react';
import { Nullable } from 'tsdef';

import { ChonkyIconName } from '../../types/icons.types';
import { ChonkyIconContext } from '../../util/icon-helper';
import { FileThumbnail } from './FileThumbnail';
import { GlobalToken, theme } from 'antd';

export type FileEntryState = {
    color: string;
    icon: ChonkyIconName | string;
    thumbnailUrl: Nullable<string>;
    iconSpin: boolean;
    selected: boolean;
    focused: boolean;
};

export interface FileEntryPreviewProps {
    style?: React.CSSProperties;
    entryState: FileEntryState;
}

export const GridEntryPreviewFolder: React.FC<FileEntryPreviewProps> = React.memo(props => {
    const { style: externalStyle, entryState } = props;

    const { token } = theme.useToken();
    const folderClasses = makeStylesFolder(token, entryState);;
    const fileClasses = makeStylesFile(token, entryState);
    const commonClasses = makeStylesCommon(token, entryState);
    const styles = {
        ...folderClasses.previewFile,
        ...(!!externalStyle ? externalStyle : {})
    };
    return (
        <div style={styles}>
            <div style={folderClasses.folderBackSideMid}>
                <div style={folderClasses.folderBackSideTop} />
                <div style={folderClasses.folderFrontSide}>
                    <FileThumbnail style={fileClasses.thumbnail} thumbnailUrl={entryState.thumbnailUrl} />
                </div>
            </div>
        </div>
    );
});
GridEntryPreviewFolder.displayName = 'GridEntryPreviewFolder';

const makeStylesFolder = (token: GlobalToken, entryState: FileEntryState): Record<string, React.CSSProperties> => {
    const getBoxShadow = (isFont = false) => {
        let color = isFont ? token.colorFillContent : token.colorFillAlter;
        if (entryState.focused) color = 'rgba(0, 0, 0, 0.3)';
        else if (entryState.selected) color = 'rgba(0, 153, 255, .4)';
        return `inset ${color} 0 0 0 999px`;
    }


    return {
        previewFile: {
            borderRadius: token.borderRadius,
            position: 'relative',
            overflow: 'hidden',
        },
        folderBackSideTop: {
            backgroundColor: entryState.color,
            boxShadow: getBoxShadow(),
            borderTopLeftRadius: token.borderRadius,
            borderTopRightRadius: 10,
            position: 'absolute',
            right: '60%',
            height: 13,
            top: -10,
            left: 0,
        },
        folderBackSideMid: {
            backgroundColor: entryState.color,
            boxShadow: getBoxShadow(),
            borderTopRightRadius: token.borderRadius,
            position: 'absolute',
            bottom: 0,
            right: 0,
            left: 0,
            top: 10,
        },
        folderFrontSide: {
            boxShadow: getBoxShadow(),
            backgroundColor: entryState.color,
            borderRadius: token.borderRadius,
            position: 'absolute',
            overflow: 'hidden',
            bottom: 0,
            right: 0,
            left: 0,
            top: 10,
        },
    }
};

export const GridEntryPreviewFile: React.FC<FileEntryPreviewProps> = React.memo(props => {
    const { style: externalStyle, entryState } = props;

    const { token } = theme.useToken();
    const fileClasses = makeStylesFile(token, entryState);
    const commonClasses = makeStylesCommon(token, entryState);
    const ChonkyIcon = useContext(ChonkyIconContext);
    const styles = {
        ...fileClasses.previewFile,
        ...(!!externalStyle ? externalStyle : {}),
    };
    return (
        <div style={styles}>
            <div style={fileClasses.fileIcon}>
                <ChonkyIcon icon={entryState.icon} spin={entryState.iconSpin} />
            </div>
            <FileThumbnail style={fileClasses.thumbnail} thumbnailUrl={entryState.thumbnailUrl} />
        </div>
    );
});
GridEntryPreviewFile.displayName = 'GridEntryPreviewFile';

const makeStylesFile = (token: GlobalToken, entryState: FileEntryState): Record<string, React.CSSProperties> => {
    const getBoxShadow = () => {
        const shadows: string[] = [];
        if (entryState.selected) shadows.push('inset rgba(0,153,255, .65) 0 0 0 3px');
        if (entryState.focused) shadows.push('inset rgba(0, 0, 0, 1) 0 0 0 3px');
        shadows.push(`inset ${token.colorFillContent} 0 0 0 999px`);
        return shadows.join(', ');
    }

    return {
    previewFile: {
        boxShadow: getBoxShadow(),
        backgroundColor: entryState.color,
        borderRadius: token.borderRadius,
        position: 'relative',
        overflow: 'hidden',
    },
    fileIcon: {
        transform: 'translate3d(-50%, -50%, 0)',
        fontSize: token.fontSizeHeading1,
        opacity: entryState.thumbnailUrl && !entryState.focused ? 0 : 1,
        color: entryState.focused ? token.colorPrimary : token.colorIcon,
        position: 'absolute',
        left: '50%',
        zIndex: 12,
        top: '50%',
    },
    thumbnail: {
        borderRadius: token.borderRadius,
        position: 'absolute',
        zIndex: 6,
        bottom: 5,
        right: 5,
        left: 5,
        top: 5,
    },
}};

export const makeStylesCommon = (_token: GlobalToken, entryState: FileEntryState): Record<string, React.CSSProperties> => ({
    focusIndicator: {
        display: entryState.focused ? 'block' : 'none',
        boxShadow: 'inset rgba(0, 0, 0, 1) 0 0 0 2px',
        position: 'absolute',
        height: '100%',
        width: '100%',
        zIndex: 11,
    },
});
