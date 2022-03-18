import type { Leaves } from '../utils/object-paths/types';

enum CSSPropertyKeys {
  backgroundColor = 'background-color',
  fontColor = 'font-color',
}

enum OtherKeys {
  themeBlue = 'theme-blue',
}

type CSSValue = string;
type CSSVariablePath<PathType> = {
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
  [OtherKeys.themeBlue]: CSSValue;
  default: {
    resume: {
      page: {
        [CSSPropertyKeys.backgroundColor]: CSSValue;
      };
      body: {
        [CSSPropertyKeys.fontColor]: CSSValue;
      };
    };
  };
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
    [OtherKeys.themeBlue]: '#acf8fc',
    default: {
      resume: {
        page: { [CSSPropertyKeys.backgroundColor]: '#ffffff' },
        body: { [CSSPropertyKeys.fontColor]: '#000000' },
      },
    },
  },
  lightMode: {
    resume: {
      background: { [CSSPropertyKeys.backgroundColor]: '#ebebeb' },
      page: {
        [CSSPropertyKeys.backgroundColor]: VariablePath(
          'default.resume.page.background-color'
        ),
      },
      body: {
        [CSSPropertyKeys.fontColor]: VariablePath(
          'default.resume.body.font-color'
        ),
      },
      anchor: { [CSSPropertyKeys.fontColor]: '#0066cc' },
    },
  },
  darkMode: {
    resume: {
      background: { [CSSPropertyKeys.backgroundColor]: '#212121' },
      page: { [CSSPropertyKeys.backgroundColor]: '#181818' },
      body: { [CSSPropertyKeys.fontColor]: '#ffffff' },
      anchor: { [CSSPropertyKeys.fontColor]: '#0066cc' },
    },
  },
};

export default themeConfig;
