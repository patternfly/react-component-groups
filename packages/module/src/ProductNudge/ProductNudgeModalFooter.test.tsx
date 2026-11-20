import { render, screen } from '@testing-library/react';

import ProductNudgeModalFooter from './ProductNudgeModalFooter';

describe('ProductNudgeModalFooter component', () => {
  it('renders nothing when no content is provided', () => {
    const { container } = render(<ProductNudgeModalFooter />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders footer text and actions', () => {
    render(
      <ProductNudgeModalFooter
        footerText="Supporting copy"
        actions={<button type="button">Submit</button>}
      />,
    );

    expect(screen.getByText('Supporting copy')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });

  it('renders a partner logo when only light mode is provided', () => {
    render(<ProductNudgeModalFooter partnerLogo={{ src: 'logo.svg', alt: 'Acme' }} />);

    expect(screen.getByRole('img', { name: 'Acme' })).toHaveAttribute('src', 'logo.svg');
  });

  it('renders both light and dark partner logos when both are provided', () => {
    const { container } = render(
      <ProductNudgeModalFooter
        partnerLogo={{ src: 'logo-light.svg', alt: 'Acme' }}
        partnerLogoDark={{ src: 'logo-dark.svg', alt: 'Acme' }}
      />,
    );

    const images = container.querySelectorAll('img');
    expect(images).toHaveLength(2);
    expect(images[0]).toHaveAttribute('src', 'logo-light.svg');
    expect(images[1]).toHaveAttribute('src', 'logo-dark.svg');
  });

  it('centers the actions row when isCentered is set', () => {
    const { container } = render(
      <ProductNudgeModalFooter actions={<button type="button">Submit</button>} isCentered />,
    );

    expect(container.querySelector('.pf-m-justify-content-center')).toBeInTheDocument();
  });
});
