import { Row, Breadcrumb, GlobalToken, theme } from 'antd';
import { ItemType } from 'antd/es/breadcrumb/Breadcrumb';
import React, { useMemo } from 'react';

import { ChonkyActions } from '../../action-definitions/index';
import { useFolderChainItems } from './FileNavbar-hooks';
import { FolderChainButton } from './FolderChainButton';
import { SmartToolbarButton } from './ToolbarButton';

export interface FileNavbarProps { }

export const FileNavbar: React.FC<FileNavbarProps> = React.memo(() => {
    const { token } = theme.useToken();
    const classes = makeStyles(token);
    const folderChainItems = useFolderChainItems();

    const folderChainComponents = useMemo(() => {
        const components: ItemType[] = [];
        for (let i = 0; i < folderChainItems.length; ++i) {
            const key = `folder-chain-${i}`;
            const item = {
                    key, 
                    title: <FolderChainButton
                                first={i === 0}
                                current={i === folderChainItems.length - 1}
                                item={folderChainItems[i]}
                            />
            };
            components.push(item);
        }
        return components;
    }, [folderChainItems]);

    return (
        <Row style={classes.navbarWrapper}>
            <SmartToolbarButton fileActionId={ChonkyActions.OpenParentFolder.id} />
            <Breadcrumb style={classes.navbarBreadcrumbs} items={folderChainComponents} />
        </Row>
    );
});

const makeStyles = (token: GlobalToken): Record<string, React.CSSProperties> => ({
    navbarWrapper: {
        paddingBottom: token.margin,
    },
    navbarBreadcrumbs: {
        fontSize: token.fontSizeLG,
        flexGrow: 100,
    },
});
