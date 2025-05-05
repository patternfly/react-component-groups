import { FunctionComponent } from 'react';
import { Button } from '@patternfly/react-core';
import ErrorState from '@patternfly/react-component-groups/dist/dynamic/ErrorState';

export const BasicExample: FunctionComponent = () => (
  <ErrorState
    titleText="Sample error title"
    bodyText="Sample error description"
    customFooter={
      // eslint-disable-next-line no-console
      <Button variant="secondary" onClick={() => console.log('Custom button clicked')}>
        Custom action
      </Button>
    }
  />
);
