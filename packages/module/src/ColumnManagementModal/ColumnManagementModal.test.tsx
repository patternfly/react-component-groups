import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ColumnManagementModal, { ColumnManagementModalColumn } from './ColumnManagementModal';

const DEFAULT_COLUMNS : ColumnManagementModalColumn[] = [
  {
    title: 'ID',
    key: 'id',
    isShownByDefault: true,
    isShown: true,
    isUntoggleable: true
  },
  {
    title: 'Publish date',
    key: 'publishDate',
    isShownByDefault: true,
    isShown: true
  },
  {
    title: 'Impact',
    key: 'impact',
    isShownByDefault: true,
    isShown: true
  },
  {
    title: 'Score',
    key: 'score',
    isShownByDefault: false,
    isShown: false
  }
];

const onClose = jest.fn();
const setColumns = jest.fn();

// Simple mock to track when DragDropSort is used
jest.mock('@patternfly/react-drag-drop', () => ({
  DragDropSort: ({ children }) => <div data-testid="drag-drop-sort">{children}</div>,
  Droppable: ({ wrapper }) => wrapper,
}));

const renderColumnManagementModal = (props = {}) => render(<ColumnManagementModal
  appliedColumns={DEFAULT_COLUMNS}
  applyColumns={newColumns => setColumns(newColumns)}
  isOpen
  onClose={onClose}
  data-testid="column-mgmt-modal"
  {...props}
/>);

beforeEach(() => {
  jest.clearAllMocks();
  renderColumnManagementModal();
});

const getCheckboxesState = () => {
  // Get only the column checkboxes (exclude the BulkSelect checkbox)
  const checkboxes = screen.getByTestId('column-mgmt-modal').querySelectorAll('input[type="checkbox"][data-testid^="column-check-"]');
  return (Array.from(checkboxes) as HTMLInputElement[]).map(c => c.checked);
}

describe('ColumnManagementModal component', () => {
  it('should have disabled and checked checkboxes for columns that should always be shown', () => {
    expect(getCheckboxesState()).toEqual(DEFAULT_COLUMNS.map(c => c.isShownByDefault));
  });

  it('should have checkbox checked if column is shown by default', () => {
    const idCheckbox = screen.getByTestId('column-mgmt-modal').querySelector('input[type="checkbox"][data-testid="column-check-id"]');

    expect(idCheckbox).toHaveAttribute('disabled');
    expect(idCheckbox).toHaveAttribute('checked');
  });

  it('should set columns to default state upon clicking on "Reset to default"', () => {
    // disable Impact column which is enabled by default
    fireEvent.click(screen.getByText('Impact'));

    // enable Score column which is disabled by default
    fireEvent.click(screen.getByText('Score'));

    fireEvent.click(screen.getByText('Reset to default'));
  
    expect(getCheckboxesState()).toEqual(DEFAULT_COLUMNS.map(c => c.isShownByDefault));
  });

  it('should set all columns to show upon clicking on "Select all"', async () => {
    // disable Impact column which is enabled by default
    fireEvent.click(screen.getByText('Impact'));

    // Use the BulkSelect to select all
    const menuToggle = screen.getByLabelText('Bulk select toggle');
    await userEvent.click(menuToggle);
    const selectAllButton = screen.getByText('Select all (4)');
    await userEvent.click(selectAllButton);

    expect(getCheckboxesState()).toEqual(DEFAULT_COLUMNS.map(_ => true));
  });

  it('should change columns on save', () => {
    fireEvent.click(screen.getByText('Impact'));
    fireEvent.click(screen.getByText('Save'));

    const expectedColumns = DEFAULT_COLUMNS;
    const impactColumn = expectedColumns.find(c => c.title === 'Impact');

    if (impactColumn === undefined) {
      throw new Error('Expected to find "Impact" column in "DEFAULT_COLUMNS"');
    }

    impactColumn.isShown = false;

    expect(onClose).toHaveBeenCalled();
    expect(setColumns).toHaveBeenCalledWith(expectedColumns);
  });

  it('should retain columns on cancel', () => {
    fireEvent.click(screen.getByText('Impact'));
    fireEvent.click(screen.getByText('Cancel'));

    expect(onClose).toHaveBeenCalled();
    // applyColumns should NOT be called on cancel
    expect(setColumns).not.toHaveBeenCalled();
  });

  describe('enableDragDrop prop', () => {
    it('should default enableDragDrop to false', () => {
      // Default behavior should not enable drag and drop
      expect(screen.queryByTestId('drag-drop-sort')).not.toBeInTheDocument();
    });

    it('should pass enableDragDrop prop to ListManager', () => {
      // Test that the prop is properly passed through to ListManager
      jest.clearAllMocks();
      renderColumnManagementModal({ enableDragDrop: true });

      // When enableDragDrop is true, DragDropSort should be rendered
      expect(screen.getByTestId('drag-drop-sort')).toBeInTheDocument();
    });
  });
});
