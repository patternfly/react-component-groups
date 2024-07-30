import React from 'react';
import ServiceCard from "@patternfly/react-component-groups/dist/dynamic/ServiceCard";
import contentHeaderIcon from '../../assets/icons/content-header-icon.svg';

export const BasicExample: React.FunctionComponent = () => (
  <ServiceCard 
    title='Example'
    subtitle='A basic example'
    description='This is a basic ServiceCard Example'
    icon={<img src={contentHeaderIcon} alt="content-header-icon" />}
    showDisabledButton={false}
    helperText=''
    learnMoreUrl='/'
    launchUrl='/'
  />
);