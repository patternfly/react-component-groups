import MissingPage from './MissingPage';
import { render, screen } from '@testing-library/react';
import { Button } from '@patternfly/react-core';

describe('MissingPage component', () => {
  test('should render', () => {
    expect(render(<MissingPage />)).toMatchSnapshot();
  });

  it('should render custom footer instead of default link', () => {
    render(
      <MissingPage
        customFooter={
          <>
            <Button>Go home</Button>
            <Button variant="link">Go back</Button>
          </>
        }
      />
    );

    expect(screen.getByText('Go home')).toBeVisible();
    expect(screen.getByText('Go back')).toBeVisible();
    expect(screen.queryByText('Return to homepage')).not.toBeInTheDocument();
  });

  it('should render default link when customFooter is not provided', () => {
    render(<MissingPage />);

    expect(screen.getByText('We lost that page')).toBeVisible();
    expect(screen.getByText('Return to homepage')).toBeVisible();
  });

  it('should spread empty state props', () => {
    render(<MissingPage headingLevel="h2" variant="xs" data-testid="test" />);

    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
    expect(screen.getByTestId('test')).toHaveClass('pf-m-xs');
  });
});
