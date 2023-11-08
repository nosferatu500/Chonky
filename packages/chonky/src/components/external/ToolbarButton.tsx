import { Button, GlobalToken, theme } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import React, { useContext } from 'react';
import { Nullable } from 'tsdef';

import { selectFileActionData } from '../../redux/selectors';
import { useParamSelector } from '../../redux/store';
import { ChonkyIconName } from '../../types/icons.types';
import { CustomVisibilityState } from '../../types/action.types';
import { useFileActionProps, useFileActionTrigger } from '../../util/file-actions';
import { ChonkyIconContext } from '../../util/icon-helper';

export interface ToolbarButtonProps {
    className?: string;
    text: string;
    tooltip?: string;
    active?: boolean;
    icon?: Nullable<ChonkyIconName | string>;
    iconOnly?: boolean;
    onClick?: (event: React.MouseEvent<HTMLAnchorElement> & React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    dropdown?: boolean;
}

export const ToolbarButton: React.FC<ToolbarButtonProps> = React.memo(props => {
    const {
        className: externalClassName,
        text,
        tooltip,
        active,
        icon,
        iconOnly,
        onClick,
        disabled,
        dropdown,
    } = props;
    const { token } = theme.useToken();
    const classes = makeStyles(token);
    const ChonkyIcon = useContext(ChonkyIconContext);

    const iconComponent =
        icon || iconOnly ? (
            <ChonkyIcon
                icon={icon ? icon : ChonkyIconName.fallbackIcon}
                fixedWidth={true}
            />
        ) : null;

    const style = {
        ...(typeof externalClassName === "object" ? externalClassName as any : {}),
        ...classes.baseButton,
        ...(iconOnly ? classes.iconOnlyButton : {}),
        ...(!!active ? classes.activeButton : {}),
    };

    return (
        <>
            {
                dropdown ?
                    <Button
                        style={style}
                        type="text"
                        title={tooltip ? tooltip : text}
                        disabled={disabled || !onClick}
                        onClick={onClick}
                    >
                        {text}
                        <DownOutlined style={classes.iconDropdown} />
                    </Button>
                    :
                    <Button
                        style={style}
                        type="text"
                        onClick={onClick}
                        title={tooltip ? tooltip : text}
                        disabled={disabled || !onClick}
                        icon={iconComponent}
                    >
                        {!dropdown && text && !iconOnly && <span>{text}</span>}
                    </Button>

            }
        </>

    );
});

const makeStyles = (token: GlobalToken): Record<string, React.CSSProperties> => ({
    baseButton: {
        fontSize: token.fontSize,
        textTransform: 'none',
        letterSpacing: 0,
        minWidth: 'auto',
        lineHeight: token.lineHeight,
        height: token.size,
        paddingBottom: 0,
        paddingTop: 0,
        backgroundColor: "transparent",
    },
    iconOnlyButton: {
        width: token.size,
        textAlign: 'center',
        margin: 5,
        fontSize: 17
    },
    iconDropdown: {
        fontSize: '0.7em',
        marginLeft: 2,
        marginTop: 1,
    },
    activeButton: {
        color: token.colorPrimaryActive,
    },
});

export interface SmartToolbarButtonProps {
    fileActionId: string;
}

export const SmartToolbarButton: React.FC<SmartToolbarButtonProps> = React.memo(
    props => {
        const { fileActionId } = props;

        const action = useParamSelector(selectFileActionData, fileActionId);
        const triggerAction = useFileActionTrigger(fileActionId);
        const { icon, active, disabled } = useFileActionProps(fileActionId);

        if (!action) return null;
        const { button } = action;
        if (!button) return null;
        if (action.customVisibility !== undefined && action.customVisibility() === CustomVisibilityState.Hidden) return null;

        return (
            <ToolbarButton
                text={action.button?.name || ""}
                tooltip={action.button?.tooltip || ""}
                icon={icon}
                iconOnly={button.iconOnly}
                active={active}
                onClick={triggerAction}
                disabled={disabled}
            />
        );
    }
);
