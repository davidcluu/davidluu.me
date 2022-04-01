import type { MotionStyle } from 'framer-motion';

import { Fragment, useState, useRef, useEffect } from 'react';
import {
  AnimatePresence,
  m,
  useAnimation,
  useAnimationFrame,
} from 'framer-motion';
import { css, useTheme } from '@emotion/react';
import { values, omit } from 'lodash/fp';

import SvgCloud from './svg/Cloud';

import { clouds as baseZIndex } from './z-indices';
import { getRandomizationRatio } from './utils';

import useLandingScrollPercentMotionValue from '../hooks/use-landing-scroll-percent-motion-value';
import useTweenPercentMotionValue from '../../../hooks/use-tween-percent-motion-value';
import { useAppSelector } from '../../../store/hooks';

import {
  getWindowWidth,
  getWindowHeight,
} from '../../../store/slices/Window/selectors';

const SCROLL_TARGET_TOP = '90%';
const getTop = (startingTop: string) =>
  useTweenPercentMotionValue(useLandingScrollPercentMotionValue(), [
    startingTop,
    SCROLL_TARGET_TOP,
  ]);

interface CloudProps {
  index: number;
  zIndexOffset?: number;
}

interface StaticCloudProps extends CloudProps {
  top: string;
  left: string;
  style?: Omit<MotionStyle, 'top' | 'translateX' | 'translateY'>;
}

const STATIC_CLOUD_TRANSLATE_RANGE = 50;
const STATIC_CLOUD_PERCENT_PER_SECOND = 20;

const StaticCloud = ({
  index,
  zIndexOffset = 0,
  top,
  left,
  style = {},
}: StaticCloudProps) => {
  const {
    utils: { getThemeVariantCSSValue, getThemeInvariantCSSValue },
  } = useTheme();
  const width = getThemeInvariantCSSValue<string>(
    'landing.animation.desktop.cloud.width'
  );
  const color = getThemeVariantCSSValue<string>(
    'landing.animation.cloud.color'
  );

  // Infinite looping animation that makes the cloud move around randomly
  // within a bounding box defined by STATIC_CLOUD_TRANSLATE_RANGE
  const animation = useAnimation();

  const startAnimation = async (
    previousX: number = 0,
    previousY: number = 0
  ) => {
    const currentX =
      Math.random() * 2 * STATIC_CLOUD_TRANSLATE_RANGE -
      STATIC_CLOUD_TRANSLATE_RANGE;
    const currentY =
      Math.random() * 2 * STATIC_CLOUD_TRANSLATE_RANGE -
      STATIC_CLOUD_TRANSLATE_RANGE;

    const distance = Math.sqrt(
      Math.pow(previousX - currentX, 2) + Math.pow(previousY - currentY, 2)
    );
    const duration =
      (distance / STATIC_CLOUD_PERCENT_PER_SECOND) * getRandomizationRatio();

    await animation.start(
      {
        translateX: `${currentX}%`,
        translateY: `${currentY}%`,
      },
      { duration, ease: 'linear' }
    );
    startAnimation(currentX, currentY);
  };

  useEffect(() => {
    startAnimation();
  }, []);

  return (
    <m.div
      data-label={`StaticCloud${index}`}
      css={css`
        width: ${width};

        position: absolute;
      `}
      style={{
        ...style,
        top: getTop(top),
        left,
        zIndex: baseZIndex + zIndexOffset + index,
      }}
      animate={animation}
    >
      <SvgCloud width={width} color={color} />
    </m.div>
  );
};

interface MovingCloudProps extends CloudProps {
  onAnimationComplete?: () => void;
}

const MOVING_CLOUD_TRANSLATE_Y_RANGE = 5;
const MOVING_CLOUD_HORIZONTAL_PIXELS_PER_SECOND = 5000;
const MOVING_CLOUD_VERTICAL_PERCENT_PER_SECOND = 10;

