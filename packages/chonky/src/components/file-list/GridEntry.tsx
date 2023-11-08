import React from 'react';

import { FileEntryProps } from '../../types/file-list.types';
import { FileHelper } from '../../util/file-helper';
import { useFileEntryHtmlProps, useFileEntryState } from './FileEntry-hooks';
import { FileEntryName } from './FileEntryName';
import { FileEntryState, GridEntryPreviewFile, GridEntryPreviewFolder } from './GridEntryPreview';
import { GlobalToken, theme } from 'antd';

export const GridEntry: React.FC<FileEntryProps> = React.memo(({ file, selected, focused }) => {
    const isDirectory = FileHelper.isDirectory(file);
    const entryState = useFileEntryState(file, selected, focused);

    const { token } = theme.useToken();
    const classes = makeStyles(token, entryState);
    const fileEntryHtmlProps = useFileEntryHtmlProps(file);
    return (
        <div style={classes.gridFileEntry} {...fileEntryHtmlProps}>
            {isDirectory ? (
                <GridEntryPreviewFolder
                    style={classes.gridFileEntryPreview}
                    entryState={entryState}
                />
            ) : (
                <GridEntryPreviewFile
                    style={classes.gridFileEntryPreview}
                    entryState={entryState}
                />
            )}
            <div style={classes.gridFileEntryNameContainer}>
                <FileEntryName style={classes.gridFileEntryName} file={file} />
            </div>
        </div>
    );
});
GridEntry.displayName = 'GridEntry';

const makeStyles = (token: GlobalToken, entryState: FileEntryState): Record<string, React.CSSProperties> => ({
    gridFileEntry: {
        flexDirection: 'column',
        display: 'flex',
        height: '100%',
    },
    gridFileEntryPreview: {
        flexGrow: 1,
    },
    gridFileEntryNameContainer: {
        fontSize: token.fontSize,
        wordBreak: 'break-word',
        textAlign: 'center',
        paddingTop: 5,
    },
    gridFileEntryName: {
        backgroundColor: entryState.selected ? 'rgba(0,153,255, .25)' : 'transparent',
        textDecoration: entryState.focused ? 'underline' : 'none',
        borderRadius: 3,
        padding: "2px 4px",
    },
});
