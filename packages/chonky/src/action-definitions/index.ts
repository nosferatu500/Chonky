import { DefaultActions } from './default';
import { EssentialActions } from './essential';
import { ExtraActions } from './extra';

export { OptionIds } from './option-ids';

export const ChonkyActions = {
    ...EssentialActions,
    ...DefaultActions,
    ...ExtraActions,
};

export const EssentialFileActions = [
    ChonkyActions.MouseClickFile,
    ChonkyActions.KeyboardClickFile,
    ChonkyActions.ChangeSelection,
    ChonkyActions.OpenFiles,
    ChonkyActions.OpenFileContextMenu,
];

export const DefaultFileActions = [
    ChonkyActions.EnableListView,
    ChonkyActions.EnableGridView,
    ChonkyActions.SortFilesByName,
    ChonkyActions.SortFilesBySize,
    ChonkyActions.SortFilesByDate,
    ChonkyActions.FocusSearchInput,
];
