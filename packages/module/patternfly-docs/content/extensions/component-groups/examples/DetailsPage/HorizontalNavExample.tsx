import React from 'react';
import HorizontalNav from '@patternfly/react-component-groups/dist/dynamic/HorizontalNav';

export const BasicExample: React.FunctionComponent = () => (
  <HorizontalNav
    tabs={[
      { eventKey: 'details', title: 'Details', children: <div className="pf-v5-u-m-md">Details content</div> },
      { eventKey: 'other', title: 'Other', children: <div className="pf-v5-u-m-md">Other content</div> }
    ]}
  />
);
