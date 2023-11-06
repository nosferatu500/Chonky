import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { GlobalToken, Input, theme } from "antd"
import { SearchOutlined } from "@ant-design/icons"

import { reduxActions } from '../../redux/reducers';
import { selectSearchString } from '../../redux/selectors';
import { useDebounce } from '../../util/hooks-helpers';

export interface ToolbarSearchProps { }

export const ToolbarSearch: React.FC<ToolbarSearchProps> = React.memo(() => {
    const { token } = theme.useToken();
    const classes = makeStyles(token);

    const searchInputRef = useRef<HTMLInputElement>();

    const dispatch = useDispatch();
    const reduxSearchString = useSelector(selectSearchString);

    const [localSearchString, setLocalSearchString] = useState(reduxSearchString);
    const [debouncedLocalSearchString] = useDebounce(localSearchString, 300);

    useEffect(() => {
        dispatch(
            reduxActions.setFocusSearchInput(() => {
                if (searchInputRef.current) searchInputRef.current.focus();
            })
        );
        return () => {
            dispatch(reduxActions.setFocusSearchInput(null));
        };
    }, [dispatch]);

    useEffect(() => {
        dispatch(reduxActions.setSearchString(debouncedLocalSearchString));
    }, [debouncedLocalSearchString, dispatch]);

    const handleChange = useCallback((event: React.FormEvent<HTMLInputElement>) => {
        setLocalSearchString(event.currentTarget.value);
    }, []);

    return (
        <Input
            size='small'
            style={classes.searchFieldContainer}
            placeholder="Search"
            prefix={<SearchOutlined />}
            value={localSearchString}
            onChange={handleChange as any}
        />
    );
});

const makeStyles = (token: GlobalToken): Record<string, React.CSSProperties> => ({
    searchFieldContainer: {
        height: token.sizeLG,
        width: 150,
    },
});
