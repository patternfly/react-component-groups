import ExternalLinkButton from '@patternfly/react-component-groups/dist/dynamic/ExternalLinkButton';

export const BasicExample = () => (
  <ExternalLinkButton
    href="https://www.patternfly.org"
    iconProps={{ title: '(Opens in new tab)' }}
    variant="link"
  >
    Learn more about PatternFly
  </ExternalLinkButton>
);
