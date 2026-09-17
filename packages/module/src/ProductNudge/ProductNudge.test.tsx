import { render } from '@testing-library/react';
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
      <ProductNudge prominence="inline" content={content} isEligible={false} onAction={jest.fn()} />,
    );
    expect(container).toMatchSnapshot();
  });

  it('renders hero prominence', () => {
    const { container } = render(
      <ProductNudge prominence="hero" content={content} isEligible onAction={jest.fn()} />,
    );
    expect(container).toMatchSnapshot();
  });

  it('renders banner prominence', () => {
    const { container } = render(
      <ProductNudge prominence="banner" content={content} isEligible onAction={jest.fn()} />,
    );
    expect(container).toMatchSnapshot();
  });

  it('renders compact prominence with link CTA', () => {
    const { container } = render(
      <ProductNudge prominence="compact" content={linkContent} isEligible onAction={jest.fn()} />,
    );
    expect(container).toMatchSnapshot();
  });

  it('renders with metrics', () => {
    const { container } = render(
      <ProductNudge
        prominence="banner"
        content={content}
        metrics={[{ label: 'packages', value: 42, format: 'count' }]}
        isEligible
        onAction={jest.fn()}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('renders dismissible behavior', () => {
    const { container } = render(
      <ProductNudge
        prominence="inline"
        behavior="dismissible"
        content={content}
        isEligible
        onAction={jest.fn()}
        onDismiss={jest.fn()}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('renders with default CTA color scheme', () => {
    const { container } = render(
      <ProductNudge
        prominence="banner"
        content={content}
        isEligible
        onAction={jest.fn()}
        ctaColorScheme="default"
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
