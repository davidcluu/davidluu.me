import { css } from '@emotion/react';

import ContentWrapper from '../components/ContentWrapper';
import Header from './Header';
import ContactForm from './ContactForm';
import ContentHr from '../components/ContentHr';

import IDs from '../../../components/Navbar/ids';
import SocialLinks from './SocialLinks';

const Contact = (props: any) => (
  <ContentWrapper
    css={({ utils }) => css`
      ${utils.getThemeVariantCSSWithFallback(
        'background-color',
        'landing.oddIndexedContent.background-color'
      )}
    `}
    {...props}
    id={IDs.Contact}
  >
    <div
      css={css`
        width: 600px;
      `}
    >
      <Header />
      <ContactForm />
      <ContentHr
        css={css`
          margin: 3em 0;
        `}
      />
      <SocialLinks />
    </div>
  </ContentWrapper>
);

export default Contact;
