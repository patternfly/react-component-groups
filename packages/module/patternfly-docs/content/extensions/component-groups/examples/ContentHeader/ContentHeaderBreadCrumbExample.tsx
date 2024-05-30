/* eslint-disable no-console */
import React from 'react';
import ContentHeader from '@patternfly/react-component-groups/dist/dynamic/ContentHeader';
import { Breadcrumb, BreadcrumbItem } from '@patternfly/react-core';

export const BreadCrumbExample: React.FunctionComponent = () => (
  <ContentHeader 
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
    subtitle='This is a subtitle for your content header' 
  />
);
