import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { ActionMenu } from './ActionMenu';

const mockCallback = jest.fn();

const mockActions = [
  {
    children: 'Edit resource',
    itemID: 'action-menu-example-1',
    action: {
      callback: mockCallback,
    },
  },
  {
    children: 'Delete resource',
    itemID: 'action-menu-example-2',
    action: {
      callback: jest.fn(),
    },
    isDisabled: true,
  },
];

const mockGroupedActions = [
  {
    groupId: 'group1',
    groupActions: [
      {
        children: 'Edit resource',
        itemID: 'action-menu-grouped-group-1-example-1',
        action: {
          callback: jest.fn(),
        },
        tooltip: 'Sample tooltip',
      },
      {
        children: 'Delete resource',
        itemID: 'action-menu-grouped-group-1-example-2',
        action: {
          callback: jest.fn(),
        },
        isDisabled: true,
      },
    ],
  },
  {
    groupId: 'group2',
    label: 'Group2',
    groupActions: [
      {
        children: 'External Link',
        itemID: 'action-menu-grouped-group-2-example-1',
        action: {
          href: 'https://github.com/',
          external: true,
        },
      },
      {
        itemID: 'action-menu-grouped-group-2-example-2',
        label: 'Link',
        action: {
          href: '/#',
        },
        tooltip: 'Link',
      },
    ],
  },
];

describe('ActionMenu', () => {
  test('ActionMenu is rendered', () => {
    render(<ActionMenu actions={mockActions} />);

    expect(screen.getByText('Actions')).toBeVisible();
  });
  test('ActionMenu dropdown is expanded', () => {
    render(<ActionMenu actions={mockActions} label="Test Actions" />);

    fireEvent.click(screen.getByText('Test Actions'));
    expect(screen.getByText('Edit resource')).toBeVisible();
    expect(screen.getByText('Delete resource')).toBeVisible();
    expect(screen.getByText('Delete resource').closest('a')).toHaveAttribute('aria-disabled');
  });
  test('ActionMenu is disabled', () => {
    render(<ActionMenu actions={mockActions} isDisabled />);

    expect(screen.getByText('Actions').closest('button')).toHaveAttribute('disabled');
  });
  test('Menu actions trigger callback', () => {
    render(<ActionMenu actions={mockActions} />);

    fireEvent.click(screen.getByText('Actions'));
    expect(screen.getByText('Edit resource')).toBeVisible();
    fireEvent.click(screen.getByText('Edit resource'));
    expect(mockCallback).toHaveBeenCalled();
  });
  test('Menu actions are rendered in groups', () => {
    render(<ActionMenu groupedActions={mockGroupedActions} />);

    fireEvent.click(screen.getByText('Actions'));
    expect(screen.getByText('Edit resource')).toBeVisible();
    expect(screen.getByText('Group2')).toBeVisible();
    expect(screen.getByText('External Link')).toBeVisible();
  });
});
