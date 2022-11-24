/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2020
 * @license MIT
 */

import React from 'react';

import { ChonkyIconName } from '../../types/icons.types';
import { c, important, makeLocalChonkyStyles } from '../../util/styles';
import { FolderChainItem } from './FileNavbar-hooks';
import { ToolbarButton } from './ToolbarButton';

export interface FolderChainButtonProps {
    first: boolean;
    current: boolean;
    item: FolderChainItem;
}

export const FolderChainButton: React.FC<FolderChainButtonProps> = React.memo(
    ({ first, current, item }) => {
        const { file, disabled, onClick } = item;
        const classes = useStyles();
        const className = c({
            [classes.baseBreadcrumb]: true,
            [classes.disabledBreadcrumb]: disabled,
            [classes.currentBreadcrumb]: current,
        });
        const text = file ? file.name : 'Loading...';
        const icon =
            first && file?.folderChainIcon === undefined
                ? ChonkyIconName.folder
                : file?.folderChainIcon;

        return (
            <ToolbarButton
                icon={icon}
                className={className}
                text={text}
                disabled={disabled}
                onClick={onClick}
            />
        );
    }
);

// @ts-ignore
const useStyles = makeLocalChonkyStyles(theme => ({
    baseBreadcrumb: {
        color: () => important(theme.palette.text.primary),
    },
    disabledBreadcrumb: {
        // Constant function here is on purpose. Without the function, the color here
        // does not override the `baseBreadcrumb` color from above.
        color: () => important(theme.palette.text.disabled),
    },
    currentBreadcrumb: {
        textDecoration: important('underline'),
    },
}));
