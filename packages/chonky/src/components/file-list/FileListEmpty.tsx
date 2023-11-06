import React, { CSSProperties, useContext } from 'react';

import { ChonkyIconName } from '../../types/icons.types';
import { ChonkyIconContext } from '../../util/icon-helper';
import { GlobalToken, theme } from 'antd';

export interface FileListEmptyProps {
    width: number;
    height: number;
}

export const FileListEmpty: React.FC<FileListEmptyProps> = props => {
    const { width, height } = props;
    const { token } = theme.useToken();
    const classes = makeStyles(token);
    const ChonkyIcon = useContext(ChonkyIconContext);
    const style: CSSProperties = {
        width,
        height,
    };

    return (
        <div style={{...classes.fileListEmpty, ...style}}>
            <div style={classes.fileListEmptyContent}>
                <ChonkyIcon icon={ChonkyIconName.folderOpen} />
                &nbsp; Nothing to show
            </div>
        </div>
    );
};

const makeStyles = (token: GlobalToken): Record<string, React.CSSProperties> => ({
    fileListEmpty: {
        color: token.colorTextDisabled,
        position: 'relative',
        textAlign: 'center',
        fontSize: '1.2em',
    },
    fileListEmptyContent: {
        transform: 'translate3d(-50%, -50%, 0)',
        position: 'absolute',
        left: '50%',
        top: '50%',
    },
});
