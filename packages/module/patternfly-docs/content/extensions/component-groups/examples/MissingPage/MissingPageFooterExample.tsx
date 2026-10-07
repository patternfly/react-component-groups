import { FunctionComponent } from 'react';
import { Button } from '@patternfly/react-core';
import MissingPage from '@patternfly/react-component-groups/dist/dynamic/MissingPage';

export const MissingPageFooterExample: FunctionComponent = () => (
  <MissingPage
    customFooter={
      <>
        <Button variant="primary" component="a" href="/">
          Go to home page
        </Button>
        <Button variant="link" onClick={() => history.back()}>
          Return to previous page
        </Button>
      </>
    }
  />
);
