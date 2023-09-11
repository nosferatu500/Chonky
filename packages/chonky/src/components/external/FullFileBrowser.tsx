import React from 'react';

import { FileBrowserHandle, FileBrowserProps } from '../../types/file-browser.types';
import { FileList } from '../file-list/FileList';
import { FileBrowser } from './FileBrowser';
import { FileNavbar } from './FileNavbar';
import { FileToolbar } from './FileToolbar';

export const FullFileBrowser = React.memo(
    React.forwardRef<FileBrowserHandle, FileBrowserProps>((props, ref) => {
        const { onScroll } = props
        return (
            <FileBrowser ref={ref} {...props}>
                <FileNavbar />
                <FileToolbar />
                <FileList onScroll={onScroll} />
            </FileBrowser>
        );
    })
);
FullFileBrowser.displayName = 'FullFileBrowser';
