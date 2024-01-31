import React from 'react';
import NotAuthorized from "@patternfly/react-component-groups/dist/dynamic/NotAuthorized";

export const BasicExample: React.FunctionComponent = () => (
  <NotAuthorized 
    description="Description text" 
    serviceName="Demo bundle"
    prevPageButtonText="Go to previous page"
  />
);

