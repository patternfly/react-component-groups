/* eslint-disable no-console */
import React from 'react'
import CloseButton from '@patternfly/react-component-groups/dist/dynamic/CloseButton';

export const BasicExample: React.FunctionComponent = () => (
  <>
    <CloseButton dataTestID="close-button-example" onClick={()=>{console.log('Close button clicked')}} style={{ float: 'none' }} />
  </>
);
