import ExternalLinkButton from '@patternfly/react-component-groups/dist/dynamic/ExternalLinkButton';
import { Content, ContentVariants } from '@patternfly/react-core';

export const BasicExample = () => (
  <Content component={ContentVariants.p}>
    Today, I had a burger for lunch. It reminded me of the
    <ExternalLinkButton
      href="https://www.patternfly.org"
      isInline
      variant="link"
    >
      PatternFly
    </ExternalLinkButton>
    design system.
  </Content>
);
