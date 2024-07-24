import React from 'react';
import ServiceCard from "@patternfly/react-component-groups/dist/dynamic/ServiceCard";

export const BasicExample: React.FunctionComponent = () => <ServiceCard 
  title='Example'
  subtitle='A basic example'
  description='This is a basic ServiceCard Example'
  iconUrl='/'
  showDisabledButton={false}
  helperText=''
  learnMoreUrl='/'
  launchUrl='/'
/>
