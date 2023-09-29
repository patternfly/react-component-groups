import React from 'react';
import { render } from '@testing-library/react';
import Ansible from './Ansible';

describe('Ansible component', () => {

  it('should render unsupported - boolean', () => {
    const { container } = render(<Ansible unsupported />);
    expect(container).toMatchSnapshot();
  });

  it('should render unsupported - number', () => {
    const { container } = render(<Ansible unsupported={1} />);
    expect(container).toMatchSnapshot();
  });

  it('should render supported - boolean', () => {
    const { container } = render(<Ansible />);
    expect(container).toMatchSnapshot();
  });

  it('should render supported - number', () => {
    const { container } = render(<Ansible unsupported={0} />);
    expect(container).toMatchSnapshot();
  });

});
