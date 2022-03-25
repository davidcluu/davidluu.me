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

import useLandingScrollPercentMotionValue from '../hooks/use-landing-scroll-percent-motion-value';
import useTweenPercentMotionValue from '../../../hooks/use-tween-percent-motion-value';
import { useAppSelector } from '../../../store/hooks';
import {
  getWindowWidth,
  getWindowHeight,
} from '../../../store/slices/Window/selectors';

const STATIC_CLOUD_TRANSLATE_RANGE = 50;
const MOVING_CLOUD_TRANSLATE_RANGE = 5;
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
  className?: string;
  top: string;
  style?: Omit<MotionStyle, 'top' | 'translateX' | 'translateY'>;
}

const StaticCloud = ({
  index,
  className,
  zIndexOffset = 0,
  top,
  style = {},
}: StaticCloudProps) => {
  const {
    utils: { getThemeInvariantCSSValue },
  } = useTheme();

  const animation = useAnimation();

  const width = getThemeInvariantCSSValue<string>(
    'landing.animation.desktop.cloud.width'
  );

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

    await animation.start(
      {
        translateX: `${currentX}%`,
        translateY: `${currentY}%`,
      },
      { duration: distance / 20, ease: 'linear' }
    );
    startAnimation(currentX, currentY);
  };

  useEffect(startAnimation as () => void, []);

  return (
    <m.div
      data-label={`StaticCloud${index}`}
      className={className}
      css={css`
        width: ${width};

        z-index: ${baseZIndex + zIndexOffset + index};
        position: absolute;
      `}
      style={{
        ...style,
        top: getTop(top),
      }}
      animate={animation}
    >
      <SvgCloud width={width} />
    </m.div>
  );
};

interface MovingCloudProps extends CloudProps {
  onAnimationComplete?: () => void;
}

const MovingCloud = ({
  index,
  onAnimationComplete = () => {},
}: MovingCloudProps) => {
  const [cloudDistanceRatio] = useState(Math.random() * 0.5 + 0.1);
  const [topPercent] = useState(`${Math.random() * 40}%`);
  const [initialLeftValue] = useState(Math.random() * 150 - 25);
  const initialLeft = `${initialLeftValue}%`;
  // If the cloud is initially on the left side of the page, animate it to the right and vice versa...
  const [targetLeftValue] = useState(
    Math.random() * 75 + (initialLeftValue <= 50 ? 50 : -25)
  );
  const targetLeft = `${targetLeftValue}%`;

  const windowWidth = useAppSelector(getWindowWidth);

  const leftAnimation = useAnimation();
  const jiggleAnimation = useAnimation();

  const shouldStopJiggleAnimationRef = useRef(false);
  const stopJiggleAnimation = () =>
    (shouldStopJiggleAnimationRef.current = true);
  const startJiggleAnimation = async (previousY: number = 0) => {
    const currentY =
      Math.random() * 2 * MOVING_CLOUD_TRANSLATE_RANGE -
      MOVING_CLOUD_TRANSLATE_RANGE;

    const distance = Math.abs(previousY - currentY);

    await jiggleAnimation.start(
      {
        translateY: `${currentY}%`,
      },
      { duration: distance / 10, ease: 'easeInOut' }
    );
    if (!shouldStopJiggleAnimationRef.current) {
      startJiggleAnimation(currentY);
    }
  };

  useEffect(() => {
    leftAnimation
      .start(
        {
          left: targetLeft,
        },
        {
          // ((distance [0%-100%] / 100) * windowWidth) / 50 [pixels/sec] * randomization factor
          duration:
            (((Math.abs(targetLeftValue - initialLeftValue) / 50) *
              windowWidth) /
              100) *
            (Math.random() * 0.4 + 0.8),
          ease: 'linear',
        }
      )
      .then(() => {
        stopJiggleAnimation();
        onAnimationComplete();
      });

    startJiggleAnimation();
  }, []);

  const {
    utils: { getThemeInvariantCSSValue, cssValueTransformers },
  } = useTheme();
  const widthValue = getThemeInvariantCSSValue(
    'landing.animation.desktop.cloud.width',
    cssValueTransformers.pixelToNumber
  );

  const valueRatio = 1 - cloudDistanceRatio;
  const width = `${widthValue * valueRatio}px`;
  const opacity = 0.8 * valueRatio;
  const top = getTop(topPercent);

  return (
    <m.div
      data-label={`MovingCloud${index}`}
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity },
      }}
      initial="hidden"
      animate="visible"
      exit="hidden"
      transition={{ type: 'tween', ease: 'easeOut', duration: 2 }}
    >
      <m.div
        key="cloud"
        css={css`
          position: absolute;
        `}
        style={{
          top,
          left: initialLeft,
        }}
        animate={leftAnimation}
      >
        <m.div animate={jiggleAnimation}>
          <SvgCloud width={width} />
        </m.div>
      </m.div>
    </m.div>
  );
};

const MovingCloudManager = () => {
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

  const cloudGenerationProbability = Math.pow(cloudWidth, 2) / cloudArea / 5;

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
          zIndexOffset={10}
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

export default () => (
  <Fragment>
    {[
      { left: '5%', top: '10%' },
      { left: '80%', top: '15%' },
    ].map(({ left, top }, index) => (
      <StaticCloud
        key={index}
        index={index}
        css={css`
          left: ${left};

          opacity: 0.8;
        `}
        top={top}
      />
    ))}
    <MovingCloudManager />
  </Fragment>
);
