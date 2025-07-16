import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import ColumnManagement from './ColumnManagement';

const mockColumns = [
  { key: 'name', title: 'Name', isShown: true, isShownByDefault: true },
  { key: 'status', title: 'Status', isShown: true, isShownByDefault: true },
  { key: 'version', title: 'Version', isShown: false, isShownByDefault: false },
];

describe('Column', () => {
  it('renders with initial columns', () => {
    render(<ColumnManagement columns={mockColumns} />);
    expect(screen.getByTestId('column-check-name')).toBeChecked();
    expect(screen.getByTestId('column-check-status')).toBeChecked();
    expect(screen.getByTestId('column-check-version')).not.toBeChecked();
  });

  it('renders title and description', () => {
    render(<ColumnManagement columns={mockColumns} title="Test Title" description="Test Description" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('renders a cancel button', async () => {
    const onCancel = jest.fn();
    render(<ColumnManagement columns={mockColumns} onCancel={onCancel} />);
    const cancelButton = screen.getByText('Cancel');
    expect(cancelButton).toBeInTheDocument();
    await userEvent.click(cancelButton);
    expect(onCancel).toHaveBeenCalled();
  });

  it('toggles a column', async () => {
    const onSelect = jest.fn();
    render(<ColumnManagement columns={mockColumns} onSelect={onSelect} />);
    const nameCheckbox = screen.getByTestId('column-check-name');
    await userEvent.click(nameCheckbox);
    expect(nameCheckbox).not.toBeChecked();
    expect(onSelect).toHaveBeenCalledWith(expect.objectContaining({ key: 'name', isShown: false }));
  });

  it('selects all columns', async () => {
    render(<ColumnManagement columns={mockColumns} />);
    const menuToggle = screen.getByLabelText('Select all').closest('button');
    if (menuToggle) {
      await userEvent.click(menuToggle);
    }
    const selectAllButton = screen.getByText('Select all');
    await userEvent.click(selectAllButton);
    expect(screen.getByTestId('column-check-name')).toBeChecked();
    expect(screen.getByTestId('column-check-status')).toBeChecked();
    expect(screen.getByTestId('column-check-version')).toBeChecked();
  });

  it('selects no columns', async () => {
    render(<ColumnManagement columns={mockColumns} />);
    const menuToggle = screen.getByLabelText('Select all').closest('button');
    if (menuToggle) {
      await userEvent.click(menuToggle);
    }
    const selectNoneButton = screen.getByText('Select none');
    await userEvent.click(selectNoneButton);
    expect(screen.getByTestId('column-check-name')).not.toBeChecked();
    expect(screen.getByTestId('column-check-status')).not.toBeChecked();
    expect(screen.getByTestId('column-check-version')).not.toBeChecked();
  });

  it('saves changes', async () => {
    const onSave = jest.fn();
    render(<ColumnManagement columns={mockColumns} onSave={onSave} />);
    const saveButton = screen.getByText('Save');
    await userEvent.click(saveButton);
    expect(onSave).toHaveBeenCalledWith(expect.any(Array));
  });
});
