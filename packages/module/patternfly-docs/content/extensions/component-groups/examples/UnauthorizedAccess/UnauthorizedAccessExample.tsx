import React from 'react';
import UnauthorizedAccess from "@patternfly/react-component-groups/dist/dynamic/UnauthorizedAccess";

export const BasicExample: React.FunctionComponent = () => (
  <UnauthorizedAccess 
    bodyText="Description text" 
    serviceName="Demo bundle"
  />
);

