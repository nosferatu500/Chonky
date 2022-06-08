/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2020
 * @license MIT
 */

import { DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu } from 'antd';
import React, { useMemo } from 'react';

import { FileActionGroup } from '../../types/action-menus.types';
import { SmartToolbarDropdownButton } from './ToolbarDropdownButton';

export type ToolbarDropdownProps = FileActionGroup;

export const ToolbarDropdown: React.FC<ToolbarDropdownProps> = React.memo(props => {
    const { name, fileActionIds } = props;

    const menuItemComponents = useMemo(
        () =>
            fileActionIds.map(id => (
                <SmartToolbarDropdownButton
                    key={`menu-item-${id}`}
                    fileActionId={id}
                />
            )),
        [fileActionIds]
    );

    return (
        <Dropdown overlay={<Menu>{menuItemComponents}</Menu>}>
            <Button style={{ borderColor: "white" }}>
                {name}
                <DownOutlined />
            </Button>
        </Dropdown>
    );
});
