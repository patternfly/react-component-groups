import React from 'react';
import { HorizontalNav } from '@patternfly/react-component-groups';

export const BasicExample: React.FunctionComponent = () => (
  <HorizontalNav
    tabs={[
      { eventKey: 'details', title: 'Details', children: <div>Details children</div> },
      { eventKey: 'other', title: 'Other', children: <div>Other content</div> }
    ]}
  />
);
