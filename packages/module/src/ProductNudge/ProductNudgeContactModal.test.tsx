import { render } from '@testing-library/react';
import ProductNudgeContactModal from './ProductNudgeContactModal';
import { NudgeContact } from './ProductNudge.types';

const contactContent: NudgeContact = {
  title: 'Get in touch',
  intro: 'Tell us about your environment.',
  messageTemplate: 'I have {{total}} vulnerable packages.',
  consent: 'By submitting, you agree to be contacted.',
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

  it('renders with footerContent', () => {
    const { container } = render(
      <ProductNudgeContactModal
        isOpen
        onClose={jest.fn()}
        content={contactContent}
        onSubmit={jest.fn().mockResolvedValue(undefined)}
        footerContent={<img src="logo.svg" alt="Partner" style={{ maxHeight: '1.5rem' }} />}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
