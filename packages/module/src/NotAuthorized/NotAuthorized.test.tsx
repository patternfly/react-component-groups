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
    const actions = [
      <button id="action-one" key="1">
        1
      </button>,
      <button id="action-one" key="2">
        2
      </button>,
    ];
    const { container } = render(<NotAuthorized {...initialProps} actions={actions} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});