import React from 'react';
import { HorizontalNav } from '@patternfly/react-component-groups';

export const BasicExample: React.FunctionComponent = () => (
  <HorizontalNav
    tabs={[
      { eventKey: 'details', title: 'Details', children: <div className="pf-u-m-md">Details content</div> },
      { eventKey: 'other', title: 'Other', children: <div className="pf-u-m-md">Other content</div> }
    ]}
  />
);
