import React from 'react';
import { useSelector } from 'react-redux';

import { Typography } from "antd"

import { selectors } from '../../redux/selectors';
import { important, makeGlobalChonkyStyles } from '../../util/styles';

export interface ToolbarInfoProps { }

export const ToolbarInfo: React.FC<ToolbarInfoProps> = React.memo(() => {
    const classes = useStyles();

    const displayFileIds = useSelector(selectors.getDisplayFileIds);

    return (
        <div className={classes.infoContainer}>
            <Typography.Text className={classes.infoText}>
                {displayFileIds.length > 1 || displayFileIds.length === 0 ? `${displayFileIds.length} items` : `${displayFileIds.length} item`}
            </Typography.Text>
        </div>
    );
});

const useStyles = makeGlobalChonkyStyles(theme => ({
    infoContainer: {
        height: theme.toolbar.size,
        display: 'flex',
    },
    infoText: {
        lineHeight: important(theme.toolbar.lineHeight),
        fontSize: important(theme.toolbar.fontSize),
        marginLeft: important(12),
        height: theme.toolbar.size,
    },
}));
