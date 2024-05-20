/* eslint-disable no-console */
import React from 'react';
import ContentHeader from '@patternfly/react-component-groups/dist/dynamic/ContentHeader';
import { Breadcrumb, BreadcrumbItem } from '@patternfly/react-core';
import { RouteIcon } from '@patternfly/react-icons';


export const BasicExample: React.FunctionComponent = () => (
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
    actionMenu={{
      actions: [
        {
          children: 'Edit',
          itemId: 'content-header-action-menu-example-1',
          onClick: () => console.log('Edit item clicked'),
        },
        {
          children: 'Delete',
          itemId: 'content-header-action-menu-example-2',
          onClick: () => console.log('Delete item clicked'),
          isDisabled: true,
        },
      ],
      id: 'content-header-action-menu-example',
    }}
    icon={<RouteIcon />}
    title='My Title'
    subtitle='This is a subtitle for your content header' 
    label='Org. Administrator'
    link="Link"
  />
);
