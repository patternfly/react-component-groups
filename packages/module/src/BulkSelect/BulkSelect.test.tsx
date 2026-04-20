import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BulkSelect, { BulkSelectValue } from './BulkSelect';

describe('BulkSelect component', () => {
  test('should render', () => {
    expect(render(
      <BulkSelect
        canSelectAll
        pageCount={5}
        totalCount={10}
        selectedCount={2}
        pageSelected={false}
        pagePartiallySelected={true}
        onSelect={() => null}
      />)).toMatchSnapshot();
  });

  test('should render with dropdownListProps', async () => {
    const user = userEvent.setup();
    render(
      <BulkSelect
        canSelectAll
        pageCount={5}
        totalCount={10}
        selectedCount={2}
        pageSelected={false}
        pagePartiallySelected={true}
        onSelect={() => null}
        dropdownListProps={{ className: 'custom-dropdown-list' }}
      />
    );

    // Open the dropdown by clicking the toggle button
    const toggleButton = screen.getByLabelText('Bulk select toggle');
    await user.click(toggleButton);

    // Now the dropdown list should be visible with the custom class
    const dropdownList = document.querySelector('.custom-dropdown-list');
    expect(dropdownList).toBeInTheDocument();
    expect(dropdownList).toHaveClass('pf-v6-c-menu__list');
  });

  test('should render with menuToggleProps', () => {
    render(
      <BulkSelect
        canSelectAll
        pageCount={5}
        totalCount={10}
        selectedCount={2}
        pageSelected={false}
        pagePartiallySelected={true}
        onSelect={() => null}
        menuToggleProps={{ isDisabled: true, className: 'custom-menu-toggle' }}
      />
    );

    const toggleButton = screen.getByLabelText('Bulk select toggle');
    expect(toggleButton).toBeInTheDocument();

    // Confirm the split button toggle is disabled
    expect(toggleButton).toBeDisabled();

    // Confirm the split button toggle receives the correct PatternFly class
    expect(toggleButton).toHaveClass('pf-v6-c-menu-toggle__button');

    // Confirm the split button toggle wrapper receives the custom class
    const toggleWrapper = toggleButton.parentElement;
    expect(toggleWrapper).toBeInTheDocument();
    expect(toggleWrapper).toHaveClass('custom-menu-toggle');
  });

  test('should render with custom i18n labels', async () => {
    const user = userEvent.setup();
    render(
      <BulkSelect
        canSelectAll
        pageCount={5}
        totalCount={10}
        selectedCount={2}
        pageSelected={false}
        pagePartiallySelected={true}
        onSelect={() => null}
        selectNoneLabel="Aucune sélection (0)"
        selectPageLabel={(pageCount) => `Sélectionner la page${pageCount ? ` (${pageCount})` : ''}`}
        selectAllLabel={(totalCount) => `Tout sélectionner${totalCount ? ` (${totalCount})` : ''}`}
        selectedLabel={(selectedCount) => `${selectedCount} sélectionné${selectedCount > 1 ? 's' : ''}`}
      />
    );

    // Check custom selected label
    expect(screen.getByText('2 sélectionnés')).toBeInTheDocument();

    // Open the dropdown to check option labels
    const toggleButton = screen.getByLabelText('Bulk select toggle');
    await user.click(toggleButton);

    // Check custom dropdown labels
    expect(screen.getByText('Aucune sélection (0)')).toBeInTheDocument();
    expect(screen.getByText('Sélectionner la page (5)')).toBeInTheDocument();
    expect(screen.getByText('Tout sélectionner (10)')).toBeInTheDocument();
  });

  test('should call onSelect with source "dropdown" when choosing menu items', async () => {
    const user = userEvent.setup();
    const onSelect = jest.fn();
    render(
      <BulkSelect
        canSelectAll
        pageCount={5}
        totalCount={10}
        selectedCount={0}
        pageSelected={false}
        pagePartiallySelected={false}
        onSelect={onSelect}
      />
    );

    const openMenu = async () => {
      await user.click(screen.getByLabelText('Bulk select toggle'));
    };

    await openMenu();
    await user.click(screen.getByRole('menuitem', { name: 'Select none (0)' }));
    expect(onSelect).toHaveBeenLastCalledWith(BulkSelectValue.none, 'dropdown');

    onSelect.mockClear();
    await openMenu();
    await user.click(screen.getByRole('menuitem', { name: 'Select page (5)' }));
    expect(onSelect).toHaveBeenLastCalledWith(BulkSelectValue.page, 'dropdown');

    onSelect.mockClear();
    await openMenu();
    await user.click(screen.getByRole('menuitem', { name: 'Select all (10)' }));
    expect(onSelect).toHaveBeenLastCalledWith(BulkSelectValue.all, 'dropdown');
  });

  test('should call onSelect with source "checkbox" when using split checkbox', async () => {
    const user = userEvent.setup();
    const onSelect = jest.fn();
    render(
      <BulkSelect
        canSelectAll
        pageCount={5}
        totalCount={10}
        selectedCount={0}
        pageSelected={false}
        pagePartiallySelected={false}
        onSelect={onSelect}
      />
    );

    await user.click(screen.getByRole('checkbox', { name: 'Select page' }));
    expect(onSelect).toHaveBeenCalledWith(BulkSelectValue.page, 'checkbox');
  });
});