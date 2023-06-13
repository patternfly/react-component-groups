import * as React from 'react';
import ErrorBoundary from './ErrorBoundary';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom'

describe('ErrorBoundary component', () => {
  const Surprise = () => {
    throw new Error('but a welcome one');
  };

  // The error boundary is noisy, silence for this test
  let mockConsole: jest.SpyInstance;
  beforeEach(() => {
    mockConsole = jest.spyOn(console, 'error');
    mockConsole.mockImplementation(() => '');
  });

  afterEach(() => {
    mockConsole.mockRestore();
  });

  it('should render content when there is no error', () => {
    render(
      <ErrorBoundary headerTitle={'My app'}>
        <div>hello world</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('hello world')).toBeVisible();
  });

  it('should render error if there is any error', () => {
    render(
      <ErrorBoundary headerTitle="My app" errorTitle="Something wrong happened">
        <Surprise />
      </ErrorBoundary>
    );

    expect(screen.getByText(/Something wrong happened/i)).toBeVisible();
  });

  it('should have details hidden', () => {
    render(
      <ErrorBoundary headerTitle="My app" errorTitle="Something wrong happened">
        <Surprise />
      </ErrorBoundary>
    );

    expect(screen.getByText(/but a welcome one/i)).not.toBeVisible();
  });

  it('should show details when clicking the show details button', () => {
    render(
      <ErrorBoundary headerTitle="My app" errorTitle="Something wrong happened">
        <Surprise />
      </ErrorBoundary>
    );

    userEvent.click(screen.getByText(/show details/i));
    expect(screen.getByText(/but a welcome one/i)).toBeInTheDocument();
  });

  it('should show content again after changing url', () => {
    let fail = true;
    const FailConditionally = () => {
      if (fail) {
        throw new Error('failing');
      } else {
        return <div>hello world</div>;
      }
    };

    const { rerender } = render(
      <ErrorBoundary headerTitle="My app" errorTitle="Something wrong happened">
        <FailConditionally />
      </ErrorBoundary>
    );

    expect(screen.getByText(/Something wrong happened/i)).toBeVisible();

    // a re-render does not get out of the error state
    rerender(
      <ErrorBoundary headerTitle="My app" errorTitle="Something wrong happened">
        <FailConditionally />
      </ErrorBoundary>
    );

    expect(screen.getByText(/Something wrong happened/i)).toBeVisible();

    fail = false;
    // Simulates a state change in the history
    history.pushState({ data: 2 }, 'unused');
    rerender(
      <ErrorBoundary headerTitle="My app" errorTitle="Something wrong happened">
        <FailConditionally />
      </ErrorBoundary>
    );
    expect(screen.getByText('hello world')).toBeVisible();
  });
});
