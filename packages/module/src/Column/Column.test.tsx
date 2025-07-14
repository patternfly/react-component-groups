import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Column from '../Column';

const mockColumns = [
  { key: 'name', title: 'Name', isShownByDefault: true },
  { key: 'status', title: 'Status', isShownByDefault: true },
  { key: 'version', title: 'Version', isShownByDefault: false },
];

describe('Column', () => {
  it('renders with initial columns', () => {
    render(<Column columns={mockColumns} />);
    expect(screen.getByLabelText('Name')).toBeChecked();
    expect(screen.getByLabelText('Status')).toBeChecked();
    expect(screen.getByLabelText('Version')).not.toBeChecked();
  });

  it('renders title and description', () => {
    render(<Column columns={mockColumns} title="Test Title" description="Test Description" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('renders a cancel button', () => {
    const onCancel = jest.fn();
    render(<Column columns={mockColumns} onCancel={onCancel} />);
    const cancelButton = screen.getByText('Cancel');
    expect(cancelButton).toBeInTheDocument();
    userEvent.click(cancelButton);
    expect(onCancel).toHaveBeenCalled();
  });

  it('toggles a column', async () => {
    const onSelect = jest.fn();
    render(<Column columns={mockColumns} onSelect={onSelect} />);
    const nameCheckbox = screen.getByLabelText('Name');
    await userEvent.click(nameCheckbox);
    expect(nameCheckbox).not.toBeChecked();
    expect(onSelect).toHaveBeenCalledWith(expect.objectContaining({ key: 'name', isShown: false }));
  });

  it('selects all columns', async () => {
    render(<Column columns={mockColumns} />);
    const menuToggle = screen.getByLabelText('Select all').closest('button');
    if (menuToggle) {
      await userEvent.click(menuToggle);
    }
    const selectAllButton = screen.getByText('Select all');
    await userEvent.click(selectAllButton);
    expect(screen.getByLabelText('Name')).toBeChecked();
    expect(screen.getByLabelText('Status')).toBeChecked();
    expect(screen.getByLabelText('Version')).toBeChecked();
  });

  it('selects no columns', async () => {
    render(<Column columns={mockColumns} />);
    const menuToggle = screen.getByLabelText('Select all').closest('button');
    if (menuToggle) {
      await userEvent.click(menuToggle);
    }
    const selectNoneButton = screen.getByText('Select none');
    await userEvent.click(selectNoneButton);
    expect(screen.getByLabelText('Name')).not.toBeChecked();
    expect(screen.getByLabelText('Status')).not.toBeChecked();
    expect(screen.getByLabelText('Version')).not.toBeChecked();
  });

  it('saves changes', async () => {
    const onSave = jest.fn();
    render(<Column columns={mockColumns} onSave={onSave} />);
    const saveButton = screen.getByText('Save');
    await userEvent.click(saveButton);
    expect(onSave).toHaveBeenCalledWith(expect.any(Array));
  });

  it('reorders columns with drag and drop', () => {
    const onOrderChange = jest.fn();
    const { container } = render(<Column columns={mockColumns} onOrderChange={onOrderChange} />);
    const firstItem = screen.getByText('Name').closest('li');
    const secondItem = screen.getByText('Status').closest('li');

    if (firstItem && secondItem) {
      fireEvent.dragStart(firstItem);
      fireEvent.dragEnter(secondItem);
      fireEvent.dragOver(secondItem);
      fireEvent.drop(secondItem);
      fireEvent.dragEnd(firstItem);

      const listItems = container.querySelectorAll('li');
      expect(listItems[0].textContent).toContain('Status');
      expect(listItems[1].textContent).toContain('Name');
      expect(onOrderChange).toHaveBeenCalledWith([
        expect.objectContaining({ key: 'status' }),
        expect.objectContaining({ key: 'name' }),
        expect.objectContaining({ key: 'version' }),
      ]);
    }
  });
});
