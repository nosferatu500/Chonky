import React, { ReactNode, useMemo } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { nanoid } from 'nanoid';

import { useChonkyStore } from '../../redux/store';
import { FileBrowserHandle, FileBrowserProps } from '../../types/file-browser.types';
import { defaultConfig } from '../../util/default-config';
import { getValueOrFallback } from '../../util/helpers';
import { useStaticValue } from '../../util/hooks-helpers';
import { ChonkyFormattersContext, defaultFormatters } from '../../util/i18n';
import { ChonkyIconContext } from '../../util/icon-helper';
import { ChonkyBusinessLogic } from '../internal/ChonkyBusinessLogic';
import { ChonkyIconPlaceholder } from '../internal/ChonkyIconPlaceholder';
import { ChonkyPresentationLayer } from '../internal/ChonkyPresentationLayer';
import { ConfigProvider, theme as antdTheme } from 'antd';

// if (process.env.NODE_ENV === 'development') {
//     const whyDidYouRender = require('@welldone-software/why-did-you-render');
//     whyDidYouRender(React, {
//         trackAllPureComponents: true,
//     });
// }

export const FileBrowser = React.forwardRef<
    FileBrowserHandle,
    FileBrowserProps & { children?: ReactNode }
>((props, ref) => {
    const { instanceId, iconComponent, children } = props;
    const darkMode = getValueOrFallback(
        props.darkMode,
        defaultConfig.darkMode,
        'boolean'
    );
    const chonkyInstanceId = useStaticValue(() => instanceId ?? nanoid());
    const store = useChonkyStore(chonkyInstanceId);

    const chonkyComps = (
        <>
            <ChonkyBusinessLogic ref={ref} {...props} />
            <ChonkyPresentationLayer>{children}</ChonkyPresentationLayer>
        </>
    );

    return (
        <ChonkyFormattersContext.Provider value={defaultFormatters}>
            <ReduxProvider store={store}>
                <ConfigProvider theme={{ algorithm: darkMode ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm }}>
                    <ChonkyIconContext.Provider
                        value={
                            iconComponent ??
                            defaultConfig.iconComponent ??
                            ChonkyIconPlaceholder
                        }
                    >
                        {chonkyComps}
                    </ChonkyIconContext.Provider>
                </ConfigProvider>
            </ReduxProvider>
        </ChonkyFormattersContext.Provider>
    );
});
FileBrowser.displayName = 'FileBrowser';
