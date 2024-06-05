import React from 'react';
import ContentHeader from '@patternfly/react-component-groups/dist/dynamic/ContentHeader';
import { Label } from '@patternfly/react-core';

export const BasicExample: React.FunctionComponent = () => (
  <ContentHeader 
    title='My Title'
    subtitle='This is a subtitle for your content header'
    label={<Label className="pf-v5-u-align-content-center">Org. Administrator</Label>}
    linkProps={{
      label: 'Go to this link',
      isExternal: true,
    }}
  />
);