const MovingCloud = ({
  index,
  zIndexOffset = 0,
  onAnimationComplete = () => {},
}: MovingCloudProps) => {
  // Ratio that indicates how "far" away the cloud is (smaller = closer)
  const [cloudDistanceRatio] = useState(Math.random() * 0.5 + 0.1);
  // Top% of the cloud, in the range [0%, 40%]
  const [topPercent] = useState(`${Math.random() * 40}%`);
  // Initial left% of the cloud, in the range [-25%, 125%]
  const [initialLeftValue] = useState(Math.random() * 150 - 25);
  const initialLeft = `${initialLeftValue}%`;
  // If the cloud is initially on the left side of the page, animate it to the
  // right and vice versa, in the range [-25%, 125%]
  const [targetLeftValue] = useState(
    Math.random() * 75 + (initialLeftValue <= 50 ? 50 : -25)
  );
  const targetLeft = `${targetLeftValue}%`;

  const windowWidth = useAppSelector(getWindowWidth);

  // Animation that makes the cloud move from initialLeft to targetLeft
  const sideToSideAnimation = useAnimation();
  const startSideToSideAnimation = async () => {
    const distancePercent = Math.abs(targetLeftValue - initialLeftValue);
    const distance = distancePercent * windowWidth;
    const duration =
      (distance / MOVING_CLOUD_HORIZONTAL_PIXELS_PER_SECOND) *
      getRandomizationRatio();

    await sideToSideAnimation.start(
      {
        left: targetLeft,
      },
      {
        duration,
        ease: 'linear',
      }
    );
    return;
  };

  // Infinite looping animation that makes the cloud move up and down in a
  // bound defined by MOVING_CLOUD_TRANSLATE_Y_RANGE. The animation is stopped
  // imperatively when stopJiggleAnimation is called.
  const jiggleAnimation = useAnimation();

  const shouldStopJiggleAnimationRef = useRef(false);
  const stopJiggleAnimation = () =>
    (shouldStopJiggleAnimationRef.current = true);
  const startJiggleAnimation = async (previousY: number = 0) => {
    const currentY =
      Math.random() * 2 * MOVING_CLOUD_TRANSLATE_Y_RANGE -
      MOVING_CLOUD_TRANSLATE_Y_RANGE;

    const distance = Math.abs(previousY - currentY);
    const duration =
      (distance / MOVING_CLOUD_VERTICAL_PERCENT_PER_SECOND) *
      getRandomizationRatio();

    await jiggleAnimation.start(
      {
        translateY: `${currentY}%`,
      },
      { duration, ease: 'easeInOut' }
    );
    if (!shouldStopJiggleAnimationRef.current) {
      startJiggleAnimation(currentY);
    }
  };

  useEffect(() => {
    Promise.all([startSideToSideAnimation(), startJiggleAnimation()]).then(
      () => {
        stopJiggleAnimation();
        onAnimationComplete();
      }
    );
  }, []);

  const {
    utils: {
      getThemeInvariantCSSValue,
      getThemeVariantCSSValue,
      cssValueTransformers,
    },
  } = useTheme();
  const widthValue = getThemeInvariantCSSValue(
    'landing.animation.desktop.cloud.width',
    cssValueTransformers.pixelToNumber
  );
  const color = getThemeVariantCSSValue<string>(
    'landing.animation.cloud.color'
  );

  const valueRatio = 1 - cloudDistanceRatio;
  const width = `${widthValue * valueRatio}px`;
  const opacity = 0.8 * valueRatio;

  return (
    <m.div
      data-label={`MovingCloud${index}`}
      css={css`
        position: absolute;
      `}
      style={{
        zIndex: baseZIndex + zIndexOffset + index,
        top: getTop(topPercent),
        left: initialLeft,
      }}
      animate={sideToSideAnimation}
    >
      <m.div animate={jiggleAnimation}>
        <m.div
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity },
          }}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ type: 'tween', ease: 'easeOut', duration: 2 }}
        >
          <SvgCloud width={width} color={color} />
        </m.div>
      </m.div>
    </m.div>
  );
};

interface MovingCloudManagerSize {
  zIndexOffset: number;
}

const MovingCloudManager = ({ zIndexOffset }: MovingCloudManagerSize) => {
  const indexRef = useRef(0);

  const {
    utils: { getThemeInvariantCSSValue, cssValueTransformers },
  } = useTheme();
  const cloudWidth = getThemeInvariantCSSValue(
    'landing.animation.desktop.cloud.width',
    cssValueTransformers.pixelToNumber
  );

  const windowPixels =
    useAppSelector(getWindowWidth) * useAppSelector(getWindowHeight);
  const cloudArea = windowPixels * 0.5;
  // The cloud SVG isn't exactly a square, but this is good enough...
  const cloudSize = Math.pow(cloudWidth, 2);
  const cloudGenerationProbability = cloudSize / cloudArea / 5;

  const [cloudRefs, setCloudRefs] = useState({});
  const removeCloudCallback = (index: number) => () =>
    setCloudRefs((state) => omit(index, state));
  const createNewCloud = () => {
    const newIndex = indexRef.current;

    setCloudRefs({
      ...cloudRefs,
      [newIndex]: (
        <MovingCloud
          key={newIndex}
          index={newIndex}
          onAnimationComplete={removeCloudCallback(newIndex)}
          zIndexOffset={zIndexOffset}
        />
      ),
    });

    indexRef.current++;
  };

  useAnimationFrame(() => {
    if (Math.random() < cloudGenerationProbability) {
      createNewCloud();
    }
  });

  return <AnimatePresence>{values(cloudRefs)}</AnimatePresence>;
};

const STATIC_CLOUD_CONFIG = [
  { left: '5%', top: '10%' },
  { left: '80%', top: '15%' },
];

export default () => (
  <Fragment>
    {STATIC_CLOUD_CONFIG.map(({ left, top }, index) => (
      <StaticCloud key={index} index={index} left={left} top={top} />
    ))}
    <MovingCloudManager zIndexOffset={STATIC_CLOUD_CONFIG.length} />
  </Fragment>
);
