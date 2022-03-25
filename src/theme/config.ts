import type { Leaves } from '../utils/object-paths/types';

enum ViewportSizeKeys {
  desktop = 'desktop',
  mobile = 'mobile',
}

enum CSSPropertyKeys {
  width = 'width',
  height = 'height',
  backgroundColor = 'background-color',
  color = 'color',
  fontColor = 'font-color',
}

enum ThemeKeys {
  themeBlue = 'dl-theme-blue',
  themeBlueDark = 'dl-theme-blue-dark',
  white0 = 'dl-white-0',
  white1 = 'dl-white-1',
  white2 = 'dl-white-2',
  black0 = 'dl-black-0',
  black1 = 'dl-black-1',
  black2 = 'dl-black-2',
}

enum OtherKeys {
  radius = 'radius',
  initialX = 'initial-x',
  initialY = 'initial-y',
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

export type ViewportVariantConfig<T> = {
  [ViewportSizeKeys.desktop]: T;
  [ViewportSizeKeys.mobile]: T;
};

export type ThemeInvariantConfig = {
  [ThemeKeys.themeBlue]: CSSValue;
  [ThemeKeys.themeBlueDark]: CSSValue;
  [ThemeKeys.white0]: CSSValue;
  [ThemeKeys.white1]: CSSValue;
  [ThemeKeys.white2]: CSSValue;
  [ThemeKeys.black0]: CSSValue;
  [ThemeKeys.black1]: CSSValue;
  [ThemeKeys.black2]: CSSValue;
  navbar: ViewportVariantConfig<{
    [CSSPropertyKeys.height]: CSSValue;
  }>;
  landing: {
    animation: ViewportVariantConfig<{
      sun: {
        [OtherKeys.initialX]: CSSValue;
        [OtherKeys.initialY]: CSSValue;
        [OtherKeys.radius]: CSSValue;
      };
      cloud: {
        [CSSPropertyKeys.width]: CSSValue;
      };
    }>;
  };
};

export type ThemeInvariantConfigPath = Leaves<ThemeInvariantConfig>;

export type ThemeVariantConfig = {
  landing: {
    navbar: {
      animationInViewport: {
        [CSSPropertyKeys.backgroundColor]: ThemeVariantConfigValue;
        [CSSPropertyKeys.color]: ThemeVariantConfigValue;
      };
      animationNotInViewport: {
        [CSSPropertyKeys.backgroundColor]: ThemeVariantConfigValue;
        [CSSPropertyKeys.color]: ThemeVariantConfigValue;
      };
    };
    animation: {
      sky: {
        initial: {
          [CSSPropertyKeys.backgroundColor]: ThemeVariantConfigValue;
        };
        final: {
          [CSSPropertyKeys.backgroundColor]: ThemeVariantConfigValue;
        };
      };
      beach: {
        [CSSPropertyKeys.backgroundColor]: ThemeVariantConfigValue;
      };
    };
  };
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
    [ThemeKeys.themeBlue]: '#acf8fc',
    [ThemeKeys.themeBlueDark]: '#0f1a3a',
    [ThemeKeys.white0]: '#ffffff',
    [ThemeKeys.white1]: '#f2f2f2',
    [ThemeKeys.white2]: '#eaeaea',
    [ThemeKeys.black0]: '#000000',
    [ThemeKeys.black1]: '#181818',
    [ThemeKeys.black2]: '#212121',
    navbar: {
      desktop: { [CSSPropertyKeys.height]: '60px' },
      mobile: { [CSSPropertyKeys.height]: '60px' },
    },
    landing: {
      animation: {
        desktop: {
          sun: {
            [OtherKeys.initialX]: '25px',
            [OtherKeys.initialY]: '25px',
            [OtherKeys.radius]: '110px',
          },
          cloud: {
            [CSSPropertyKeys.width]: '110px',
          },
        },
        mobile: {
          sun: {
            [OtherKeys.initialX]: '25px',
            [OtherKeys.initialY]: '25px',
            [OtherKeys.radius]: '110px',
          },
          cloud: {
            [CSSPropertyKeys.width]: '110px',
          },
        },
      },
    },
  },
  lightMode: {
    landing: {
      navbar: {
        animationInViewport: {
          [CSSPropertyKeys.backgroundColor]: VariablePath('dl-white-0'),
          [CSSPropertyKeys.color]: VariablePath('dl-black-0'),
        },
        animationNotInViewport: {
          [CSSPropertyKeys.backgroundColor]: VariablePath('dl-black-2'),
          [CSSPropertyKeys.color]: VariablePath('dl-white-0'),
        },
      },
      animation: {
        sky: {
          initial: {
            [CSSPropertyKeys.backgroundColor]: VariablePath('dl-theme-blue'),
          },
          final: {
            [CSSPropertyKeys.backgroundColor]: '#ff9966',
          },
        },
        beach: {
          [CSSPropertyKeys.backgroundColor]: '#eed6af',
        },
      },
    },
    resume: {
      background: { [CSSPropertyKeys.backgroundColor]: '#ebebeb' },
      page: {
        [CSSPropertyKeys.backgroundColor]: VariablePath('dl-white-0'),
      },
      body: {
        [CSSPropertyKeys.fontColor]: VariablePath('dl-black-0'),
      },
      anchor: { [CSSPropertyKeys.fontColor]: VariablePath('dl-black-0') },
    },
  },
  darkMode: {
    landing: {
      navbar: {
        animationInViewport: {
          [CSSPropertyKeys.backgroundColor]: VariablePath('dl-black-1'),
          [CSSPropertyKeys.color]: VariablePath('dl-white-0'),
        },
        animationNotInViewport: {
          [CSSPropertyKeys.backgroundColor]: VariablePath('dl-black-1'),
          [CSSPropertyKeys.color]: VariablePath('dl-white-0'),
        },
      },
      animation: {
        sky: {
          initial: {
            [CSSPropertyKeys.backgroundColor]: VariablePath('dl-theme-blue'),
          },
          final: {
            [CSSPropertyKeys.backgroundColor]: '#ff9966',
          },
        },
        beach: {
          [CSSPropertyKeys.backgroundColor]: '#eed6af',
        },
      },
    },
    resume: {
      background: {
        [CSSPropertyKeys.backgroundColor]: VariablePath('dl-black-2'),
      },
      page: { [CSSPropertyKeys.backgroundColor]: VariablePath('dl-black-1') },
      body: { [CSSPropertyKeys.fontColor]: VariablePath('dl-white-0') },
      anchor: { [CSSPropertyKeys.fontColor]: VariablePath('dl-theme-blue') },
    },
  },
};

export default themeConfig;
