import React from 'react';
import PageHeader from '@patternfly/react-component-groups/dist/dynamic/PageHeader';
import { Breadcrumb, BreadcrumbItem } from '@patternfly/react-core';

export const BreadcrumbExample: React.FunctionComponent = () => (
  <PageHeader 
    breadcrumbs={ 
      <Breadcrumb>
        <BreadcrumbItem
          to="#"
          key="home"
        >
        Home
        </BreadcrumbItem>
        <BreadcrumbItem
          to="#"
          key="services"
        >
        Services
        </BreadcrumbItem>
        <BreadcrumbItem
          isActive
          to="#"
          key="serviceA"
        >
        Service A
        </BreadcrumbItem>
      </Breadcrumb>
    }
    title='My Title'
    subtitle='This is a subtitle for your page header' 
  />
);
