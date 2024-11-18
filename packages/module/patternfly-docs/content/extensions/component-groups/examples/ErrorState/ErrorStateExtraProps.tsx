import React from 'react';
import ErrorState from "@patternfly/react-component-groups/dist/dynamic/ErrorState";
import { PathMissingIcon } from '@patternfly/react-icons/dist/dynamic/icons/path-missing-icon';

export const BasicExample: React.FunctionComponent = () => (
  <ErrorState 
    titleText='Sample error title' 
    bodyText='Sample error description' 
    headingLevel='h2'
    icon={PathMissingIcon}
    status="none"
    customFooter="Any other details in a custom footer."
  />
);
