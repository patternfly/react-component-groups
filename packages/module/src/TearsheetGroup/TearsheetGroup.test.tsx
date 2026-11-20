import { render, screen } from '@testing-library/react';
import Tearsheet, { type TearsheetProps } from '../Tearsheet';
import TearsheetGroup from './TearsheetGroup';

// Keep closed sheets observable and inspect Group's configuration without Modal behavior.
jest.mock('../Tearsheet', () => ({
  __esModule: true,
  default: ({ children, 'aria-label': label, isOpen, stackLevel, modalProps }: TearsheetProps) => (
    <div
      data-testid={label}
      data-open={Boolean(isOpen)}
      data-stack-level={stackLevel}
      data-focus-trap-disabled={modalProps?.disableFocusTrap}
    >
      {children}
    </div>
  )
}));

describe('TearsheetGroup component', () => {
  it('should assign stack levels from back to front in child order', () => {
    render(
      <TearsheetGroup>
        <Tearsheet isOpen aria-label="First">First content</Tearsheet>
        <Tearsheet isOpen aria-label="Second">Second content</Tearsheet>
        <Tearsheet isOpen aria-label="Third">Third content</Tearsheet>
      </TearsheetGroup>
    );

    expect(screen.getByTestId('First')).toHaveAttribute('data-stack-level', '0');
    expect(screen.getByTestId('Second')).toHaveAttribute('data-stack-level', '1');
    expect(screen.getByTestId('Third')).toHaveAttribute('data-stack-level', '2');
  });

  it('should only count open Tearsheets when assigning stack positions', () => {
    render(
      <TearsheetGroup>
        <Tearsheet isOpen={false} aria-label="Closed">Closed content</Tearsheet>
        <Tearsheet isOpen aria-label="First">First content</Tearsheet>
        <Tearsheet aria-label="Default closed">Default closed content</Tearsheet>
        <Tearsheet isOpen aria-label="Second">Second content</Tearsheet>
      </TearsheetGroup>
    );

    expect(screen.getByTestId('First')).toHaveAttribute('data-stack-level', '0');
    expect(screen.getByTestId('Second')).toHaveAttribute('data-stack-level', '1');
  });

  it('should hide earlier sheets when more than three are open', () => {
    render(
      <TearsheetGroup>
        {Array.from({ length: 5 }, (_, index) => (
          <Tearsheet key={index} isOpen aria-label={`Sheet ${index}`}>Sheet content</Tearsheet>
        ))}
      </TearsheetGroup>
    );

    expect(screen.getByTestId('Sheet 0')).toHaveAttribute('data-stack-level', '-1');
    expect(screen.getByTestId('Sheet 1')).toHaveAttribute('data-stack-level', '-1');
    expect(screen.getByTestId('Sheet 2')).toHaveAttribute('data-stack-level', '0');
    expect(screen.getByTestId('Sheet 3')).toHaveAttribute('data-stack-level', '1');
    expect(screen.getByTestId('Sheet 4')).toHaveAttribute('data-stack-level', '2');
  });

  it('should recalculate stack levels when sheets open and close', () => {
    const renderGroup = (isFirstOpen: boolean, isThirdOpen: boolean) => (
      <TearsheetGroup>
        <Tearsheet isOpen={isFirstOpen} aria-label="First">First content</Tearsheet>
        <Tearsheet isOpen aria-label="Second">Second content</Tearsheet>
        <Tearsheet isOpen={isThirdOpen} aria-label="Third">Third content</Tearsheet>
      </TearsheetGroup>
    );
    const { rerender } = render(renderGroup(false, false));

    expect(screen.getByTestId('Second')).toHaveAttribute('data-stack-level', '0');

    rerender(renderGroup(true, true));

    expect(screen.getByTestId('First')).toHaveAttribute('data-stack-level', '0');
    expect(screen.getByTestId('Second')).toHaveAttribute('data-stack-level', '1');
    expect(screen.getByTestId('Third')).toHaveAttribute('data-stack-level', '2');

    rerender(renderGroup(false, true));

    expect(screen.getByTestId('Second')).toHaveAttribute('data-stack-level', '0');
    expect(screen.getByTestId('Third')).toHaveAttribute('data-stack-level', '1');
  });

  it('should enable focus trapping only for the frontmost open sheet', () => {
    const renderGroup = (isThirdOpen: boolean) => (
      <TearsheetGroup>
        <Tearsheet isOpen aria-label="First">First content</Tearsheet>
        <Tearsheet isOpen aria-label="Second">Second content</Tearsheet>
        <Tearsheet isOpen={isThirdOpen} aria-label="Third">Third content</Tearsheet>
      </TearsheetGroup>
    );
    const { rerender } = render(renderGroup(true));

    expect(screen.getByTestId('First')).toHaveAttribute('data-focus-trap-disabled', 'true');
    expect(screen.getByTestId('Second')).toHaveAttribute('data-focus-trap-disabled', 'true');
    expect(screen.getByTestId('Third')).toHaveAttribute('data-focus-trap-disabled', 'false');

    rerender(renderGroup(false));

    expect(screen.getByTestId('First')).toHaveAttribute('data-focus-trap-disabled', 'true');
    expect(screen.getByTestId('Second')).toHaveAttribute('data-focus-trap-disabled', 'false');
  });

  it('should retain a closing sheet\'s last stack level for its exit animation', () => {
    const renderGroup = (isThirdOpen: boolean) => (
      <TearsheetGroup>
        <Tearsheet isOpen aria-label="First">First content</Tearsheet>
        <Tearsheet isOpen aria-label="Second">Second content</Tearsheet>
        <Tearsheet isOpen={isThirdOpen} aria-label="Third">Third content</Tearsheet>
      </TearsheetGroup>
    );
    const { rerender } = render(renderGroup(true));

    expect(screen.getByTestId('Third')).toHaveAttribute('data-stack-level', '2');

    rerender(renderGroup(false));

    expect(screen.getByTestId('Third')).toHaveAttribute('data-open', 'false');
    expect(screen.getByTestId('Third')).toHaveAttribute('data-stack-level', '2');
  });

  it.each([ [ 0, 0 ], [ 1, 1 ], [ 3, 2 ], [ 4, 2 ] ])(
    'should prepare a never-opened sheet with %i open siblings at level %i',
    (totalOpen, expectedLevel) => {
      render(
        <TearsheetGroup>
          {Array.from({ length: totalOpen }, (_, index) => (
            <Tearsheet key={index} isOpen aria-label={`Sheet ${index}`}>Sheet content</Tearsheet>
          ))}
          <Tearsheet isOpen={false} aria-label="Next">Next content</Tearsheet>
        </TearsheetGroup>
      );

      expect(screen.getByTestId('Next')).toHaveAttribute('data-stack-level', String(expectedLevel));
    }
  );

  it('should preserve other children without including them in the stack', () => {
    render(
      <TearsheetGroup>
        Group content
        {null}
        {false}
        <div className="custom-content">Other content</div>
        <Tearsheet isOpen aria-label="First">First content</Tearsheet>
        <Tearsheet isOpen aria-label="Second">Second content</Tearsheet>
      </TearsheetGroup>
    );

    expect(screen.getByText('Group content')).toBeInTheDocument();
    expect(screen.getByText('Other content')).toHaveClass('custom-content');
    expect(screen.getByText('Other content')).not.toHaveAttribute('data-stack-level');
    expect(screen.getByTestId('First')).toHaveAttribute('data-stack-level', '0');
    expect(screen.getByTestId('Second')).toHaveAttribute('data-stack-level', '1');
  });
});
