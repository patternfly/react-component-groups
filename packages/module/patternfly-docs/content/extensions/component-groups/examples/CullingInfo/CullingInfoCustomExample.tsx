import React from 'react';
import CullingInformation from '@patternfly/react-component-groups/dist/dynamic/CullingInfo';
import { Stack, StackItem } from '@patternfly/react-core';


export const CustomizedRenderExample: React.FunctionComponent = () => {
  const staleDate = new Date('Sun Jan 26 2020');
  const warningDate = new Date('Mon Feb 03 2025');
  const cullingDate = new Date('Fri Feb 07 2025');
  return <>
    <Stack>
      <StackItem>
        <CullingInformation
          stale={staleDate}
          currDate={new Date()}
          culled={cullingDate}
          staleWarning={warningDate}
          render={({ msg }) => (<React.Fragment>{msg}</React.Fragment>)}>
        </CullingInformation>
      </StackItem>

      <StackItem>
        <CullingInformation
          stale={staleDate}
          currDate={new Date()}
          culled={new Date('Fri Feb 07 2024')}
          staleWarning={new Date('Mon Feb 03 2024')}
          render={() => (<React.Fragment>This is an error message. Item is past due</React.Fragment>)}>
        </CullingInformation>
      </StackItem>
    </Stack>
   

    
  </>
};