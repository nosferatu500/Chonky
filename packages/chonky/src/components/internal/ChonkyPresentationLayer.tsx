import { Card, GlobalToken, theme } from 'antd';

import React, { ReactNode } from 'react';

export interface ChonkyPresentationLayerProps { children?: ReactNode }

export const ChonkyPresentationLayer: React.FC<ChonkyPresentationLayerProps> = ({
    children,
}) => {
    const { token } = theme.useToken();
    const classes = makeStyles(token);

    return (
        <Card style={classes.chonkyRoot}>
            {children ? children : null}
        </Card>
    );
};

const makeStyles = (token: GlobalToken): Record<string, React.CSSProperties> => ({
    chonkyRoot: {
        backgroundColor: token.colorBgContainer,
        border: `solid 1px ${token.colorBorderBg}`,
        padding: '0px',
        fontSize: token.fontSize,
        color: token.colorPrimary,
        touchAction: 'manipulation', // Disabling zoom on double tap
        flexDirection: 'column',
        boxSizing: 'border-box',
        textAlign: 'left',
        borderRadius: 4,
        display: 'flex',
        height: '100%',

        // Disabling select
        msUserSelect: 'none',
        userSelect: 'none',
    },
});
