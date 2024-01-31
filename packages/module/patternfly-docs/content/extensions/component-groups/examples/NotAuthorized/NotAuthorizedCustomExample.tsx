import React from 'react';
import { Button } from '@patternfly/react-core';
import NotAuthorized from "@patternfly/react-component-groups/dist/dynamic/NotAuthorized";

export const BasicExample: React.FunctionComponent = () => {
  const primaryAction = 
    <Button key="1">
      Custom primary action
    </Button>;
  const secondaryActions = [
    <Button key="2" variant="link">
      Second action
    </Button>,
    <Button key="3" variant="link">
      Third action
    </Button>
  ];
  return (
    <NotAuthorized 
      primaryAction={primaryAction} 
      secondaryActions={secondaryActions}
      description="Description text" 
      serviceName="Demo bundle"
      prevPageButtonText="Go to previous page"
    />
  );
}
