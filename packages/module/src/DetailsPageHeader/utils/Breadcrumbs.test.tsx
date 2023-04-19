/* eslint-disable react/jsx-props-no-spreading */
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { Breadcrumbs, BreadcrumbsProps } from './Breadcrumbs';

const mockProps: BreadcrumbsProps = {
  breadcrumbs: [
    { children: 'Resources', to: '/resources' },
    { children: 'Resource details', to: '/resources/example-resource' },
  ],
};

const breadcrumbsJSX = (args: BreadcrumbsProps) => (
  <MemoryRouter initialEntries={[ '/resources/example-resource' ]}>
    <Routes>
      <Route element={<Breadcrumbs {...args} />} path="/resources/example-resource" />
      <Route element={<div>Resource list page</div>} path="/resources" />
    </Routes>
  </MemoryRouter>
);

describe('Breadcrumbs', () => {
  test('Breadcrumbs are rendered', () => {
    render(breadcrumbsJSX(mockProps));

    expect(screen.getByText('Resources')).toBeVisible();
    expect(screen.getByText('Resource details')).toBeVisible();
  });
  test('Clicking on breadcrumb triggers specified path', () => {
    render(breadcrumbsJSX(mockProps));

    // Click Resources link
    fireEvent.click(screen.getByTestId('breadcrumb-link-0'));
    expect(screen.getByText('Resource list page')).toBeVisible();
  });
});
