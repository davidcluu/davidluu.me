import type { Leaves } from '../utils/object-paths/types';

import {
  BODY_FONT_CSS,
  BODY_FONT_WEIGHT_LIGHT,
  BODY_FONT_WEIGHT_NORMAL,
  BODY_FONT_WEIGHT_BOLD,
  HEADER_FONT_CSS,
  HEADER_FONT_WEIGHT_NORMAL,
  HEADER_FONT_WEIGHT_BOLD,
  BASE_LINE_HEIGHT_CSS,
} from '../config/typography';

enum ViewportSizeKeys {
  desktop = 'desktop',
  mobile = 'mobile',
}

enum CSSPropertyKeys {
  width = 'width',
  height = 'height',
  backgroundColor = 'background-color',
  color = 'color',
  fontFamily = 'font-family',
  fontWeight = 'font-weight',
  fontColor = 'font-color',
  lineHeight = 'line-height',
}

enum ThemeKeys {
  themeBlue = 'dl-theme-blue',
  themeBlueDark = 'dl-theme-blue-dark',
  themeRed = 'dl-theme-red',
  themeRedDark = 'dl-theme-red-dark',
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
  [ThemeKeys.themeRed]: CSSValue;
  [ThemeKeys.themeRedDark]: CSSValue;
  [ThemeKeys.white0]: CSSValue;
  [ThemeKeys.white1]: CSSValue;
  [ThemeKeys.white2]: CSSValue;
  [ThemeKeys.black0]: CSSValue;
  [ThemeKeys.black1]: CSSValue;
  [ThemeKeys.black2]: CSSValue;
  font: {
    header: {
      [CSSPropertyKeys.fontFamily]: CSSValue;
      normal: {
        [CSSPropertyKeys.fontWeight]: CSSValue;
      };
      bold: {
        [CSSPropertyKeys.fontWeight]: CSSValue;
      };
    };
    body: {
      [CSSPropertyKeys.fontFamily]: CSSValue;
      light: {
        [CSSPropertyKeys.fontWeight]: CSSValue;
      };
      normal: {
        [CSSPropertyKeys.fontWeight]: CSSValue;
      };
      bold: {
        [CSSPropertyKeys.fontWeight]: CSSValue;
      };
    };
    [CSSPropertyKeys.lineHeight]: CSSValue;
  };
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
    [CSSPropertyKeys.fontColor]: ThemeVariantConfigValue;
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
      banner: {
        [CSSPropertyKeys.color]: ThemeVariantConfigValue;
      };
      sky: {
        initial: {
          [CSSPropertyKeys.backgroundColor]: ThemeVariantConfigValue;
        };
        final: {
          [CSSPropertyKeys.backgroundColor]: ThemeVariantConfigValue;
        };
      };
      sunOrMoon: {
        [CSSPropertyKeys.color]: ThemeVariantConfigValue;
      };
      cloud: {
        [CSSPropertyKeys.color]: ThemeVariantConfigValue;
      };
      wave0: {
        [CSSPropertyKeys.color]: ThemeVariantConfigValue;
      };
      wave1: {
        [CSSPropertyKeys.color]: ThemeVariantConfigValue;
      };
      wave2: {
        [CSSPropertyKeys.color]: ThemeVariantConfigValue;
      };
      wave3: {
        [CSSPropertyKeys.color]: ThemeVariantConfigValue;
      };
      wave4: {
        [CSSPropertyKeys.color]: ThemeVariantConfigValue;
      };
      beach: {
        [CSSPropertyKeys.backgroundColor]: ThemeVariantConfigValue;
      };
    };
    evenIndexedContent: {
      [CSSPropertyKeys.backgroundColor]: ThemeVariantConfigValue;
    };
    oddIndexedContent: {
      [CSSPropertyKeys.backgroundColor]: ThemeVariantConfigValue;
    };
    form: {
      errorMessage: {
        [CSSPropertyKeys.color]: ThemeVariantConfigValue;
      };
      submitButton: {
        [CSSPropertyKeys.backgroundColor]: ThemeVariantConfigValue;
        [CSSPropertyKeys.color]: ThemeVariantConfigValue;
        hover: {
          [CSSPropertyKeys.backgroundColor]: ThemeVariantConfigValue;
          [CSSPropertyKeys.color]: ThemeVariantConfigValue;
        };
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
    [ThemeKeys.themeRed]: '#fcb0ac',
    [ThemeKeys.themeRedDark]: '#de2831',
    [ThemeKeys.white0]: '#ffffff',
    [ThemeKeys.white1]: '#f2f2f2',
    [ThemeKeys.white2]: '#eaeaea',
    [ThemeKeys.black0]: '#000000',
    [ThemeKeys.black1]: '#181818',
    [ThemeKeys.black2]: '#212121',
    font: {
      header: {
        [CSSPropertyKeys.fontFamily]: HEADER_FONT_CSS,
        normal: {
          [CSSPropertyKeys.fontWeight]: HEADER_FONT_WEIGHT_NORMAL,
        },
        bold: {
          [CSSPropertyKeys.fontWeight]: HEADER_FONT_WEIGHT_BOLD,
        },
      },
      body: {
        [CSSPropertyKeys.fontFamily]: BODY_FONT_CSS,
        light: {
          [CSSPropertyKeys.fontWeight]: BODY_FONT_WEIGHT_LIGHT,
        },
        normal: {
          [CSSPropertyKeys.fontWeight]: BODY_FONT_WEIGHT_NORMAL,
        },
        bold: {
          [CSSPropertyKeys.fontWeight]: BODY_FONT_WEIGHT_BOLD,
        },
      },
      [CSSPropertyKeys.lineHeight]: BASE_LINE_HEIGHT_CSS,
    },
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
      [CSSPropertyKeys.fontColor]: VariablePath('dl-black-0'),
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
        banner: {
          [CSSPropertyKeys.color]: VariablePath('dl-black-0'),
        },
        sky: {
          initial: {
            [CSSPropertyKeys.backgroundColor]: VariablePath('dl-theme-blue'),
          },
          final: {
            [CSSPropertyKeys.backgroundColor]: '#ff9966',
          },
        },
        sunOrMoon: {
          [CSSPropertyKeys.color]: '#ffff00',
        },
        cloud: {
          [CSSPropertyKeys.color]: VariablePath('dl-white-0'),
        },
        wave0: {
          [CSSPropertyKeys.color]: '#28ded5',
        },
        wave1: {
          [CSSPropertyKeys.color]: '#3ce6e0',
        },
        wave2: {
          [CSSPropertyKeys.color]: '#65f0f0',
        },
        wave3: {
          [CSSPropertyKeys.color]: '#82faf8',
        },
        wave4: {
          [CSSPropertyKeys.color]: '#99f7f6',
        },
        beach: {
          [CSSPropertyKeys.backgroundColor]: '#eed6af',
        },
      },
      evenIndexedContent: {
        [CSSPropertyKeys.backgroundColor]: VariablePath('dl-white-0'),
      },
      oddIndexedContent: {
        [CSSPropertyKeys.backgroundColor]: VariablePath('dl-white-1'),
      },
      form: {
        errorMessage: {
          [CSSPropertyKeys.color]: VariablePath('dl-theme-red-dark'),
        },
        submitButton: {
          [CSSPropertyKeys.backgroundColor]: VariablePath('dl-black-2'),
          [CSSPropertyKeys.color]: VariablePath('dl-white-0'),
          hover: {
            [CSSPropertyKeys.backgroundColor]: VariablePath('dl-theme-blue'),
            [CSSPropertyKeys.color]: VariablePath('dl-black-2'),
          },
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
      [CSSPropertyKeys.fontColor]: VariablePath('dl-white-0'),
      navbar: {
        animationInViewport: {
          [CSSPropertyKeys.backgroundColor]: VariablePath('dl-black-1'),
          [CSSPropertyKeys.color]: VariablePath('dl-white-0'),
        },
        animationNotInViewport: {
          [CSSPropertyKeys.backgroundColor]: VariablePath('dl-black-0'),
          [CSSPropertyKeys.color]: VariablePath('dl-white-0'),
        },
      },
      animation: {
        banner: {
          [CSSPropertyKeys.color]: VariablePath('dl-white-0'),
        },
        sky: {
          initial: {
            [CSSPropertyKeys.backgroundColor]:
              VariablePath('dl-theme-blue-dark'),
          },
          final: {
            [CSSPropertyKeys.backgroundColor]: '#318fb5',
          },
        },
        sunOrMoon: {
          [CSSPropertyKeys.color]: '#cccc00',
        },
        cloud: {
          [CSSPropertyKeys.color]: VariablePath('dl-white-2'),
        },
        wave0: {
          [CSSPropertyKeys.color]: '#37466d',
        },
        wave1: {
          [CSSPropertyKeys.color]: '#354160',
        },
        wave2: {
          [CSSPropertyKeys.color]: '#182547',
        },
        wave3: {
          [CSSPropertyKeys.color]: '#0f1634',
        },
        wave4: {
          [CSSPropertyKeys.color]: '#0a102b',
        },
        beach: {
          [CSSPropertyKeys.backgroundColor]: '#38230a',
        },
      },
      evenIndexedContent: {
        [CSSPropertyKeys.backgroundColor]: VariablePath('dl-black-1'),
      },
      oddIndexedContent: {
        [CSSPropertyKeys.backgroundColor]: VariablePath('dl-black-2'),
      },
      form: {
        errorMessage: {
          [CSSPropertyKeys.color]: VariablePath('dl-theme-red'),
        },
        submitButton: {
          [CSSPropertyKeys.backgroundColor]: VariablePath('dl-white-2'),
          [CSSPropertyKeys.color]: VariablePath('dl-black-0'),
          hover: {
            [CSSPropertyKeys.backgroundColor]: VariablePath('dl-theme-blue'),
            [CSSPropertyKeys.color]: VariablePath('dl-black-2'),
          },
        },
      },
    },
    resume: {
      background: {
        [CSSPropertyKeys.backgroundColor]: VariablePath('dl-black-2'),
      },
      page: { [CSSPropertyKeys.backgroundColor]: VariablePath('dl-black-1') },
      body: { [CSSPropertyKeys.fontColor]: VariablePath('dl-white-0') },
      anchor: { [CSSPropertyKeys.fontColor]: VariablePath('dl-white-0') },
    },
  },
};

export default themeConfig;
