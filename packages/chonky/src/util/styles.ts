import { Theme as MuiTheme } from '@material-ui/core/styles';
import classnames from 'classnames';
import { createUseStyles } from 'react-jss';
import { DeepPartial } from 'tsdef';

export const lightTheme = {
    colors: {
        debugRed: '#fabdbd',
        debugBlue: '#bdd8fa',
        debugGreen: '#d2fabd',
        debugPurple: '#d2bdfa',
        debugYellow: '#fae9bd',

        textActive: '#09f',
    },

    fontSizes: {
        rootPrimary: 15,
    },

    margins: {
        rootLayoutMargin: 8,
    },

    toolbar: {
        size: 30,
        lineHeight: '30px', // `px` suffix is required for `line-height` fields to work
        fontSize: 15,
        buttonRadius: 4,
    },

    fileList: {
        desktopGridGutter: 8,
        mobileGridGutter: 5,
    },

    gridFileEntry: {
        childrenCountSize: '1.6em',
        iconColorFocused: '#000',
        iconSize: '2.4em',
        iconColor: '#fff',
        borderRadius: 5,
        fontSize: 14,

        fileColorTint: 'rgba(255, 255, 255, 0.4)',
        folderBackColorTint: 'rgba(255, 255, 255, 0.1)',
        folderFrontColorTint: 'rgba(255, 255, 255, 0.4)',
    },

    listFileEntry: {
        propertyFontSize: 14,
        iconFontSize: '1.1em',
        iconBorderRadius: 5,
        fontSize: 14,
    },
};

export type ChonkyTheme = typeof lightTheme;

export const darkThemeOverride: DeepPartial<ChonkyTheme> = {
    gridFileEntry: {
        fileColorTint: 'rgba(50, 50, 50, 0.4)',
        folderBackColorTint: 'rgba(50, 50, 50, 0.4)',
        folderFrontColorTint: 'rgba(50, 50, 50, 0.15)',
    },
};

export const getStripeGradient = (colorOne: string, colorTwo: string) =>
    'repeating-linear-gradient(' +
    '45deg,' +
    `${colorOne},` +
    `${colorOne} 10px,` +
    `${colorTwo} 0,` +
    `${colorTwo} 20px` +
    ')';

export const makeLocalChonkyStyles = <C extends string = string>(
    styles: (theme: ChonkyTheme & MuiTheme) => any
    // @ts-ignore
): any => createUseStyles<ChonkyTheme, C>(styles);

export const makeGlobalChonkyStyles = <C extends string = string>(
    makeStyles: (theme: ChonkyTheme & MuiTheme) => any
) => {
    const selectorMapping = {};
    const makeGlobalStyles = (theme: ChonkyTheme) => {
        const localStyles = makeStyles(theme as any);
        const globalStyles = {};
        const localSelectors = Object.keys(localStyles);
        localSelectors.map(localSelector => {
            const globalSelector = `chonky-${localSelector}`;
            const jssSelector = `@global .${globalSelector}`;
            // @ts-ignore
            globalStyles[jssSelector] = localStyles[localSelector];
            // @ts-ignore
            selectorMapping[localSelector] = globalSelector;
        });
        return globalStyles;
    };

    // @ts-ignore
    const useStyles = createUseStyles<ChonkyTheme, C>(makeGlobalStyles as any);
    return (...args: any[]): any => {
        const styles = useStyles(...args);
        const classes = {};
        Object.keys(selectorMapping).map(localSelector => {
            // @ts-ignore
            classes[localSelector] = selectorMapping[localSelector];
        });
        return { ...classes, ...styles };
    };
};

export const important = <T>(value: T) => [value, '!important'];

export const c = classnames;
