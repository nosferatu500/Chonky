export enum FileViewMode {
    List = 'list',
    Grid = 'grid',
}

export type FileViewConfigList = {
    mode: FileViewMode.List;
    entryHeight: number;
};

export type FileViewConfigGrid = {
    mode: FileViewMode.Grid;
    entryWidth: number;
    entryHeight: number;
};

export type FileViewConfig = FileViewConfigList | FileViewConfigGrid;
