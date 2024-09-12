import React from 'react';
import PageHeader from '@patternfly/react-component-groups/dist/dynamic/PageHeader';
import { Breadcrumb, BreadcrumbItem } from '@patternfly/react-core';

export const BreadcrumbExample: React.FunctionComponent = () => (
  <PageHeader 
    breadcrumbs={ 
      <Breadcrumb>
        <BreadcrumbItem
          to="/resources"
          key="resources"
        >
        Section home
        </BreadcrumbItem>
        <BreadcrumbItem
          isActive
          to="/resources/example-resource"
          key="resources-example"
        >
        Section title
        </BreadcrumbItem>
        <BreadcrumbItem
          isActive
          to="/resources/example-resource/example"
          key="example"
        >
        Section title
        </BreadcrumbItem>
      </Breadcrumb>
    }
    title='My Title'
    subtitle='This is a subtitle for your page header' 
  />
);
