/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2020
 * @license MIT
 */

import React, { ReactElement, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Menu from '@material-ui/core/Menu';

import { reduxActions } from '../../redux/reducers';
import { selectContextMenuConfig, selectContextMenuItems } from '../../redux/selectors';
import { important, makeGlobalChonkyStyles } from '../../util/styles';
import { useContextMenuDismisser } from './FileContextMenu-hooks';
import { SmartToolbarDropdownButton } from './ToolbarDropdownButton';

export interface FileContextMenuProps {}

export const FileContextMenu: React.FC<FileContextMenuProps> = React.memo(() => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(reduxActions.setContextMenuMounted(true));
        return () => {
            dispatch(reduxActions.setContextMenuMounted(false));
        };
    }, [dispatch]);

    const contextMenuConfig = useSelector(selectContextMenuConfig);
    const contextMenuItems = useSelector(selectContextMenuItems);

    const hideContextMenu = useContextMenuDismisser();
    const contextMenuItemComponents = useMemo(() => {
        const components: ReactElement[] = [];
        for (let i = 0; i < contextMenuItems.length; ++i) {
            const item = contextMenuItems[i];

            if (typeof item === 'string') {
                components.push(
                    <SmartToolbarDropdownButton
                        key={`context-menu-item-${item}`}
                        fileActionId={item}
                        onClickFollowUp={hideContextMenu}
                    />
                );
            } else {
                item.fileActionIds.map(id =>
                    components.push(
                        <SmartToolbarDropdownButton
                            key={`context-menu-item-${item.name}-${id}`}
                            fileActionId={id}
                            onClickFollowUp={hideContextMenu}
                        />
                    )
                );
            }
        }
        return components;
    }, [contextMenuItems, hideContextMenu]);

    const anchorPosition = useMemo(
        () => (contextMenuConfig ? { top: contextMenuConfig.mouseY, left: contextMenuConfig.mouseX } : undefined),
        [contextMenuConfig]
    );

    const classes = useStyles();
    return (
        <Menu
            elevation={2}
            disablePortal
            onClose={hideContextMenu}
            transitionDuration={150}
            open={!!contextMenuConfig}
            anchorPosition={anchorPosition}
            anchorReference="anchorPosition"
            classes={{ list: classes.contextMenuList }}
        >
            {contextMenuItemComponents}
        </Menu>
    );
});

const useStyles = makeGlobalChonkyStyles(() => ({
    contextMenuList: {
        paddingBottom: important(0),
        paddingTop: important(0),
    },
    browserMenuTooltip: {
        lineHeight: important('30px'),
        fontSize: important('0.7em'),
    },
}));
