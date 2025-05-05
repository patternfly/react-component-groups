/* eslint-disable no-console */
import { FunctionComponent } from 'react';
import CloseButton from '@patternfly/react-component-groups/dist/dynamic/CloseButton';

export const BasicExample: FunctionComponent = () => (
  <>
    <CloseButton
      dataTestID="close-button-example"
      onClick={() => {
        console.log('Close button clicked');
      }}
      style={{ float: 'none' }}
    />
  </>
);
