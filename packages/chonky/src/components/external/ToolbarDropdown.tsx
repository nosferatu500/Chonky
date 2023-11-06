import { DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, GlobalToken, Menu, theme } from 'antd';
import React, { useContext } from 'react';
import { selectFileActionData } from '../../redux/selectors';
import { useParamSelector } from '../../redux/store';

import { FileActionGroup } from '../../types/action-menus.types';
import { useFileActionProps, useFileActionTrigger } from '../../util/file-actions';
import { ChonkyIconContext } from '../../util/icon-helper';

export type ToolbarDropdownProps = FileActionGroup;

const makeStyles = (token: GlobalToken): Record<string, React.CSSProperties> => ({
    icon: {
        fontSize: token.fontSize,
        minWidth: 'auto',
        color: 'inherit',
        marginRight: 8,
    },
});

const getMenuItem = (fileActionId: string) => {
    const { token } = theme.useToken();
    const classes = makeStyles(token);
    const ChonkyIcon = useContext(ChonkyIconContext);

    const triggerAction = useFileActionTrigger(fileActionId);
    const { icon } = useFileActionProps(fileActionId);
    const action = useParamSelector(selectFileActionData, fileActionId);

    return {
        label: action.button?.name || "",
        key: `menu-item-${fileActionId}`,
        icon: icon && (<ChonkyIcon style={classes.icon} icon={icon} fixedWidth={true} />),
        onClick: triggerAction
    }
}

export const ToolbarDropdown: React.FC<ToolbarDropdownProps> = React.memo(props => {
    const { name, fileActionIds } = props;

    const menuItemComponents = fileActionIds.map(fileActionId => getMenuItem(fileActionId));

    return (
        <Dropdown menu={{ items: menuItemComponents }}>
            <Button type="text">
                {name}
                <DownOutlined />
            </Button>
        </Dropdown>
    );
});
