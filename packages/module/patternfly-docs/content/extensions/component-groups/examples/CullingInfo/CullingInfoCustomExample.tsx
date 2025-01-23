import React from 'react';
import CullingInformation from '@patternfly/react-component-groups/dist/dynamic/CullingInfo';


export const CustomizedRenderExample: React.FunctionComponent = () => {
  const staleDate = new Date('Sun Jan 26 2020');
  const warningDate = new Date('Mon Feb 03 2025');
  const cullingDate = new Date('Fri Feb 07 2025');
  return <>
    <CullingInformation
      stale={staleDate}
      currDate={new Date()}
      culled={cullingDate}
      staleWarning={warningDate}
      render={({ msg }) => (<React.Fragment>{msg} Hello there. Last seen: {` `}</React.Fragment>)}>
    </CullingInformation>
  </>
};