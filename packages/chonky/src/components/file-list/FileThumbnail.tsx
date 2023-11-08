import React from 'react';
import { Nullable } from 'tsdef';

import { GlobalToken, theme } from 'antd';

export interface FileThumbnailProps {
    style: React.CSSProperties;
    thumbnailUrl: Nullable<string>;
}

export const FileThumbnail: React.FC<FileThumbnailProps> = React.memo(props => {
    const { style, thumbnailUrl } = props;

    const thumbnailStyle: React.CSSProperties = thumbnailUrl ? { backgroundImage: `url('${thumbnailUrl}')` } : {};

    const { token } = theme.useToken();
    const classes = makeStyles(token);
    return <div style={{...style,...classes.fileThumbnail, ...thumbnailStyle}} />;
});
FileThumbnail.displayName = 'FileThumbnail';

const makeStyles = (_token: GlobalToken): Record<string, React.CSSProperties> => ({
    fileThumbnail: {
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'contain',
        // @ts-ignore
        referrerPolicy: "no-referrer",
    },
});
