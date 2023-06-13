import React from 'react';
import { ErrorBoundaryPage } from '@patternfly/react-component-groups';

export const BasicExample: React.FunctionComponent = () => (<ErrorBoundaryPage headerTitle={'My app header'}>
  <div>My app content</div>
</ErrorBoundaryPage>);

