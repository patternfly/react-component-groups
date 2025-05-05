import { render } from '@testing-library/react';
import Ansible from './Ansible';

describe('Ansible component', () => {

  it('should render unsupported', () => {
    const { container } = render(<Ansible isSupported={false} />);
    expect(container).toMatchSnapshot();
  });

  it('should render supported', () => {
    const { container } = render(<Ansible />);
    expect(container).toMatchSnapshot();
  });

  it('should render RHAAP', () => {
    const { container } = render(<Ansible isRHAAP />);
    expect(container).toMatchSnapshot();
  });
});
