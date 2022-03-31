import type { ComponentType } from 'react';

import styled from '@emotion/styled';

const ContentHr: ComponentType<any> = styled.hr`
  margin: 0;
  height: auto;
  width: 100%;

  display: block;

  background-color: transparent;

  &:after {
    content: '•••••';

    margin: 1em 0;

    display: block;

    text-align: center;
    letter-spacing: 0.5em;
    font-size: 1.25em;
    color: #ccc;
  }
`;

export default ContentHr;
