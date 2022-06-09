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

const useStyles = makeLocalChonkyStyles({
    // @ts-ignore
    baseBreadcrumb: {
        color: () => important("rgba(0, 0, 0, 0.87)"),
    },
    disabledBreadcrumb: {
        // Constant function here is on purpose. Without the function, the color here
        // does not override the `baseBreadcrumb` color from above.
        color: () => important("rgba(0, 0, 0, 0.38)"),
    },
    currentBreadcrumb: {
        textDecoration: important('underline'),
    },
});
