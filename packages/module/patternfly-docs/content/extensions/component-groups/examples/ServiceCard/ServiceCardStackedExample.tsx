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
        variant={ButtonVariant.primary}
        isInline
        className='pf-v5-u-mr-md'
        component="a"
        href='www.google.com'>
          Launch
      </Button>
      <Button
        variant={ButtonVariant.link}
        component="a"
        isInline
        href='www.google.com'
      >
          Learn more
      </Button></>
    }
  />
);