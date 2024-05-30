/* eslint-disable no-console */
import React from 'react';
import ContentHeader from '@patternfly/react-component-groups/dist/dynamic/ContentHeader';

export const IconExample: React.FunctionComponent = () => (
  <ContentHeader 
    title='My Title'
    subtitle='This is a subtitle for your content header' 
    icon={<img src='https://console.redhat.com/apps/frontend-assets/rbac-landing/rbac-landing-icon.svg'/>}
  />
);
