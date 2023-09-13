import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { CheckCircleIcon } from '@patternfly/react-icons';
import DetailsPageHeader from '@patternfly/react-component-groups/dist/dynamic/DetailsPageHeader';

export const BasicExample: React.FunctionComponent = () => (
  <Router>
    <DetailsPageHeader
      breadcrumbs={
        [
          { children: 'Resources', to: '/resources' },
          { children: 'Resource details', to: '/resources/example-resource' },
        ]
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
            itemID: 'details-page-header-action-menu-example-1',
            cta: {
              // eslint-disable-next-line no-console
              callback: () => console.log('Edit resource clicked'),
            },
          },
          {
            children: 'Delete resource',
            itemID: 'details-page-header-action-menu-example-2',
            cta: {
              // eslint-disable-next-line no-console
              callback: () => console.log('Delete resource clicked'),
            },
            isDisabled: true,
          },
        ],
        id: 'details-page-header-action-menu-example',
      }}
    />
  </Router>
);
