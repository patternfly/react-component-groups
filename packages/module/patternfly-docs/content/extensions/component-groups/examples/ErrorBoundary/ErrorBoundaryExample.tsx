import React from 'react';
import { ErrorBoundary } from '@patternfly/react-component-groups';

export const BasicExample: React.FunctionComponent = () => {
  const Surprise = () => {
    throw new Error('but a welcome one');
  };

  return (<ErrorBoundary headerTitle="My app header" errorTitle="Something wrong happened">
    <Surprise />
  </ErrorBoundary>);
}
