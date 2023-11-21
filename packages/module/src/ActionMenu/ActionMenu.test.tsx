import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { ActionMenu } from './ActionMenu';

const mockCallback = jest.fn();

const mockActions = [
  {
    children: 'Edit resource',
    itemId: 'action-menu-example-1',
    onClick: mockCallback,
  },
  {
    children: 'Delete resource',
    itemId: 'action-menu-example-2',
    onClick: mockCallback,
    isDisabled: true,
  },
];

const mockGroupedActions = [
  {
    groupId: 'group1',
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
  },
  {
    groupId: 'group2',
    label: 'Group2',
    actions: [
      {
        children: 'External Link',
        itemId: 'action-menu-grouped-group-2-example-1',
        onClick: mockCallback,
      },
      {
        itemId: 'action-menu-grouped-group-2-example-2',
        label: 'Link',
        onClick: mockCallback,
        tooltipProps: { content: 'Link' },
      },
    ],
  },
];

describe('ActionMenu', () => {
  test('ActionMenu is rendered', () => {
    render(<ActionMenu actions={mockActions} />);

    expect(screen.getByText('Actions')).toBeInTheDocument();
  });
  test('ActionMenu dropdown is expanded', () => {
    render(<ActionMenu actions={mockActions} label="Test Actions" />);

    fireEvent.click(screen.getByText('Test Actions'));
    expect(screen.getByText('Edit resource')).toBeInTheDocument();
    expect(screen.getByText('Delete resource')).toBeInTheDocument();
  });
  test('ActionMenu is disabled', () => {
    render(<ActionMenu actions={mockActions} isDisabled />);

    expect(screen.getByText('Actions').closest('button')).toHaveAttribute('disabled');
  });
  test('Menu actions trigger callback', () => {
    render(<ActionMenu actions={mockActions} />);

    fireEvent.click(screen.getByText('Actions'));
    expect(screen.getByText('Edit resource')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Edit resource'));
    expect(mockCallback).toHaveBeenCalled();
  });
  test('Menu actions are rendered in groups', () => {
    render(<ActionMenu groupedActions={mockGroupedActions} />);

    fireEvent.click(screen.getByText('Actions'));
    expect(screen.getByText('Edit resource')).toBeInTheDocument();
    expect(screen.getByText('Group2')).toBeInTheDocument();
    expect(screen.getByText('External Link')).toBeInTheDocument();
  });
});
