import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TabProps } from '@patternfly/react-core';
import HorizontalNav from './HorizontalNav';

// Sample content components for tabs
const UsersTabContent: React.FunctionComponent = () => <div>Users Tab Content</div>;
const DatabaseTabContent: React.FunctionComponent = () => <div>Database Tab Content</div>;

const mockTabs: TabProps[] = [
  { eventKey: 'Users', title: 'Users', children: <UsersTabContent /> },
  { eventKey: 'Database', title: 'Database', children: <DatabaseTabContent /> },
];

describe('HorizontalNav', () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });
  describe('Standalone horizontal tabs without routing', () => {
    test('loads and displays tabs with default selection', () => {
      render(<HorizontalNav tabs={mockTabs} />);

      expect(screen.getByRole('tab', { selected: true })).toHaveTextContent('Users');
      expect(screen.getByText('Users Tab Content')).toBeVisible();
    });

    test('switches tab on click', () => {
      render(<HorizontalNav tabs={mockTabs} />);

      fireEvent.click(screen.getByText('Database'));

      expect(screen.getByRole('tab', { selected: true })).toHaveTextContent('Database');
      expect(screen.getByText('Database Tab Content')).toBeVisible();
    });
  });
});
