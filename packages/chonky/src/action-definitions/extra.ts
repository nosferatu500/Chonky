import { ChonkyIconName } from '../types/icons.types';
import { defineFileAction } from '../util/helpers';

export const ExtraActions = {
    /**
     * Action that adds a button to create a new folder.
     */
    CreateFolder: defineFileAction({
        id: 'create_folder',
        button: {
            name: 'Create folder',
            toolbar: true,
            tooltip: 'Create a folder',
            icon: ChonkyIconName.folderCreate,
        },
    } as const),
};
