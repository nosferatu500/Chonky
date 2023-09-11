import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Input } from "antd"
import { SearchOutlined } from "@ant-design/icons"

import { reduxActions } from '../../redux/reducers';
import { selectSearchString } from '../../redux/selectors';
import { useDebounce } from '../../util/hooks-helpers';
import { makeGlobalChonkyStyles } from '../../util/styles';

export interface ToolbarSearchProps { }

export const ToolbarSearch: React.FC<ToolbarSearchProps> = React.memo(() => {
    const classes = useStyles();

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
            className={classes.searchFieldContainer}
            placeholder="Search"
            prefix={<SearchOutlined />}
            value={localSearchString}
            onChange={handleChange as any}
        />
    );
});

const useStyles = makeGlobalChonkyStyles(theme => ({
    searchFieldContainer: {
        height: theme.toolbar.size,
        width: 150,
    },
}));
