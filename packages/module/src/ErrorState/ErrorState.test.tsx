import ErrorState from './ErrorState';
import { render, screen } from '@testing-library/react';
import { Button } from '@patternfly/react-core';

describe('ErrorState component', () => {

  it('should render correctly', () => {
    render(<ErrorState titleText='A Basic Error' bodyText='The following is an example of a basic error' customFooter={<Button>Custom button</Button>} />);

    expect(screen.getByText('A Basic Error')).toBeVisible();
    expect(screen.getByText('The following is an example of a basic error')).toBeVisible();
    expect(screen.getByText('Custom button')).toBeVisible();
  });

  it('should render correctly with default props', () => {
    render(<ErrorState />);

    expect(screen.getByText('Something went wrong')).toBeVisible();
    expect(screen.getByText('Go to home page')).toBeVisible();
  });

  it('should spread empty state props', () => {
    render(<ErrorState headingLevel="h2" variant="xs" data-testid="test"/>);

    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
    expect(screen.getByTestId('test')).toHaveClass('pf-m-xs');
  });

});
