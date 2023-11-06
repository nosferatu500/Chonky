import React from 'react';
import { useSelector } from 'react-redux';

import { GlobalToken, Typography, theme } from "antd"

import { selectors } from '../../redux/selectors';

export interface ToolbarInfoProps { }

export const ToolbarInfo: React.FC<ToolbarInfoProps> = React.memo(() => {
    const { token } = theme.useToken();
    const classes = makeStyles(token);

    const displayFileIds = useSelector(selectors.getDisplayFileIds);

    return (
        <div style={classes.infoContainer}>
            <Typography.Text style={classes.infoText}>
                {displayFileIds.length > 1 || displayFileIds.length === 0 ? `${displayFileIds.length} items` : `${displayFileIds.length} item`}
            </Typography.Text>
        </div>
    );
});

const makeStyles = (token: GlobalToken): Record<string, React.CSSProperties> => ({
    infoContainer: {
        height: token.size,
        display: 'flex',
    },
    infoText: {
        lineHeight: token.lineHeight,
        fontSize: token.fontSize,
        marginLeft: 12,
        height: token.size,
    },
});
