/* eslint-disable no-console */
import React from 'react'
import CloseButton from '@patternfly/react-component-groups/dist/dynamic/CloseButton';

export const BasicExample: React.FunctionComponent = () => (
  <>
    <CloseButton onClick={()=>{console.log('Close button clicked')}} style={{ float: 'none' }} />
  </>
);
