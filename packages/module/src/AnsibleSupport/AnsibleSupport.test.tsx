import React from 'react';
import { render } from '@testing-library/react';
import AnsibleSupport from './AnsibleSupport';

describe('AnsibleSupport component', () => {

  it('should render unsupported', () => {
    const { container } = render(<AnsibleSupport isSupported={false} />);
    expect(container).toMatchSnapshot();
  });

  it('should render supported', () => {
    const { container } = render(<AnsibleSupport />);
    expect(container).toMatchSnapshot();
  });

});
