import type { Leaves } from '../utils/object-paths/types';

enum CSSPropertyKeys {
  backgroundColor = 'background-color',
  fontColor = 'font-color',
}

enum ThemeKeys {
  white0 = 'dl-white-0',
  black0 = 'dl-black-0',
  blue1 = 'dl-blue-1',
  blue2 = 'dl-blue-2',
}

type CSSValue = string;
export type CSSVariablePath<PathType> = {
  path: PathType;
};

export type ThemeVariantConfigValue =
  | CSSVariablePath<ThemeInvariantConfigPath>
  | CSSValue;

export function isPath(
  maybePath: ThemeVariantConfigValue
): maybePath is CSSVariablePath<ThemeInvariantConfigPath> {
  return (
    (maybePath as CSSVariablePath<ThemeInvariantConfigPath>).path !== undefined
  );
}

const VariablePath = (
  path: ThemeInvariantConfigPath
): CSSVariablePath<ThemeInvariantConfigPath> => ({
  path,
});

export type ThemeConfig = {
  themeInvariant: ThemeInvariantConfig;
  lightMode: ThemeVariantConfig;
  darkMode: ThemeVariantConfig;
};

export type ThemeInvariantConfig = {
  [ThemeKeys.white0]: CSSValue;
  [ThemeKeys.black0]: CSSValue;
  [ThemeKeys.blue1]: CSSValue;
  [ThemeKeys.blue2]: CSSValue;
};

export type ThemeInvariantConfigPath = Leaves<ThemeInvariantConfig>;

export type ThemeVariantConfig = {
  resume: {
    background: {
      [CSSPropertyKeys.backgroundColor]: ThemeVariantConfigValue;
    };
    page: {
      [CSSPropertyKeys.backgroundColor]: ThemeVariantConfigValue;
    };
    body: {
      [CSSPropertyKeys.fontColor]: ThemeVariantConfigValue;
    };
    anchor: {
      [CSSPropertyKeys.fontColor]: ThemeVariantConfigValue;
    };
  };
};

export type ThemeVariantConfigPath = Leaves<ThemeVariantConfig>;

const themeConfig: ThemeConfig = {
  themeInvariant: {
    [ThemeKeys.white0]: '#ffffff',
    [ThemeKeys.black0]: '#000000',
    [ThemeKeys.blue1]: '#acf8fc',
    [ThemeKeys.blue2]: '#0f1a3a',
  },
  lightMode: {
    resume: {
      background: { [CSSPropertyKeys.backgroundColor]: '#ebebeb' },
      page: {
        [CSSPropertyKeys.backgroundColor]: VariablePath('dl-white-0'),
      },
      body: {
        [CSSPropertyKeys.fontColor]: VariablePath('dl-black-0'),
      },
      anchor: { [CSSPropertyKeys.fontColor]: '#0066cc' },
    },
  },
  darkMode: {
    resume: {
      background: { [CSSPropertyKeys.backgroundColor]: '#212121' },
      page: { [CSSPropertyKeys.backgroundColor]: '#181818' },
      body: { [CSSPropertyKeys.fontColor]: '#ffffff' },
      anchor: { [CSSPropertyKeys.fontColor]: VariablePath('dl-blue-1') },
    },
  },
};

export default themeConfig;
