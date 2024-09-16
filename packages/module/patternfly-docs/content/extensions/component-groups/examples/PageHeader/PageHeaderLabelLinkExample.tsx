import React from 'react';
import PageHeader from '@patternfly/react-component-groups/dist/dynamic/PageHeader';
import { Label } from '@patternfly/react-core';

export const BasicExample: React.FunctionComponent = () => (
  <PageHeader 
    title='My Title'
    subtitle='This is a subtitle for your page header'
    label={<Label className="pf-v5-u-align-content-center">Org. Administrator</Label>}
    linkProps={{
      label: 'Go to this link',
      isExternal: true,
    }}
  />
);
