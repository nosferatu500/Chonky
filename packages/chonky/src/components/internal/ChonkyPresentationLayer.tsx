/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2020
 * @license MIT
 */

import { Card } from 'antd';

import React from 'react';
import { makeGlobalChonkyStyles } from '../../util/styles';

export interface ChonkyPresentationLayerProps { }

export const ChonkyPresentationLayer: React.FC<ChonkyPresentationLayerProps> = ({
    children,
}) => {
    const classes = useStyles();
    return (
        <Card className={classes.chonkyRoot} style={{ padding: "0px" }}>
            {children ? children : null}
        </Card>
    );
};

const useStyles = makeGlobalChonkyStyles(theme => ({
    chonkyRoot: {
        backgroundColor: theme.palette.background.paper,
        border: `solid 1px ${theme.palette.divider}`,
        padding: theme.margins.rootLayoutMargin,
        fontSize: theme.fontSizes.rootPrimary,
        color: theme.palette.text.primary,
        touchAction: 'manipulation', // Disabling zoom on double tap
        fontFamily: 'sans-serif',
        flexDirection: 'column',
        boxSizing: 'border-box',
        textAlign: 'left',
        borderRadius: 4,
        display: 'flex',
        height: '100%',

        // Disabling select
        webkitTouchCallout: 'none',
        webkitUserSelect: 'none',
        mozUserSelect: 'none',
        msUserSelect: 'none',
        userSelect: 'none',
    },
}));
