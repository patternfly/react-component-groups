import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import ContentHeader, { ContentHeaderProps } from './ContentHeader';
import { MemoryRouter, Routes, Route } from 'react-router';

const mockCallback = jest.fn();

const mockProps: ContentHeaderProps = {
  breadcrumbs: <div>Some breadcrumbs</div>,
  title: 'My title',
  subtitle: 'This is a subtitle for your content header',
  actionMenu: {
    actions: [
      {
        children: 'Edit',
        itemId: 'content-header-action-menu-example-1',
        onClick: mockCallback,
      },
      {
        children: 'Delete',
        itemId: 'content-header-action-menu-example-2',
        onClick: mockCallback,
        isDisabled: true,
      },
    ],
    isDisabled: false,
  },
};

const contentHeaderJSX = (args: ContentHeaderProps) => (
  <MemoryRouter initialEntries={[ '/resources/example-resource' ]}>
    <Routes>
      <Route element={<ContentHeader {...args} />} path="/resources/example-resource/example" />
      <Route element={<ContentHeader {...args} />} path="/resources/example-resource" />
      <Route element={<div>Home</div>} path="/resources" />
    </Routes>
  </MemoryRouter>
);

describe('ContentHeader', () => {
  test('ContentHeader is rendered with breadcrumbs, title, subtitle and action menu', () => {
    render(contentHeaderJSX(mockProps));
  
    // Breadcrumbs
    expect(screen.getByText('Some breadcrumbs')).toBeVisible();
    // Title
    expect(screen.getByText('My title')).toBeVisible();
    // Subtitle
    expect(screen.getByText('This is a subtitle for your content header')).toBeVisible();
  });

  test('Clicking on actions menu reveals menu options', async () => {
    render(contentHeaderJSX(mockProps));

    fireEvent.click(screen.getByRole('button'));

    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
  })
});


