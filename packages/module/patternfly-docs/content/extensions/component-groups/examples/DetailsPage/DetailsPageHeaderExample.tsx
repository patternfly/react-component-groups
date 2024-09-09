/* eslint-disable no-console */
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { CheckCircleIcon } from '@patternfly/react-icons';
import DetailsPageHeader from '@patternfly/react-component-groups/dist/dynamic/DetailsPageHeader';
import { Breadcrumb, BreadcrumbItem } from '@patternfly/react-core';

export const BasicExample: React.FunctionComponent = () => (
  <Router>
    <DetailsPageHeader
      breadcrumbs={ 
        <Breadcrumb>
          <BreadcrumbItem
            to="/resources"
            key="resources"
          >
            Resources
          </BreadcrumbItem>
          <BreadcrumbItem
            isActive
            to="/resources/example-resource"
            key="resources-example"
          >
            Resource details
          </BreadcrumbItem>
        </Breadcrumb>
      }
      pageHeading={{
        title: 'example-resource',
        label: {
          children: 'Ready',
          icon: <CheckCircleIcon color="#3E8635" />
        },
      }}
      actionButtons={[
        {
          children: 'Primary action',
          // eslint-disable-next-line no-console
          onClick: () => console.log('Primary action clicked'),
          tooltip: 'Click me!',
        },
      ]}
      actionMenu={{
        actions: [
          {
            children: 'Edit resource',
            itemId: 'details-page-header-action-menu-example-1',
            onClick: () => console.log('Edit resource clicked'),
          },
          {
            children: 'Delete resource',
            itemId: 'details-page-header-action-menu-example-2',
            onClick: () => console.log('Delete resource clicked'),
            isDisabled: true,
          },
        ],
        id: 'details-page-header-action-menu-example',
      }}
    />
  </Router>
);
