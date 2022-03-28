import type { ComponentType } from 'react';
import { CreateStyled } from '@emotion/styled';
import type { MDXProviderComponents } from '@mdx-js/react';

import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import { useMDXComponents } from '@mdx-js/react';

import ObjectRenderer from './Solution';

import 'react-tabs/style/react-tabs.css';

class MDXComponentFactory {
  mdxComponents: MDXProviderComponents;

  styled: CreateStyled;

  constructor(mdxComponents: MDXProviderComponents) {
    this.mdxComponents = mdxComponents;
    this.styled = require('@emotion/styled').default;
  }

  getComponent(componentName: string): ComponentType {
    const Component = this.mdxComponents[componentName];

    if (Component !== undefined) {
      return Component;
    } else if (this.styled[componentName] !== undefined) {
      return this.styled[componentName]``;
    } else {
      return this.styled.span``;
    }
  }
}

const Examples = () => {
  const componentFactory = new MDXComponentFactory(useMDXComponents());
  const Wrapper = componentFactory.getComponent('wrapper');
  const P = componentFactory.getComponent('p');
  const Em = componentFactory.getComponent('em');
  const Strong = componentFactory.getComponent('strong');
  const Pre = componentFactory.getComponent('pre');
  const CodeComponent = componentFactory.getComponent('code');
  const Hr = componentFactory.getComponent('hr');

  const StrongEmphasis = (props) => (
    <Strong>
      <Em {...props} />
    </Strong>
  );

  const Code = (props) => (
    <Pre>
      <CodeComponent {...props} />
    </Pre>
  );

  return (
    <Wrapper>
      <Tabs>
        <TabList>
          <Tab>Full Example</Tab>
          <Tab>Flat Elements</Tab>
          <Tab>Nested Elements</Tab>
        </TabList>
        <TabPanel>
          <P>
            The following examples are sorted by the recommended order to tackle
            the problem. You may feel free to follow or deviate from the
            recommended order. A full example:
          </P>
          <Code>
            <ObjectRenderer
              object={{
                null: null,
                boolean: true,
                number: 42,
                string: 'Hello World!',
                object: {
                  foo: 'bar',
                  baz: 'qux',
                },
                array: [null, true, false, 1, 'two', { buckle: 'my shoe' }],
              }}
            />
          </Code>
        </TabPanel>
        <TabPanel>
          <Tabs>
            <TabList>
              <Tab>null</Tab>
              <Tab>boolean</Tab>
              <Tab>number</Tab>
              <Tab>string</Tab>
            </TabList>
            <TabPanel>
              <Code>
                <ObjectRenderer object={null} />
              </Code>
            </TabPanel>
            <TabPanel>
              <Code>
                <ObjectRenderer object={true} />
              </Code>
              <Code>
                <ObjectRenderer object={false} />
              </Code>
            </TabPanel>
            <TabPanel>
              <Code>
                <ObjectRenderer object={42} />
              </Code>
            </TabPanel>
            <TabPanel>
              <Code>
                <ObjectRenderer object={'Hello World!'} />
              </Code>
            </TabPanel>
          </Tabs>
        </TabPanel>
        <TabPanel>
          <P>
            <StrongEmphasis>Note:</StrongEmphasis> It <Em>may</Em> be simpler to
            focus on rendering arrays and objects first, then the collapsing of
            arrays and objects.
          </P>
          <Hr />
          <Tabs>
            <TabList>
              <Tab>array</Tab>
              <Tab>object</Tab>
            </TabList>
            <TabPanel>
              <Code>
                <ObjectRenderer object={[null, true, false, 1, 'two']} />
              </Code>
            </TabPanel>
            <TabPanel>
              <Code>
                <ObjectRenderer object={{ foo: 'bar', baz: 'qux' }} />
              </Code>
            </TabPanel>
          </Tabs>
        </TabPanel>
      </Tabs>
    </Wrapper>
  );
};

export default Examples;
