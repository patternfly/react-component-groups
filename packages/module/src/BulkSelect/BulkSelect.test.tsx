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
});