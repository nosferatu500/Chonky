/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2020
 * @license MIT
 */

import { DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu } from 'antd';
import React, { useContext } from 'react';
import { selectFileActionData } from '../../redux/selectors';
import { useParamSelector } from '../../redux/store';

import { FileActionGroup } from '../../types/action-menus.types';
import { useFileActionProps, useFileActionTrigger } from '../../util/file-actions';
import { ChonkyIconContext } from '../../util/icon-helper';
import { important, makeGlobalChonkyStyles } from '../../util/styles';

export type ToolbarDropdownProps = FileActionGroup;

const useStyles = makeGlobalChonkyStyles(theme => ({
    baseButton: {
        lineHeight: important(theme.toolbar.lineHeight),
        height: important(theme.toolbar.size),
        minHeight: important('auto'),
        minWidth: important('auto'),
    },
    icon: {
        fontSize: important(theme.toolbar.fontSize),
        minWidth: important('auto'),
        color: important('inherit'),
        marginRight: 8,
    },
    activeButton: {
        color: important(theme.colors.textActive),
    },
}));

const getMenuItem = (fileActionId: string) => {
    const classes = useStyles();
    const ChonkyIcon = useContext(ChonkyIconContext);

    const triggerAction = useFileActionTrigger(fileActionId);
    const { icon } = useFileActionProps(fileActionId);
    const action = useParamSelector(selectFileActionData, fileActionId);

    return {
        label: action.button?.name || "",
        key: `menu-item-${fileActionId}`,
        icon: icon && (<ChonkyIcon className={classes.icon} icon={icon} fixedWidth={true} />),
        onClick: triggerAction
    }
}

export const ToolbarDropdown: React.FC<ToolbarDropdownProps> = React.memo(props => {
    const { name, fileActionIds } = props;

    const menuItemComponents = fileActionIds.map(fileActionId => getMenuItem(fileActionId));

    return (
        <Dropdown overlay={<Menu items={menuItemComponents} />}>
            <Button style={{ borderColor: "white" }}>
                {name}
                <DownOutlined />
            </Button>
        </Dropdown>
    );
});
