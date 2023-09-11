import { Card } from 'antd';

import React, { ReactNode } from 'react';
import { makeGlobalChonkyStyles } from '../../util/styles';

export interface ChonkyPresentationLayerProps { children?: ReactNode }

export const ChonkyPresentationLayer: React.FC<ChonkyPresentationLayerProps> = ({
    children,
}) => {
    const classes = useStyles();
    return (
        <Card className={classes.chonkyRoot}>
            {children ? children : null}
        </Card>
    );
};

const useStyles = makeGlobalChonkyStyles(theme => ({
    chonkyRoot: {
        backgroundColor: theme.palette.background.paper,
        border: `solid 1px ${theme.palette.divider}`,
        padding: '0px',
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
