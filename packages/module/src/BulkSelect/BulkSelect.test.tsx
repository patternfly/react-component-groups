import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BulkSelect from './BulkSelect';

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
});