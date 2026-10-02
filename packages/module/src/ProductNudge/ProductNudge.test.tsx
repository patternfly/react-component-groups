import { fireEvent, render, screen } from '@testing-library/react';
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

  it('applies the Lightwell CTA color when the brand is selected', () => {
    render(<ProductNudge prominence="hero" brand="lightwell" content={content} isEligible onAction={jest.fn()} />);

    expect(screen.getByRole('button', { name: 'Get in touch' })).toHaveStyle({
      '--pf-v6-c-button--BackgroundColor': 'var(--pf-t--color--red--50)',
    });
  });

  it('uses neutral CTA styling and consumer assets without a brand preset', () => {
    render(
      <ProductNudge
        prominence="hero"
        content={{ ...content, assets: { logo: { src: 'custom-logo.svg', alt: 'Custom' } } }}
        isEligible
        onAction={jest.fn()}
      />,
    );

    expect(screen.getByRole('button', { name: 'Get in touch' })).not.toHaveStyle({
      '--pf-v6-c-button--BackgroundColor': 'var(--pf-t--color--red--50)',
    });
    expect(screen.getByRole('img', { name: 'Custom' })).toHaveAttribute('src', 'custom-logo.svg');
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

  it('renders a caller-provided alert icon', () => {
    render(
      <ProductNudge
        prominence="alert"
        content={{ ...content, icon: <span data-testid="custom-alert-icon">Icon</span> }}
        isEligible
        onAction={jest.fn()}
      />,
    );

    expect(screen.getByTestId('custom-alert-icon')).toBeInTheDocument();
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

  it('keeps dismissible field nudges dismissible', () => {
    const onDismiss = jest.fn();
    render(
      <ProductNudge
        prominence="field"
        behavior="dismissible"
        content={content}
        isEligible
        onAction={jest.fn()}
        onDismiss={onDismiss}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Dismiss Test headline' }));

    expect(onDismiss).toHaveBeenCalledTimes(1);
    expect(screen.queryByText('Test headline')).not.toBeInTheDocument();
  });

  it('routes contact CTAs in field prominence to the action callback', () => {
    const onAction = jest.fn();
    render(
      <ProductNudge
        prominence="field"
        content={content}
        isEligible
        onAction={onAction}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Get in touch' }));

    expect(onAction).toHaveBeenCalledTimes(1);
  });

  it('preserves prominence styling when content is collapsible', () => {
    const { container } = render(
      <ProductNudge
        prominence="hero"
        behavior="collapsible"
        content={content}
        isEligible
        onAction={jest.fn()}
      />,
    );

    expect(container.querySelector('.pf-v6-c-hero')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Test headline' })).toBeInTheDocument();
  });

  it('lets consumers choose a heading level for the page context', () => {
    render(
      <ProductNudge
        prominence="hero"
        headingLevel="h2"
        content={content}
        isEligible
        onAction={jest.fn()}
      />,
    );

    expect(screen.getByRole('heading', { level: 2, name: 'Test headline' })).toBeInTheDocument();
  });

  it('renders the Lightwell alert mark at 28px', () => {
    const { container } = render(
      <ProductNudge prominence="alert" brand="lightwell" content={linkContent} isEligible onAction={jest.fn()} />,
    );

    expect(container.querySelector('.pf-v6-c-alert__icon img')).toHaveStyle({ width: '1.75rem', height: '1.75rem' });
  });
});
