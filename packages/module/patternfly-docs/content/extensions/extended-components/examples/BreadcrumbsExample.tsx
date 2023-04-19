import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Breadcrumbs } from '@patternfly/react-component-groups';

export const BasicExample: React.FunctionComponent = () => (
  <Router>
    <Breadcrumbs
      breadcrumbs={[
        { children: 'Resources', to: '/resources' },
        { children: 'Resource details', to: '/resources/example-resource' },
      ]}
    />
  </Router>
);
