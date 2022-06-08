/**
 *
 */

import { useCallback, useMemo, useState } from 'react';

import { ChonkyActions } from '../action-definitions';
import { FileActionData } from '../types/action-handler.types';
import { FileAction } from '../types/action.types';
import { FileArray, FileData } from '../types/file.types';
import { FileHelper } from '../util/file-helper';

export interface CustomFileData extends FileData {
    parentId?: string;
    childrenIds?: string[];
}
export interface CustomFileMap<FT extends CustomFileData> {
    [fileId: string]: FT;
}
export interface FileMapParams<FT extends CustomFileData> {
    baseFileMap: CustomFileMap<FT>;
    initialFolderId: string;
}

export const useFolderChain = <FT extends CustomFileData>(
    fileMap: CustomFileMap<FT>,
    currentFolderId: string
): FileArray<FT> => {
    return useMemo(() => {
        const currentFolder = fileMap[currentFolderId];

        const folderChain = [currentFolder];

        let parentId = currentFolder.parentId;
        while (parentId) {
            const parentFile = fileMap[parentId];
            if (parentFile) {
                folderChain.unshift(parentFile);
                parentId = parentFile.parentId;
            } else {
                break;
            }
        }

        return folderChain;
    }, [currentFolderId, fileMap]);
};

export const useFiles = <FT extends CustomFileData>(
    fileMap: CustomFileMap<FT>,
    currentFolderId: string
): FileArray<FT> => {
    return useMemo(() => {
        const currentFolder = fileMap[currentFolderId];
        const childrenIds = currentFolder.childrenIds!;
        const files = childrenIds.map((fileId: string) => fileMap[fileId]);
        return files;
    }, [currentFolderId, fileMap]);
};

export const useFileMapMethods = <FT extends CustomFileData>(
    baseFileMap: CustomFileMap<FT>,
    initialFolderId: string
) => {
    const [fileMap, setFileMap] = useState(baseFileMap);
    const [currentFolderId, setCurrentFolderId] = useState(initialFolderId);
    const resetFileMap = useCallback(() => {
        setFileMap(baseFileMap);
        setCurrentFolderId(initialFolderId);
    }, [baseFileMap, initialFolderId]);
    const methods = useMemo(
        () => ({
            setFileMap,
            setCurrentFolderId,
            resetFileMap,
        }),
        [setFileMap, setCurrentFolderId, resetFileMap]
    );
    return {
        fileMap,
        currentFolderId,
        methods,
    };
};
export type FileMethods = ReturnType<typeof useFileMapMethods>['methods'];

export const useFileActionHandler = (methods: FileMethods) => {
    return useCallback(
        (data: FileActionData<FileAction>) => {
            if (data.id === ChonkyActions.OpenFiles.id) {
                const { targetFile, files } = data.payload;
                const fileToOpen = targetFile ?? files[0];
                if (fileToOpen && FileHelper.isDirectory(fileToOpen)) {
                    methods.setCurrentFolderId(fileToOpen.id);
                }
            }
        },
        [methods]
    );
};

export const useFileMap = <FT extends CustomFileData = CustomFileData>({
    baseFileMap,
    initialFolderId,
}: FileMapParams<FT>) => {
    const { fileMap, currentFolderId, methods } = useFileMapMethods(baseFileMap, initialFolderId);
    const folderChain = useFolderChain(fileMap, currentFolderId);
    const files = useFiles(fileMap, currentFolderId);
    const fileActionHandler = useFileActionHandler(methods as FileMethods);

    const data = {
        fileMap,
        currentFolderId,
        folderChain,
        files,
    };
    return { data, methods, fileActionHandler };
};
