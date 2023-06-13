import React from 'react';
import { ErrorBoundaryPage } from '@patternfly/react-component-groups';

export const BasicExample: React.FunctionComponent = () => {
  const Surprise = () => {
    throw new Error('but a welcome one');
  };

  return (<ErrorBoundaryPage headerTitle="My app header" errorTitle="Something wrong happened">
    <Surprise />
  </ErrorBoundaryPage>);
}
