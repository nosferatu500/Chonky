import React from 'react';
import { Nullable } from 'tsdef';

import { FileData } from '../../types/file.types';
import { useFileNameComponent } from './FileEntry-hooks';
import { GlobalToken, theme } from 'antd';

export interface FileEntryNameProps {
    file: Nullable<FileData>;
    style?: React.CSSProperties;
}

export const FileEntryName: React.FC<FileEntryNameProps> = React.memo(({ file, style }) => {
    const { token } = theme.useToken();
    const classes = makeStyles(token);
    const fileNameComponent = useFileNameComponent(file, classes.title);

    return (
        <span style={style} title={file ? file.name : undefined}>
            {fileNameComponent}
        </span>
    );
});
FileEntryName.displayName = 'FileEntryName';

const makeStyles = (token: GlobalToken): Record<string, React.CSSProperties> => ({
    title: {
        color: token.colorTextBase,
    },
});
