import { render, screen } from '@testing-library/react';
import TearsheetBody from './TearsheetBody';

describe('TearsheetBody component', () => {
  it('should make the body keyboard focusable by default', () => {
    render(<TearsheetBody>Body content</TearsheetBody>);

    expect(screen.getByText('Body content')).toHaveAttribute('tabindex', '0');
  });

  it('should allow overriding the default tabIndex', () => {
    render(<TearsheetBody tabIndex={-1}>Body content</TearsheetBody>);

    expect(screen.getByText('Body content')).toHaveAttribute('tabindex', '-1');
  });
});
