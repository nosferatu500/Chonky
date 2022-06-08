/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2020
 * @license MIT
 */

import React from 'react';
import { useSelector } from 'react-redux';

import Typography from '@material-ui/core/Typography';

import { selectors } from '../../redux/selectors';
import { important, makeGlobalChonkyStyles } from '../../util/styles';

export interface ToolbarInfoProps {}

export const ToolbarInfo: React.FC<ToolbarInfoProps> = React.memo(() => {
    const classes = useStyles();

    const displayFileIds = useSelector(selectors.getDisplayFileIds);

    return (
        <div className={classes.infoContainer}>
            <Typography className={classes.infoText} variant="body1">
                {displayFileIds.length > 1 || displayFileIds.length === 0 ? `${displayFileIds.length} items` : `${displayFileIds.length} item`}
            </Typography>
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
    extraInfoSpan: {
        marginRight: important(8),
        marginLeft: important(8),
        opacity: 0.8,
    },
    selectionSizeText: {
        color: theme.colors.textActive,
    },
}));
