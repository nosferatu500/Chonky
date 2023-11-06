import React, { ReactElement, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { selectToolbarItems } from '../../redux/selectors';
import { SmartToolbarButton } from './ToolbarButton';
import { ToolbarDropdown } from './ToolbarDropdown';
import { ToolbarInfo } from './ToolbarInfo';
import { ToolbarSearch } from './ToolbarSearch';
import { GlobalToken, theme } from 'antd';

export interface FileToolbarProps { }

export const FileToolbar: React.FC<FileToolbarProps> = React.memo(() => {
    const { token } = theme.useToken();
    const classes = makeStyles(token);
    const toolbarItems = useSelector(selectToolbarItems);

    const toolbarItemComponents = useMemo(() => {
        const components: ReactElement[] = [];
        for (let i = 0; i < toolbarItems.length; ++i) {
            const item = toolbarItems[i];

            const key = `toolbar-item-${typeof item === 'string' ? item : item.name}`;
            const component =
                typeof item === 'string' ? (
                    <SmartToolbarButton key={key} fileActionId={item} />
                ) : (
                    <ToolbarDropdown
                        key={key}
                        name={item.name}
                        fileActionIds={item.fileActionIds}
                    />
                );
            components.push(component);
        }
        return components;
    }, [toolbarItems]);

    return (
        <div style={classes.toolbarContainer}>
            <div style={classes.toolbarLeft}>
                <ToolbarSearch />
                <ToolbarInfo />
            </div>
            <div style={classes.toolbarRight}>{toolbarItemComponents}</div>
        </div>
    );
});

const makeStyles = (token: GlobalToken): Record<string, React.CSSProperties> => ({
    toolbarContainer: {
        flexWrap: 'wrap-reverse',
        display: 'flex',
        marginBottom: "10px"
    },
    toolbarLeft: {
        paddingBottom: token.margin,
        flexWrap: 'nowrap',
        flexGrow: 10000,
        display: 'flex',
    },
    toolbarRight: {
        paddingBottom: token.margin,
        flexWrap: 'nowrap',
        display: 'flex',
    },
});
