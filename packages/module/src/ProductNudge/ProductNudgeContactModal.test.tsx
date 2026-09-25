import { fireEvent, render, screen } from '@testing-library/react';
import ProductNudgeContactModal from './ProductNudgeContactModal';

describe('ProductNudgeContactModal component', () => {
  it('renders when open', () => {
    const { container } = render(
      <ProductNudgeContactModal
        isOpen
        onClose={jest.fn()}
        titleText="Get in touch"
        descriptionText="Tell us about your environment."
        submitText="Send request"
        onSubmit={jest.fn().mockResolvedValue(undefined)}
      />,
    );
    const dialog = screen.getByRole('dialog', { name: 'Get in touch' });
    expect(dialog).toBeInTheDocument();

    const logomarkImages = dialog.querySelectorAll('img[alt=""]');
    expect(logomarkImages).toHaveLength(2);
    expect(logomarkImages[0].className).toContain('lightModeOnly');
    expect(logomarkImages[1].className).toContain('darkModeOnly');
    expect(screen.getByRole('button', { name: 'Send request' })).toHaveStyle({
      '--pf-v6-c-button--BackgroundColor': 'var(--pf-t--color--red--50)'
    });

    expect(container).toMatchSnapshot();
  });

  it('renders closed (nothing visible)', () => {
    const { container } = render(
      <ProductNudgeContactModal
        isOpen={false}
        onClose={jest.fn()}
        titleText="Get in touch"
        submitText="Send request"
        onSubmit={jest.fn().mockResolvedValue(undefined)}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('renders supplied field placeholders and submits ContactFormValues', () => {
    const onSubmit = jest.fn().mockResolvedValue(undefined);
    const { container } = render(
      <ProductNudgeContactModal
        isOpen
        onClose={jest.fn()}
        titleText="Get in touch"
        submitText="Send request"
        namePlaceholder="Enter your name"
        emailPlaceholder="Enter your email"
        phonePlaceholder="Enter your phone"
        onSubmit={onSubmit}
      />,
    );

    fireEvent.change(screen.getByPlaceholderText('Enter your name'), { target: { value: 'Jane Doe' } });
    fireEvent.change(screen.getByPlaceholderText('Enter your email'), { target: { value: 'jane@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Enter your phone'), { target: { value: '555-0100' } });
    fireEvent.click(screen.getByRole('button', { name: 'Send request' }));

    expect(onSubmit).toHaveBeenCalledWith({ name: 'Jane Doe', email: 'jane@example.com', phone: '555-0100' });
    expect(container).toMatchSnapshot();
  });
});
