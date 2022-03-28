/* eslint-disable @typescript-eslint/no-use-before-define */

import type { ReactNode } from 'react';

import { Fragment, useState } from 'react';
import { css } from '@emotion/react';
import { isNumber, isString, isArray, isNull, isBoolean } from 'lodash';

// @ts-ignore
import { EXPANDED_BUTTON_TEXT, COLLAPSED_BUTTON_TEXT } from './Prompt.mdx';

interface ButtonProps {
  onClick: () => void;
}

interface GenericButtonProps extends ButtonProps {
  children: ReactNode;
}

const Button = ({ children, onClick }: GenericButtonProps) => (
  <button
    css={css`
      border: none;
      padding: 0;

      cursor: pointer;

      background: none;
      outline: inherit;
      font: inherit;
      color: inherit;
    `}
    onClick={onClick}
  >
    {children}
  </button>
);

const ExpandedButton = (props: ButtonProps) => (
  <Button {...props}>{EXPANDED_BUTTON_TEXT}</Button>
);

const CollapsedButton = (props: ButtonProps) => (
  <Button {...props}>{COLLAPSED_BUTTON_TEXT}</Button>
);

const Tab = ({ children }: { children: ReactNode }) => (
  <div
    css={css`
      margin-left: 20px;

      position: relative;
    `}
  >
    {children}
  </div>
);

const NextObject = () => (
  <Fragment>
    ,&nbsp;
    <br />
  </Fragment>
);

const NullRenderer = () => <Fragment>null</Fragment>;

const BooleanRenderer = ({ boolean }: { boolean: boolean }) => (
  <Fragment>{boolean ? 'true' : 'false'}</Fragment>
);

const NumberRenderer = ({ number }: { number: number }) => (
  <Fragment>{number}</Fragment>
);

const StringRenderer = ({ string }: { string: string }) => (
  <Fragment>"{string}"</Fragment>
);

const ArrayRenderer = ({ array }: { array: any[] }) => {
  const [expanded, setExpanded] = useState(true);

  return (
    <Fragment>
      {expanded ? (
        <ExpandedButton onClick={() => setExpanded(false)} />
      ) : (
        <CollapsedButton onClick={() => setExpanded(true)} />
      )}{' '}
      {expanded ? (
        <Fragment>
          [
          <Tab>
            {array.map((object, index) => (
              <Fragment key={index}>
                {index}: <ObjectRenderer object={object} />
                {index != array.length - 1 && <NextObject />}
              </Fragment>
            ))}
          </Tab>
          ]
        </Fragment>
      ) : (
        <Fragment>[{array.length}]</Fragment>
      )}
    </Fragment>
  );
};

const ObjectRenderer = ({ object }: { object: any }) => {
  if (isNull(object)) {
    return <NullRenderer />;
  } else if (isBoolean(object)) {
    return <BooleanRenderer boolean={object as boolean} />;
  } else if (isNumber(object)) {
    return <NumberRenderer number={object as number} />;
  } else if (isString(object)) {
    return <StringRenderer string={object as string} />;
  } else if (isArray(object)) {
    return <ArrayRenderer array={object as any[]} />;
  }

  const [expanded, setExpanded] = useState(true);

  return (
    <Fragment>
      {expanded ? (
        <ExpandedButton onClick={() => setExpanded(false)} />
      ) : (
        <CollapsedButton onClick={() => setExpanded(true)} />
      )}{' '}
      {expanded ? (
        <Fragment>
          {'{'}
          <Tab>
            {Object.keys(object).map((key, index) => (
              <Fragment key={key}>
                {key}: <ObjectRenderer object={object[key]} />
                {index != Object.keys(object).length - 1 && <NextObject />}
              </Fragment>
            ))}
          </Tab>
          {'}'}
        </Fragment>
      ) : (
        <Fragment>
          {'{'}
          {Object.keys(object).length}
          {'}'}
        </Fragment>
      )}
    </Fragment>
  );
};

export default ObjectRenderer;
