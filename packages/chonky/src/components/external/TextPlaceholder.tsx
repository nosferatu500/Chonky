import React from 'react';
import { GlobalToken, theme } from 'antd';

export interface TextPlaceholderProps {
    minLength: number;
    maxLength: number;
}

const getRandomInt = (min: number, max: number) => {
    return min + Math.floor(Math.random() * Math.floor(max - min));
};
export const TextPlaceholder: React.FC<TextPlaceholderProps> = React.memo(props => {
    const { minLength, maxLength } = props;

    const placeholderLength = getRandomInt(minLength, maxLength);
    const whitespace = '&nbsp;'.repeat(placeholderLength);

    const { token } = theme.useToken();
    const classes = makeStyles(token);

    return (
        <span
            style={classes.textPlaceholder}
            dangerouslySetInnerHTML={{ __html: whitespace }}
        />
    );
});

const makeStyles = (_token: GlobalToken): Record<string, React.CSSProperties> => ({
    textPlaceholder: {
        backgroundColor: '#ccc',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        borderRadius: 4,
        maxWidth: '40%',
        minWidth: 20,
    },
});
