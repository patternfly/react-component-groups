import React from 'react';
import { render } from '@testing-library/react';
import { QuestionCircleIcon } from '@patternfly/react-icons';
import NotAuthorized from './NotAuthorized';

describe('NotAuthorized component', () => {
  const initialProps = {
    serviceName: 'Foo',
  };
  it('should render', () => {
    const { container } = render(<NotAuthorized {...initialProps} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should apply custom styles', () => {
    const { container } = render(<NotAuthorized {...initialProps} className="something" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should use custom icon', () => {
    const { container } = render(<NotAuthorized {...initialProps} icon={QuestionCircleIcon} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should not show buttons', () => {
    const { container } = render(<NotAuthorized {...initialProps} showReturnButton={false} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should show custom description', () => {
    const { container } = render(<NotAuthorized {...initialProps} description="Some text" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should show custom title', () => {
    const { container } = render(<NotAuthorized title="Custom title" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should show custom actions', () => {
    const primaryAction = 
      <button id="action-one" key="1">
        1
      </button>;
    const secondaryActions = [
      <button id="action-one" key="2">
        2
      </button>,
      <button id="action-one" key="3">
        3
      </button>
    ];
    const { container } = render(<NotAuthorized {...initialProps} primaryAction={primaryAction} secondaryActions={secondaryActions} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});