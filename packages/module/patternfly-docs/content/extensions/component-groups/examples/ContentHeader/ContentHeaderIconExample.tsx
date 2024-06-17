import React from 'react';
import ContentHeader from '@patternfly/react-component-groups/dist/dynamic/ContentHeader';
import contentHeaderIcon from '../../assets/icons/content-header-icon.svg';


export const IconExample: React.FunctionComponent = () => (
  <ContentHeader 
    title='My Title'
    subtitle='This is a subtitle for your content header' 
    icon={<img src={contentHeaderIcon} alt="content-header-icon" />}
  />
);
