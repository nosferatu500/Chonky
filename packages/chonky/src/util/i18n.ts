import filesize from 'filesize';
import { createContext, useContext, useMemo } from 'react';
import { Nullable } from 'tsdef';

import { FileData } from '../types/file.types';
import { ChonkyFormatters } from '../types/i18n.types';
import { FileHelper } from './file-helper';

export enum I18nNamespace {
    Toolbar = 'toolbar',
    FileList = 'fileList',
    FileEntry = 'fileEntry',
    FileContextMenu = 'contextMenu',

    FileActions = 'actions',
    FileActionGroups = 'actionGroups',
}

export const getI18nId = (namespace: I18nNamespace, stringId: string): string =>
    `chonky.${namespace}.${stringId}`;

export const getActionI18nId = (actionId: string, stringId: string): string =>
    `chonky.${I18nNamespace.FileActions}.${actionId}.${stringId}`;

export const useLocalizedFileEntryStrings = (file: Nullable<FileData>) => {
    const formatters = useContext(ChonkyFormattersContext);
    return useMemo(() => {
        return {
            fileModDateString: formatters.formatFileModDate(file),
            fileSizeString: formatters.formatFileSize(file),
        };
    }, [file, formatters]);
};

export const defaultFormatters: ChonkyFormatters = {
    formatFileModDate: (
        file: Nullable<FileData>
    ): Nullable<string> => {
        const safeModDate = FileHelper.getModDate(file);
        if (safeModDate) {
            return new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium', timeStyle: 'long' }).format(safeModDate)
        } else {
            return null;
        }
    },
    formatFileSize: (file: Nullable<FileData>): Nullable<string> => {
        if (!file || typeof file.size !== 'number') return null;

        const size = file.size;
        const sizeData = filesize(size, { bits: false, output: 'object' }) as any;
        if (sizeData.symbol === 'B') {
            return `${Math.round(sizeData.value / 10) / 100.0} KB`;
        } else if (sizeData.symbol === 'KB') {
            return `${Math.round(sizeData.value)} ${sizeData.symbol}`;
        }
        return `${sizeData.value} ${sizeData.symbol}`;
    },
};

export const ChonkyFormattersContext = createContext(defaultFormatters);
