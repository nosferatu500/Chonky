import { Nullable } from 'tsdef';

import { FileData } from './file.types';

export interface I18nConfig {
    formatters?: Partial<ChonkyFormatters>;
}

export interface ChonkyFormatters {
    formatFileModDate: (file: Nullable<FileData>) => Nullable<string>;
    formatFileSize: (file: Nullable<FileData>) => Nullable<string>;
}
