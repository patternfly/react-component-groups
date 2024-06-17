/* eslint-disable no-console */
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { CheckCircleIcon } from '@patternfly/react-icons';
import { Breadcrumb, BreadcrumbItem } from '@patternfly/react-core';
import DetailsPage from '@patternfly/react-component-groups/dist/dynamic/DetailsPage';

export const BasicExample: React.FunctionComponent = () => (
  <Router>
    <DetailsPage
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
          icon: <CheckCircleIcon color="#3E8635" />,
          isCompact: true,
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
            itemId: 'details-page-action-menu-example-1',
            onClick: () => console.log('Edit resource clicked')
          },
          {
            children: 'Delete resource',
            itemId: 'details-page-action-menu-example-2',
            onClick: () => console.log('Delete resource clicked'),
            isDisabled: true,
          },
        ],
        id: 'details-page-action-menu-example'
      }}
      tabs={[
        { eventKey: 'details', title: 'Details', children: <div className="pf-v6-u-m-md">Details content</div> },
        { eventKey: 'other', title: 'Other', children: <div className="pf-v6-u-m-md">Other content</div> }
      ]}
    />
  </Router>
);
