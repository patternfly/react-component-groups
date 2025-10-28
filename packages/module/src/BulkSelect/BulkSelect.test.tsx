import { render, screen } from '@testing-library/react';
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

    // Confirm the split button toggle receives the custom props
    const toggleButton = screen.getByLabelText('Bulk select toggle');
    expect(toggleButton).toBeInTheDocument();
    expect(toggleButton).toBeDisabled();
    expect(toggleButton).toHaveClass('custom-menu-toggle');
  });
});