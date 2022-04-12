import type { ComponentType } from 'react';
import type { MDXProviderComponents } from '@mdx-js/react';

import { useMDXComponents } from '@mdx-js/react';
import { identity } from 'lodash/fp';

import { mapToObject } from '../../utils/lodash';

interface MDXComponentProps {
  component: keyof MDXProviderComponents;
}

export const MDXComponent = ({ component, ...props }: MDXComponentProps) => {
  const components = useMDXComponents();
  const ComponentFromHook = components[component];

  const DefaultComponent = component as unknown as ComponentType<any>;

  const Component =
    ComponentFromHook ||
    (component === 'wrapper'
      ? (componentProps) => <div {...componentProps} />
      : DefaultComponent);

  return <Component {...props} />;
};

export default mapToObject(identity, (component) => (props: any) => (
  <MDXComponent {...props} component={component} />
))(
  // https://mdxjs.com/table-of-components/
  [
    'wrapper',
    'a',
    'blockquote',
    'br',
    'code',
    'em',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'hr',
    'img',
    'li',
    'ol',
    'p',
    'pre',
    'strong',
    'ul',
  ]
);
