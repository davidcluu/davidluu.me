import type { PropsWithChildren } from 'react';

import { css } from '@emotion/react';

interface ContentWrapperProps {
  id: string;
}

const ContentWrapper = (props: PropsWithChildren<ContentWrapperProps>) => (
  <section
    css={css`
      margin: 0 auto;
      padding: 5em 0;

      display: flex;
      justify-content: center;
    `}
    {...props}
  />
);

export default ContentWrapper;
