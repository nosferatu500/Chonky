import { Nullable } from 'tsdef';

import { FileData } from '../types/file.types';
import { Logger } from './logger';

export class FileHelper {
    public static isDirectory(file: Nullable<FileData>): file is FileData {
        // Not a directory by default
        return !!file && file.isDir === true;
    }

    public static isHidden(file: Nullable<FileData>): file is FileData {
        // Not hidden by default
        return !!file && file.isHidden === true;
    }

    public static isSymlink(file: Nullable<FileData>): file is FileData {
        // Not a symlink by default
        return !!file && file.isSymlink === true;
    }

    public static isEncrypted(file: Nullable<FileData>): file is FileData {
        // Not encrypted by default
        return !!file && file.isEncrypted === true;
    }

    public static isClickable(file: Nullable<FileData>): file is FileData {
        // Clickable by default
        return !!file;
    }

    public static isOpenable(file: Nullable<FileData>): file is FileData {
        // Openable by default
        return !!file && file.openable !== false;
    }

    public static isSelectable(file: Nullable<FileData>): file is FileData {
        // Selectable by default
        return !!file && file.selectable !== false;
    }

    public static getModDate(file: Nullable<FileData>): Nullable<Date> {
        if (!file || file.modDate === null || file.modDate === undefined) return null;
        return FileHelper.parseDate(file.modDate);
    }

    public static parseDate(maybeDate: Date | string | any): Nullable<Date> {
        if (typeof maybeDate === 'string' || typeof maybeDate === 'number') {
            // We allow users to provide string and numerical representations of dates.
            try {
                return new Date(maybeDate);
            } catch (error) {
                Logger.error(
                    `Could not convert provided string/number into a date: ${(error as any).message} `,
                    'Invalid value:',
                    maybeDate
                );
            }
        }
        if (maybeDate instanceof Date && !isNaN(maybeDate.getTime())) {
            // We only allow valid dates objects
            return maybeDate;
        }

        // If we have an invalid date representation, we just return null.
        Logger.warn('Unsupported date representation:', maybeDate);
        return null;
    }
}
