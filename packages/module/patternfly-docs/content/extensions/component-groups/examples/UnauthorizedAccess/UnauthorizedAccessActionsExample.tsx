import { FunctionComponent } from 'react';
import { Button } from '@patternfly/react-core';
import UnauthorizedAccess from '@patternfly/react-component-groups/dist/dynamic/UnauthorizedAccess';

export const BasicExample: FunctionComponent = () => {
  const primaryAction = <Button key="1">Custom primary action</Button>;
  const secondaryActions = [
    <Button key="2" variant="link">
      Second action
    </Button>,
    <Button key="3" variant="link">
      Third action
    </Button>
  ];
  return (
    <UnauthorizedAccess
      primaryAction={primaryAction}
      secondaryActions={secondaryActions}
      bodyText="Description text"
      serviceName="Demo bundle"
      prevPageButtonText="Go to previous page"
    />
  );
};
