import * as React from 'react';
import ErrorState from './ErrorState';
import { render, screen } from '@testing-library/react';
import { Button } from '@patternfly/react-core';

describe('ErrorState component', () => {

  it('should render correctly', () => {
    render(<ErrorState errorTitle='A Basic Error' errorDescription='The following is an example of a basic error' customFooter={<Button>Custom button</Button>} />);

    expect(screen.getByText('A Basic Error')).toBeVisible();
    expect(screen.getByText('The following is an example of a basic error')).toBeVisible();
    expect(screen.getByText('Custom button')).toBeVisible();
  });

  it('should render correctly with default props', () => {
    render(<ErrorState />);

    expect(screen.getByText('Something went wrong')).toBeVisible();
    expect(screen.getByText('Go to home page')).toBeVisible();
  });

});
