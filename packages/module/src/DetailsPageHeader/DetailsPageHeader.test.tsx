import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import DetailsPageHeader, { DetailsPageHeaderProps } from './DetailsPageHeader';

const mockCallback = jest.fn();

const mockProps: DetailsPageHeaderProps = {
  breadcrumbs: <div>Some breadcrumbs</div>,
  pageHeading: {
    title: 'example-resource',
  },
  actionButtons: [
    {
      children: 'Primary action',
      onClick: mockCallback,
    },
  ],
  actionMenu: {
    actions: [
      {
        children: 'Edit resource',
        itemID: 'details-page-header-action-menu-example-1',
        action: {
          // eslint-disable-next-line no-console
          callback: () => console.log('Edit resource clicked'),
        },
      },
      {
        children: 'Delete resource',
        itemID: 'details-page-header-action-menu-example-2',
        action: {
          // eslint-disable-next-line no-console
          callback: () => console.log('Delete resource clicked'),
        },
        isDisabled: true,
      },
    ],
    isDisabled: false,
  },
};

const detailsPageHeaderJSX = (args: DetailsPageHeaderProps) => (
  <MemoryRouter initialEntries={[ '/resources/example-resource' ]}>
    <Routes>
      <Route element={<DetailsPageHeader {...args} />} path="/resources/example-resource" />
      <Route element={<div>Resource list page</div>} path="/resources" />
    </Routes>
  </MemoryRouter>
);

describe('DetailsPageHeader', () => {
  test('DetailsPageHeader is rendered with breadcrumbs, heading, action buttons and action menu', () => {
    render(detailsPageHeaderJSX(mockProps));

    // Breadcrumbs
    expect(screen.getByText('Resources')).toBeVisible();
    expect(screen.getByText('Resource details')).toBeVisible();
    // Page heading
    expect(screen.getByText('example-resource')).toBeVisible();
    // Action buttons
    expect(screen.getByText('Primary action')).toBeVisible();
    // Action menu
    expect(screen.getByText('Actions')).toBeVisible();
  });
  test('Clicking on breadcrumb triggers specified path', () => {
    render(detailsPageHeaderJSX(mockProps));

    // Click Workspaces link
    fireEvent.click(screen.getByTestId('breadcrumb-link-0'));
    expect(screen.getByText('Resource list page')).toBeVisible();
  });
  test('Clicking on actions menu reveals menu options', () => {
    render(detailsPageHeaderJSX(mockProps));

    fireEvent.click(screen.getByText('Actions'));
    expect(screen.getByText('Edit resource')).toBeVisible();
    expect(screen.getByText('Delete resource')).toBeVisible();
  });
  test('Action button triggers callback', () => {
    render(detailsPageHeaderJSX(mockProps));

    fireEvent.click(screen.getByText('Primary action'));
    expect(mockCallback).toHaveBeenCalled();
  });
});
