/* eslint-disable no-console */
import React from 'react';
import ContentHeader from '@patternfly/react-component-groups/dist/dynamic/ContentHeader';

export const BasicExample: React.FunctionComponent = () => (
  <ContentHeader 
    title='My Title'
    subtitle='This is a subtitle for your content header'
    label='Org. Administrator'
    linkProps={{
      label: 'Go to this link',
      isExternal: true,
    }}
  />
);
