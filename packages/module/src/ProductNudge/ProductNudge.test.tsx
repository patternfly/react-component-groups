import { render, screen } from '@testing-library/react';
import ProductNudge from './ProductNudge';
import { NudgeContent } from './ProductNudge.types';

const content: NudgeContent = {
  id: 'test.nudge',
  headline: 'Test headline',
  body: 'Test body copy.',
  cta: { label: 'Get in touch', action: 'contact' },
};

const linkContent: NudgeContent = {
  ...content,
  cta: { label: 'Learn more', action: 'link', href: 'https://example.com' },
};

describe('ProductNudge component', () => {
  it('renders nothing when not eligible', () => {
    const { container } = render(
      <ProductNudge prominence="hero" content={content} isEligible={false} onAction={jest.fn()} />,
    );
    expect(container).toMatchSnapshot();
  });

  it('renders hero prominence', () => {
    const { container } = render(
      <ProductNudge prominence="hero" content={content} isEligible onAction={jest.fn()} />,
    );
    expect(container).toMatchSnapshot();
  });

  it('applies the Lightwell CTA color inline', () => {
    render(<ProductNudge prominence="hero" content={content} isEligible onAction={jest.fn()} />);

    expect(screen.getByRole('button', { name: 'Get in touch' })).toHaveStyle({
      '--pf-v6-c-button--BackgroundColor': 'var(--pf-t--color--red--50)',
    });
  });

  it('renders alert prominence with link CTA', () => {
    const { container } = render(
      <ProductNudge prominence="alert" content={linkContent} isEligible onAction={jest.fn()} />,
    );
    expect(container).toMatchSnapshot();
  });

  it('renders alert prominence dismissible', () => {
    const { container } = render(
      <ProductNudge
        prominence="alert"
        behavior="dismissible"
        content={content}
        isEligible
        onAction={jest.fn()}
        onDismiss={jest.fn()}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('renders with metrics', () => {
    const { container } = render(
      <ProductNudge
        prominence="hero"
        content={content}
        metrics={[ { label: 'packages', value: 42, format: 'count' } ]}
        isEligible
        onAction={jest.fn()}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('renders with default CTA color scheme', () => {
    const { container } = render(
      <ProductNudge
        prominence="hero"
        content={content}
        isEligible
        onAction={jest.fn()}
        ctaColorScheme="default"
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
