import { FileAction } from '../types/action.types';
import { ChonkyIconName } from '../types/icons.types';

const validateActionTypes = <T extends { [action: string]: FileAction }>(
    actionMap: T
): T => actionMap;

export const OldChonkyActions = validateActionTypes({
    // Optional actions
    CreateFolder: {
        id: 'create_folder',
        button: {
            name: 'Create folder',
            toolbar: true,
            contextMenu: true,
            tooltip: 'Create a folder',
            icon: ChonkyIconName.folderCreate,
        },
    },
});
