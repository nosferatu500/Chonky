import React, { useContext, useMemo } from 'react';

import { FileEntryProps } from '../../types/file-list.types';
import { useLocalizedFileEntryStrings } from '../../util/i18n';
import { ChonkyIconContext } from '../../util/icon-helper';
import { TextPlaceholder } from '../external/TextPlaceholder';
import {
    useFileEntryHtmlProps,
    useFileEntryState,
} from './FileEntry-hooks';
import { FileEntryName } from './FileEntryName';
import { FileEntryState, makeStylesCommon } from './GridEntryPreview';
import { GlobalToken, theme } from 'antd';

interface StyleState {
    entryState: FileEntryState;
}

export const ListEntry: React.FC<FileEntryProps> = React.memo(
    ({ file, selected, focused }) => {
        const entryState: FileEntryState = useFileEntryState(file, selected, focused);

        const { fileModDateString, fileSizeString } = useLocalizedFileEntryStrings(
            file
        );
        
        const { token } = theme.useToken();
        const classes = makeStyles(token, entryState);
        const commonClasses = makeStylesCommon(token, entryState);
        const ChonkyIcon = useContext(ChonkyIconContext);
        const fileEntryHtmlProps = useFileEntryHtmlProps(file);
        return (
            <div style={classes.listFileEntry} {...fileEntryHtmlProps}>
                <div style={commonClasses.focusIndicator}></div>
                <div
                    style={classes.listFileEntrySelection}
                ></div>
                <div style={classes.listFileEntryIcon}>
                    <ChonkyIcon
                        icon={entryState.icon}
                        spin={entryState.iconSpin}
                        fixedWidth={true}
                    />
                </div>
                <div
                    style={classes.listFileEntryName}
                    title={file ? file.name : undefined}
                >
                    <FileEntryName file={file} />
                </div>
                <div style={classes.listFileEntryProperty}>
                    {file ? (
                        fileModDateString ?? <span>—</span>
                    ) : (
                        <TextPlaceholder minLength={5} maxLength={15} />
                    )}
                </div>
                <div style={classes.listFileEntryProperty}>
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

const makeStyles = (token: GlobalToken, entryState: FileEntryState): Record<string, React.CSSProperties> => ({
    listFileEntry: {
        boxShadow: `inset ${token.colorTextDisabled} 0 -1px 0`,
        fontSize: token.fontSize,
        color: 'inherit',
        alignItems: 'center',
        position: 'relative',
        display: 'flex',
        height: '100%',
    },
    listFileEntrySelection: {
        opacity: 0.6,
    },
    listFileEntryIcon: {
        color: entryState.color,
        fontSize: token.fontSizeLG,
        boxSizing: 'border-box',
        padding: "2px 4px",
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
        fontSize: token.fontSize,
        boxSizing: 'border-box',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        flex: '0 1 150px',
        padding: "2px 8px",
        zIndex: 20,
    },
});
