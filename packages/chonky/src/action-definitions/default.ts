import { Nullable } from 'tsdef';

import { selectFocusSearchInput } from '../redux/selectors';
import { FileViewMode } from '../types/file-view.types';
import { FileData } from '../types/file.types';
import { ChonkyIconName } from '../types/icons.types';
import { defineFileAction } from '../util/helpers';
import { OptionIds } from './option-ids';

export const DefaultActions = {
    /**
     * Action that enables List view.
     */
    EnableListView: defineFileAction({
        id: 'enable_list_view',
        fileViewConfig: {
            mode: FileViewMode.List,
            entryHeight: 30,
        },
        button: {
            name: 'Switch to List view',
            toolbar: true,
            icon: ChonkyIconName.list,
            iconOnly: true,
        },
    } as const),
    /**
     * Action that enables Grid view.
     */
    EnableGridView: defineFileAction({
        id: 'enable_grid_view',
        fileViewConfig: { mode: FileViewMode.Grid, entryWidth: 140, entryHeight: 130 },
        button: {
            name: 'Switch to Grid view',
            toolbar: true,
            icon: ChonkyIconName.smallThumbnail,
            iconOnly: true,
        },
    } as const),
    /**
     * Action that sorts files by `file.name`.
     */
    SortFilesByName: defineFileAction({
        id: 'sort_files_by_name',
        sortKeySelector: (file: Nullable<FileData>) => (file ? file.name.toLowerCase() : undefined),
        button: {
            name: 'Sort by name',
            toolbar: true,
            group: 'Options',
        },
    } as const),
    /**
     * Action that sorts files by `file.size`.
     */
    SortFilesBySize: defineFileAction({
        id: 'sort_files_by_size',
        sortKeySelector: (file: Nullable<FileData>) => (file ? file.size : undefined),
        button: {
            name: 'Sort by size',
            toolbar: true,
            group: 'Options',
        },
    } as const),
    /**
     * Action that sorts files by `file.modDate`.
     */
    SortFilesByDate: defineFileAction({
        id: 'sort_files_by_date',
        sortKeySelector: (file: Nullable<FileData>) => (file ? file.modDate : undefined),
        button: {
            name: 'Sort by date',
            toolbar: true,
            group: 'Options',
        },
    } as const),
    /**
     * Action that focuses the search input when it is dispatched.
     */
    FocusSearchInput: defineFileAction(
        {
            id: 'focus_search_input',
        } as const,
        ({ getReduxState }) => {
            const focusSearchInput = selectFocusSearchInput(getReduxState());
            if (focusSearchInput) focusSearchInput();
        }
    ),
    /**
     * Action that enables List view.
     */
    ToggleDarkMode: defineFileAction({
        id: 'enable_dark_mode',
        option: {
            id: OptionIds.DarkMode,
            defaultValue: false,
        },
        button: {
            name: 'Enable dark mode',
            toolbar: true,
            icon: ChonkyIconName.list,
            iconOnly: true,
        },
    } as const),
};
