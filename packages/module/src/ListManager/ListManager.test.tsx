import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import ListManager from './ListManager';

jest.mock('@patternfly/react-drag-drop', () => {
  const originalModule = jest.requireActual('@patternfly/react-drag-drop');
  return {
    ...originalModule,
    DragDropSort: ({ onDrop, items }) => {
      const handleDrop = () => {
        const reorderedItems = [ ...items ].reverse();
        onDrop({}, reorderedItems);
      };
      return <div onDrop={handleDrop}>{items.map(item => item.content)}</div>;
    },
  };
});

const mockColumns = [
  { key: 'name', title: 'Name', isSelected: true, isShownByDefault: true },
  { key: 'status', title: 'Status', isSelected: true, isShownByDefault: true },
  { key: 'version', title: 'Version', isSelected: false, isShownByDefault: false },
];

describe('ListManager', () => {
  it('renders with initial columns', () => {
    render(<ListManager columns={mockColumns} />);
    expect(screen.getByTestId('column-check-name')).toBeChecked();
    expect(screen.getByTestId('column-check-status')).toBeChecked();
    expect(screen.getByTestId('column-check-version')).not.toBeChecked();
  });

  it('renders a cancel button', async () => {
    const onCancel = jest.fn();
    render(<ListManager columns={mockColumns} onCancel={onCancel} />);
    const cancelButton = screen.getByText('Cancel');
    expect(cancelButton).toBeInTheDocument();
    await userEvent.click(cancelButton);
    expect(onCancel).toHaveBeenCalled();
  });

  it('toggles a column', async () => {
    const onSelect = jest.fn();
    render(<ListManager columns={mockColumns} onSelect={onSelect} />);
    const nameCheckbox = screen.getByTestId('column-check-name');
    await userEvent.click(nameCheckbox);
    expect(nameCheckbox).not.toBeChecked();
    expect(onSelect).toHaveBeenCalledWith(expect.objectContaining({ key: 'name', isSelected: false }));
  });

  it('selects all columns', async () => {
    render(<ListManager columns={mockColumns} />);
    const menuToggle = screen.getByLabelText('Bulk select toggle');
    if (menuToggle) {
      await userEvent.click(menuToggle);
    }
    const selectAllButton = screen.getByText('Select all (3)');
    await userEvent.click(selectAllButton);
    expect(screen.getByTestId('column-check-name')).toBeChecked();
    expect(screen.getByTestId('column-check-status')).toBeChecked();
    expect(screen.getByTestId('column-check-version')).toBeChecked();
  });

  it('selects no columns', async () => {
    render(<ListManager columns={mockColumns} />);
    const menuToggle = screen.getByLabelText('Bulk select toggle');
    if (menuToggle) {
      await userEvent.click(menuToggle);
    }
    const selectNoneButton = screen.getByText('Select none (0)');
    await userEvent.click(selectNoneButton);
    expect(screen.getByTestId('column-check-name')).not.toBeChecked();
    expect(screen.getByTestId('column-check-status')).not.toBeChecked();
    expect(screen.getByTestId('column-check-version')).not.toBeChecked();
  });

  it('saves changes', async () => {
    const onSave = jest.fn();
    render(<ListManager columns={mockColumns} onSave={onSave} />);
    const saveButton = screen.getByText('Save');
    await userEvent.click(saveButton);
    expect(onSave).toHaveBeenCalledWith(expect.any(Array));
  });
});
