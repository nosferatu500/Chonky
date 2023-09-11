import React from 'react';
import { Nullable } from 'tsdef';

import { FileData } from '../../types/file.types';
import { important, makeLocalChonkyStyles } from '../../util/styles';
import { useFileNameComponent } from './FileEntry-hooks';

export interface FileEntryNameProps {
    file: Nullable<FileData>;
    className?: string;
}

export const FileEntryName: React.FC<FileEntryNameProps> = React.memo(({ file, className }) => {
    const classes = useStyles();
    const fileNameComponent = useFileNameComponent(file, classes.title);

    return (
        <span className={className} title={file ? file.name : undefined}>
            {fileNameComponent}
        </span>
    );
});
FileEntryName.displayName = 'FileEntryName';

// @ts-ignore
const useStyles = makeLocalChonkyStyles(theme => ({
    title: {
        color: important(theme.palette.text.primary),
    },
}));
