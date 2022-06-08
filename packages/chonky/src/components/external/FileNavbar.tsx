/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2020
 * @license MIT
 */

import { Row, Breadcrumb } from 'antd';
import React, { ReactElement, useMemo } from 'react';

import { ChonkyActions } from '../../action-definitions/index';
import { important, makeGlobalChonkyStyles } from '../../util/styles';
import { useFolderChainItems } from './FileNavbar-hooks';
import { FolderChainButton } from './FolderChainButton';
import { SmartToolbarButton } from './ToolbarButton';

export interface FileNavbarProps { }

export const FileNavbar: React.FC<FileNavbarProps> = React.memo(() => {
    const classes = useStyles();
    const folderChainItems = useFolderChainItems();

    const folderChainComponents = useMemo(() => {
        const components: ReactElement[] = [];
        for (let i = 0; i < folderChainItems.length; ++i) {
            const key = `folder-chain-${i}`;
            const component = (
                <Breadcrumb.Item>
                    <FolderChainButton
                        key={key}
                        first={i === 0}
                        current={i === folderChainItems.length - 1}
                        item={folderChainItems[i]}
                    />
                </Breadcrumb.Item>
            );
            components.push(component);
        }
        return components;
    }, [folderChainItems]);

    return (
        <Row className={classes.navbarWrapper}>
            <SmartToolbarButton fileActionId={ChonkyActions.OpenParentFolder.id} />
            <Breadcrumb className={classes.navbarBreadcrumbs}>
                {folderChainComponents}
            </Breadcrumb>
        </Row>
    );
});

const useStyles = makeGlobalChonkyStyles(theme => ({
    navbarWrapper: {
        paddingBottom: theme.margins.rootLayoutMargin,
    },
    navbarBreadcrumbs: {
        fontSize: important(theme.toolbar.fontSize),
        flexGrow: 100,
    },
}));
