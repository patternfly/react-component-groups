import React from 'react';
import ErrorBoundary from '@patternfly/react-component-groups/dist/dynamic/ErrorBoundary';

export const BasicExample: React.FunctionComponent = () => (<ErrorBoundary headerTitle={'My app header'}>
  <div>My app content</div>
</ErrorBoundary>);

