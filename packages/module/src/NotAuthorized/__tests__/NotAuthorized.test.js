import * as React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NotAuthorized from '../NotAuthorized';

describe('NotAuthorized component', () => {
  const initialProps = {
    serviceName: 'Foo',
  };
  it('should render', () => {
    render(<div><NotAuthorized {...initialProps} /></div>);
    expect(screen.getByText('Foo')).toBeInTheDocument();
  });

  it('should apply custom styles', () => {
    render(<NotAuthorized {...initialProps} className="something" />);
    expect(screen.getByText('Foo')).toHaveClass('something');
  });

  it('should use custom icon', () => {
    render(<NotAuthorized {...initialProps} icon={() => 'some Icon!'} />);
    expect(screen.getByText('some Icon!')).toBeInTheDocument();
  });

  it('should not show buttons', () => {
    render(<NotAuthorized {...initialProps} showReturnButton={false} />);
    expect(screen.queryByText('Return to previous page')).not.toBeInTheDocument();
    expect(screen.queryByText('Go to landing page')).not.toBeInTheDocument();
  });

  it('should show custom description', () => {
    render(<NotAuthorized {...initialProps} description="Some text" />);
    expect(screen.getByText('Some text')).toBeInTheDocument();
  });

  it('should show custom title', () => {
    render(<NotAuthorized title="Custom title" />);
    expect(screen.getByText('Custom title')).toBeInTheDocument();
  });

  it('should show custom actions', () => {
    const actions = [
      <button id="action-one" key="1">
        1
      </button>,
      <button id="action-two" key="2">
        2
      </button>,
    ];
    render(<NotAuthorized {...initialProps} actions={actions} />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });
});
