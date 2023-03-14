import merge from 'deepmerge';
import React, { ReactNode, useMemo } from 'react';
import { ThemeProvider } from 'react-jss';
import { Provider as ReduxProvider } from 'react-redux';
import { nanoid } from 'nanoid';

import { useChonkyStore } from '../../redux/store';
import { FileBrowserHandle, FileBrowserProps } from '../../types/file-browser.types';
import { defaultConfig } from '../../util/default-config';
import { getValueOrFallback } from '../../util/helpers';
import { useStaticValue } from '../../util/hooks-helpers';
import { ChonkyFormattersContext, defaultFormatters } from '../../util/i18n';
import { ChonkyIconContext } from '../../util/icon-helper';
import {
    darkThemeOverride,
    lightTheme,
} from '../../util/styles';
import { ChonkyBusinessLogic } from '../internal/ChonkyBusinessLogic';
import { ChonkyIconPlaceholder } from '../internal/ChonkyIconPlaceholder';
import { ChonkyPresentationLayer } from '../internal/ChonkyPresentationLayer';
import { ConfigProvider } from 'antd';

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

    const theme = useMemo(() => {
        return merge(lightTheme, darkMode ? darkThemeOverride : {});
    }, [darkMode]);

    const chonkyComps = (
        <>
            <ChonkyBusinessLogic ref={ref} {...props} />
            <ChonkyPresentationLayer>{children}</ChonkyPresentationLayer>
        </>
    );

    return (
        <ChonkyFormattersContext.Provider value={defaultFormatters}>
            <ReduxProvider store={store}>
                <ConfigProvider>
                    <ThemeProvider theme={theme}>
                        <ChonkyIconContext.Provider
                            value={
                                iconComponent ??
                                defaultConfig.iconComponent ??
                                ChonkyIconPlaceholder
                            }
                        >
                            {chonkyComps}
                        </ChonkyIconContext.Provider>
                    </ThemeProvider>
                </ConfigProvider>
            </ReduxProvider>
        </ChonkyFormattersContext.Provider>
    );
});
FileBrowser.displayName = 'FileBrowser';
