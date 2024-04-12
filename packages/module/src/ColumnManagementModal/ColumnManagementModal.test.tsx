import * as React from 'react';
import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react';
import ColumnManagementModal, { ColumnManagementModalColumn } from './ColumnManagementModal';

const DEFAULT_COLUMNS : ColumnManagementModalColumn[] = [
  {
    title: 'CVE ID',
    key: 'synopsis',
    isShownByDefault: true,
    isShown: true,
    isAlwaysShown: true
  },
  {
    title: 'Publish date',
    key: 'publish_date',
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
    title: 'CVSS base score',
    key: 'cvss_score',
    isShownByDefault: false,
    isShown: false
  }
];

const setModalOpen = jest.fn();
const setColumns = jest.fn();

beforeEach(() => {
  render(<ColumnManagementModal
    appliedColumns={DEFAULT_COLUMNS}
    applyColumns={newColumns => setColumns(newColumns)}
    isModalOpen
    setModalOpen={setModalOpen}
    key="column-mgmt-modal"
    data-testid="column-mgmt-modal"
  />);
});

const getCheckboxesState = () => {
  const checkboxes = screen.getByTestId('column-mgmt-modal').querySelectorAll('input[type="checkbox"]');
  return (Array.from(checkboxes) as HTMLInputElement[]).map(c => c.checked);
}

describe('ColumnManagementModal component', () => {
  it('should have disabled and checked checkboxes for columns that should always be shown', () => {
    expect(getCheckboxesState()).toEqual(DEFAULT_COLUMNS.map(c => c.isShownByDefault));
  });

  it('should have checkbox checked if column is shown by default', () => {
    const idCheckbox = screen.getByTestId('column-mgmt-modal').querySelector('input[type="checkbox"][aria-labelledby="synopsis"]');

    expect(idCheckbox).toHaveAttribute('disabled');
    expect(idCheckbox).toHaveAttribute('checked');
  });

  it('should set columns to default state upon clicking on "Reset to default"', () => {
    // disable Impact column which is enabled by default
    fireEvent.click(screen.getByText('Impact'));

    // enable CVSS base score column which is disabled by default
    fireEvent.click(screen.getByText('CVSS base score'));

    fireEvent.click(screen.getByText('Reset to default'));
  
    expect(getCheckboxesState()).toEqual(DEFAULT_COLUMNS.map(c => c.isShownByDefault));
  });

  it('should set all columns to show upon clicking on "Select all"', () => {
    // disable Impact column which is enabled by default
    fireEvent.click(screen.getByText('Impact'));

    fireEvent.click(screen.getByText('Select all'));

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

    expect(setModalOpen).toHaveBeenCalledWith(false);
    expect(setColumns).toHaveBeenCalledWith(expectedColumns);
  });

  it('should retain columns on cancel', () => {
    fireEvent.click(screen.getByText('Impact'));
    fireEvent.click(screen.getByText('Cancel'));

    expect(setModalOpen).toHaveBeenCalledWith(false);
    expect(setColumns).toHaveBeenCalledWith(DEFAULT_COLUMNS);
  });
});
