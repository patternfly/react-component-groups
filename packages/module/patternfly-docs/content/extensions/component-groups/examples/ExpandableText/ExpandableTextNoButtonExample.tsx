import React from 'react';
import ExpandableText from "@patternfly/react-component-groups/dist/dynamic/ExpandableText";

const text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
laborum.`;

export const ExpandableTextNoButtonExample: React.FunctionComponent = () => <ExpandableText data-testid="expandable-text-hover" length={50} inline={true} text={text} expandOnMouseOver hideExpandText />;
