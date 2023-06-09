import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { ActionButtons } from './ActionButtons';

const mockCallback = jest.fn();

const mockActionButtons = [
  {
    children: 'Primary action',
    onClick: mockCallback,
    tooltip: 'Click me!',
  },
  {
    children: 'Secondary action',
    onClick: jest.fn(),
    isDisabled: true,
  },
];

describe('ActionButtons', () => {
  test('Buttons are rendered', () => {
    render(<ActionButtons actionButtons={mockActionButtons} />);

    expect(screen.getByText('Primary action')).toBeVisible();
    expect(screen.getByText('Secondary action')).toBeVisible();
    expect(screen.getByText('Secondary action').closest('button')).toHaveAttribute('aria-disabled');
  });
  test('Button clicks trigger callback', () => {
    render(<ActionButtons actionButtons={mockActionButtons} />);

    fireEvent.click(screen.getByText('Primary action'));
    expect(mockCallback).toHaveBeenCalled();
  });
});
