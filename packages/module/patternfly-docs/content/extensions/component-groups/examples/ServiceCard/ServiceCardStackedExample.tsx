import React from 'react';
import ServiceCard from "@patternfly/react-component-groups/dist/dynamic/ServiceCard";
import contentHeaderIcon from '../../assets/icons/content-header-icon.svg';
import { Button, ButtonVariant } from '@patternfly/react-core';


export const BasicExample: React.FunctionComponent = () => (
  <ServiceCard
    isStacked
    title='Example'
    subtitle='A basic example'
    description='This is a basic ServiceCard Example'
    icon={<img src={contentHeaderIcon} alt="content-header-icon" />}
    helperText='Here is helper text'
    footer={<>
      <Button
        variant={ButtonVariant.secondary}
        className='pf-v6-u-mr-md'
        component="a"
        href='www.patternfly.org'>
          Launch
      </Button>
      <Button
        variant={ButtonVariant.link}
        component="a"
        href='www.patternfly.org'
      >
          Learn More
      </Button></>
    }
  />
);