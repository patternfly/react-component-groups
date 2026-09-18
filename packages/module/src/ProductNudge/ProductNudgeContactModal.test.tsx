import { render, screen } from '@testing-library/react';
import ProductNudgeContactModal from './ProductNudgeContactModal';
import { NudgeContact } from './ProductNudge.types';

const contactContent: NudgeContact = {
  title: 'Get in touch',
  intro: 'Tell us about your environment.',
  successMessage: "Thanks — we've received your request.",
};

describe('ProductNudgeContactModal component', () => {
  it('renders when open', () => {
    const { container } = render(
      <ProductNudgeContactModal
        isOpen
        onClose={jest.fn()}
        content={contactContent}
        prefillName="Jane Doe"
        prefillEmail="jane@example.com"
        onSubmit={jest.fn().mockResolvedValue(undefined)}
      />,
    );
    expect(screen.getByRole('dialog', { name: 'Get in touch' })).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('renders closed (nothing visible)', () => {
    const { container } = render(
      <ProductNudgeContactModal
        isOpen={false}
        onClose={jest.fn()}
        content={contactContent}
        onSubmit={jest.fn().mockResolvedValue(undefined)}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('renders with partnerLogos', () => {
    const { container } = render(
      <ProductNudgeContactModal
        isOpen
        onClose={jest.fn()}
        content={contactContent}
        onSubmit={jest.fn().mockResolvedValue(undefined)}
        partnerLogos={<img src="logo.svg" alt="Partner" style={{ height: '1.25rem' }} />}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
