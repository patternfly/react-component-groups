import React from 'react';
import { render } from '@testing-library/react';
import Ansible from './Ansible';

describe('Ansible component', () => {

  it('should render unsupported - boolean', () => {
    const { container } = render(<Ansible isUnsupported />);
    expect(container).toMatchSnapshot();
  });

  it('should render supported - boolean', () => {
    const { container } = render(<Ansible />);
    expect(container).toMatchSnapshot();
  });

  it('should render RHAAP - boolean', () => {
    const { container } = render(<Ansible isRHAAP />);
    expect(container).toMatchSnapshot();
  });

});
