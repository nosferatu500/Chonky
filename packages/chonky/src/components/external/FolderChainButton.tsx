import React from 'react';

import { ChonkyIconName } from '../../types/icons.types';
import { FolderChainItem } from './FileNavbar-hooks';
import { ToolbarButton } from './ToolbarButton';
import { GlobalToken, theme } from 'antd';

export interface FolderChainButtonProps {
    first: boolean;
    current: boolean;
    item: FolderChainItem;
}

export const FolderChainButton: React.FC<FolderChainButtonProps> = React.memo(
    ({ first, current, item }) => {
        const { file, disabled, onClick } = item;
        const { token } = theme.useToken();
        const classes = makeStyles(token);
        const styles = {
            ...classes.baseBreadcrumb,
            ...(disabled ? classes.disabledBreadcrumb : {}),
            ...(current ? classes.currentBreadcrumb : {}),
        };
        const text = file ? file.name : 'Loading...';
        const icon =
            first && file?.folderChainIcon === undefined
                ? ChonkyIconName.folder
                : file?.folderChainIcon;

        return (
            <ToolbarButton
                icon={icon}
                style={styles}
                text={text}
                disabled={disabled}
                onClick={onClick}
            />
        );
    }
);

const makeStyles = (token: GlobalToken): Record<string, React.CSSProperties> => ({
    baseBreadcrumb: {
        color: token.colorTextBase,
    },
    disabledBreadcrumb: {
        color: token.colorTextDisabled,
    },
    currentBreadcrumb: {
        color: token.colorTextDisabled,
    },
});
