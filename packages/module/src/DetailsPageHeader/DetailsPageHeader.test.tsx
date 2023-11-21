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
        itemId: 'action-menu-grouped-group-1-example-1',
        onClick: mockCallback,
        tooltipProps: { content: 'Sample tooltip' },
      },
      {
        children: 'Delete resource',
        itemId: 'action-menu-grouped-group-1-example-2',
        onClick: mockCallback,
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
    expect(screen.getByText('Some breadcrumbs')).toBeVisible();
    // Page heading
    expect(screen.getByText('example-resource')).toBeVisible();
    // Action buttons
    expect(screen.getByText('Primary action')).toBeVisible();
    // Action menu
    expect(screen.getByText('Actions')).toBeVisible();
  });
  test('Clicking on actions menu reveals menu options', () => {
    render(detailsPageHeaderJSX(mockProps));

    fireEvent.click(screen.getByText('Actions'));
    expect(screen.getByText('Edit resource')).toBeInTheDocument();
    expect(screen.getByText('Delete resource')).toBeInTheDocument();
  });
  test('Action button triggers callback', () => {
    render(detailsPageHeaderJSX(mockProps));

    fireEvent.click(screen.getByText('Primary action'));
    expect(mockCallback).toHaveBeenCalled();
  });
});
