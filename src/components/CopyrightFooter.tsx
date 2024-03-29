import React from 'react';

import { css } from '@emotion/react';
import { getYear } from 'date-fns';

interface CopyrightFooterProps {
  AnchorComponent?: React.ComponentType<React.HTMLProps<HTMLAnchorElement>>;
  className?: string;
}

export default ({
  AnchorComponent = (props) => <a {...props} />,
  className,
}: CopyrightFooterProps) => (
  <footer
    className={className}
    css={css`
      padding: 2em 0;

      text-align: center;
      font-size: 0.9em;
    `}
  >
    Copyright © 2015-{getYear(new Date())}{' '}
    <AnchorComponent href="/humans.txt">David Luu</AnchorComponent>. Custom
    designed and built.
  </footer>
);
