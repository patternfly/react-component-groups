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
      <ProductNudge variant="full-width" content={content} isEligible={false} onAction={jest.fn()} />,
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('renders full-width variant', () => {
    const { container } = render(
      <ProductNudge variant="full-width" content={content} isEligible onAction={jest.fn()} />,
    );

    expect(container.querySelector('.pf-v6-product-nudge--full-width')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1, name: 'Test headline' })).toBeInTheDocument();
    expect(screen.getByText('Test body copy.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Get in touch' })).toHaveClass('pf-m-display-lg');
  });

  it('applies the Lightwell CTA color when the brand is selected', () => {
    render(<ProductNudge variant="full-width" brand="lightwell" content={content} isEligible onAction={jest.fn()} />);

    expect(screen.getByRole('button', { name: 'Get in touch' })).toHaveStyle({
      '--pf-v6-c-button--BackgroundColor': 'var(--pf-t--color--red--50)',
    });
  });

  it('uses neutral CTA styling and consumer assets without a brand preset', () => {
    render(
      <ProductNudge
        variant="full-width"
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

  it('renders inline variant with link CTA', () => {
    const { container } = render(
      <ProductNudge variant="inline" content={linkContent} isEligible />,
    );

    expect(container.querySelector('.pf-v6-c-alert.pf-m-inline')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Learn more' })).toHaveAttribute('href', 'https://example.com');
  });

  it('renders inline variant dismissible', () => {
    const onDismiss = jest.fn();
    render(
      <ProductNudge
        variant="inline"
        behavior="dismissible"
        content={content}
        isEligible
        onAction={jest.fn()}
        onDismiss={onDismiss}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: /Test headline/ }));

    expect(onDismiss).toHaveBeenCalledTimes(1);
    expect(screen.queryByText('Test headline')).not.toBeInTheDocument();
  });

  it('renders a caller-provided alert icon', () => {
    render(
      <ProductNudge
        variant="inline"
        content={{ ...content, icon: <span data-testid="custom-alert-icon">Icon</span> }}
        isEligible
        onAction={jest.fn()}
      />,
    );

    expect(screen.getByTestId('custom-alert-icon')).toBeInTheDocument();
  });

  it('renders with metrics', () => {
    render(
      <ProductNudge
        variant="full-width"
        content={content}
        metrics={[ { label: 'packages', value: 42, format: 'count' } ]}
        isEligible
        onAction={jest.fn()}
      />,
    );

    expect(screen.getByText('42')).toBeInTheDocument();
    expect(screen.getByText('packages')).toBeInTheDocument();
  });

  it('renders with default CTA color scheme', () => {
    render(
      <ProductNudge
        variant="full-width"
        content={content}
        isEligible
        onAction={jest.fn()}
        ctaColorScheme="default"
      />,
    );

    expect(screen.getByRole('button', { name: 'Get in touch' })).not.toHaveStyle({
      '--pf-v6-c-button--BackgroundColor': 'var(--pf-t--color--red--50)',
    });
  });

  it('keeps dismissible field nudges dismissible', () => {
    const onDismiss = jest.fn();
    render(
      <ProductNudge
        variant="compact"
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

  it('routes contact CTAs in compact variant to the action callback', () => {
    const onAction = jest.fn();
    render(
      <ProductNudge
        variant="compact"
        content={content}
        isEligible
        onAction={onAction}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Get in touch' }));

    expect(onAction).toHaveBeenCalledTimes(1);
  });

  it('preserves variant styling when content is collapsible', () => {
    const { container } = render(
      <ProductNudge
        variant="full-width"
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
        variant="full-width"
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
      <ProductNudge variant="inline" brand="lightwell" content={linkContent} isEligible onAction={jest.fn()} />,
    );

    expect(container.querySelector('.pf-v6-c-alert__icon img')).toHaveStyle({ width: '1.75rem', height: '1.75rem' });
  });

  it('allows overriding the alert mark size and offset', () => {
    const { container } = render(
      <ProductNudge
        variant="inline"
        brand="lightwell"
        logoMarkSize="2rem"
        logoMarkOffset="0"
        content={linkContent}
        isEligible
        onAction={jest.fn()}
      />,
    );

    expect(container.querySelector('.pf-v6-c-alert__icon img')).toHaveStyle({
      width: '2rem',
      height: '2rem',
      marginInlineStart: '0',
    });
  });

  it('allows overriding the hero logo size and offset', () => {
    render(
      <ProductNudge
        variant="full-width"
        brand="lightwell"
        logoSize="4rem"
        logoOffset="0"
        content={content}
        isEligible
        onAction={jest.fn()}
      />,
    );

    expect(screen.getByRole('img', { name: 'Lightwell' })).toHaveStyle({
      width: '4rem',
      marginInlineStart: '0',
    });
  });

  it('allows overriding the hero background color', () => {
    const { container } = render(
      <ProductNudge
        variant="full-width"
        backgroundColor="#123456"
        content={content}
        isEligible
        onAction={jest.fn()}
      />,
    );

    expect(container.querySelector('.pf-v6-c-hero')).toHaveStyle({ '--pn-nudge-background-color': '#123456' });
  });

  it('allows overriding chrome copy for dismiss, show-less, and show-details labels', () => {
    render(
      <ProductNudge
        variant="full-width"
        behavior="dismissible"
        dismissAriaLabelPrefix="Close "
        content={content}
        isEligible
        onAction={jest.fn()}
      />,
    );

    expect(screen.getByRole('button', { name: 'Close Test headline' })).toBeInTheDocument();
  });

  it('applies ctaColorScheme="custom" using the caller-supplied ctaStyle', () => {
    render(
      <ProductNudge
        variant="full-width"
        ctaColorScheme="custom"
        ctaStyle={{ '--pf-v6-c-button--BackgroundColor': '#00ff00' } as React.CSSProperties}
        content={content}
        isEligible
        onAction={jest.fn()}
      />,
    );

    expect(screen.getByRole('button', { name: 'Get in touch' })).toHaveStyle({
      '--pf-v6-c-button--BackgroundColor': '#00ff00',
    });
  });

  it('places the full-width dismiss button before the nudge content in the tab order', () => {
    render(
      <ProductNudge
        variant="full-width"
        behavior="dismissible"
        content={linkContent}
        isEligible
        onDismiss={jest.fn()}
      />,
    );

    const dismiss = screen.getByRole('button', { name: 'Dismiss Test headline' });
    const heading = screen.getByRole('heading', { name: 'Test headline' });
    const link = screen.getByRole('link', { name: 'Learn more' });

    expect(dismiss.compareDocumentPosition(heading)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    expect(dismiss.compareDocumentPosition(link)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
  });

  it('shows a dismiss tooltip that defaults to the aria-label text and can be customized', async () => {
    const { rerender } = render(
      <ProductNudge variant="full-width" behavior="dismissible" content={content} isEligible onDismiss={jest.fn()} />,
    );

    fireEvent.mouseEnter(screen.getByRole('button', { name: 'Dismiss Test headline' }));
    expect(await screen.findByRole('tooltip')).toHaveTextContent('Dismiss Test headline');

    fireEvent.mouseLeave(screen.getByRole('button', { name: 'Dismiss Test headline' }));
    rerender(
      <ProductNudge
        variant="full-width"
        behavior="dismissible"
        content={content}
        isEligible
        onDismiss={jest.fn()}
        dismissTooltipContent="Close this offer"
      />,
    );

    fireEvent.mouseEnter(screen.getByRole('button', { name: 'Dismiss Test headline' }));
    expect(await screen.findByText('Close this offer')).toBeInTheDocument();
  });

  it('lets consumers set the headline size independently from the heading level', () => {
    render(
      <ProductNudge
        variant="full-width"
        headingLevel="h3"
        headingSize="lg"
        content={content}
        isEligible
        onAction={jest.fn()}
      />,
    );

    expect(screen.getByRole('heading', { level: 3, name: 'Test headline' })).toHaveClass('pf-m-lg');
  });

  it('does not require onAction for link CTAs', () => {
    render(<ProductNudge variant="compact" content={linkContent} isEligible />);

    expect(screen.getByRole('link', { name: 'Learn more' })).toHaveAttribute('href', 'https://example.com');
  });

  it('applies dismissAriaLabelPrefix to the inline variant dismiss button and calls onDismiss', () => {
    const onDismiss = jest.fn();
    render(
      <ProductNudge
        variant="inline"
        behavior="dismissible"
        dismissAriaLabelPrefix="Close "
        content={content}
        isEligible
        onAction={jest.fn()}
        onDismiss={onDismiss}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Close Test headline' }));

    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it('shows the dismiss tooltip on the inline variant', async () => {
    render(
      <ProductNudge variant="inline" behavior="dismissible" content={content} isEligible onAction={jest.fn()} onDismiss={jest.fn()} />,
    );

    fireEvent.mouseEnter(screen.getByRole('button', { name: 'Dismiss Test headline' }));

    expect(await screen.findByRole('tooltip')).toHaveTextContent('Dismiss Test headline');
  });

  it('does not duplicate the dismiss label for assistive technology with the default tooltip', async () => {
    render(
      <ProductNudge variant="full-width" behavior="dismissible" content={content} isEligible onAction={jest.fn()} onDismiss={jest.fn()} />,
    );
    const dismiss = screen.getByRole('button', { name: 'Dismiss Test headline' });

    fireEvent.mouseEnter(dismiss);
    await screen.findByRole('tooltip');

    expect(dismiss).not.toHaveAttribute('aria-describedby');
  });

  it('describes the dismiss button with a custom tooltip', async () => {
    render(
      <ProductNudge
        variant="full-width"
        behavior="dismissible"
        dismissTooltipContent="Close this offer"
        content={content}
        isEligible
        onAction={jest.fn()}
        onDismiss={jest.fn()}
      />,
    );
    const dismiss = screen.getByRole('button', { name: 'Dismiss Test headline' });

    fireEvent.mouseEnter(dismiss);
    const tooltip = await screen.findByRole('tooltip');

    expect(tooltip).toHaveTextContent('Close this offer');
    expect(dismiss).toHaveAttribute('aria-describedby', tooltip.id);
  });

  it.each([ 'full-width', 'inline', 'compact' ] as const)(
    'does not render a contact CTA without onAction in the %s variant',
    (variant) => {
      render(<ProductNudge variant={variant} content={content} isEligible />);

      expect(screen.getByText('Test headline')).toBeInTheDocument();
      expect(screen.queryByRole('button', { name: 'Get in touch' })).not.toBeInTheDocument();
    },
  );

  it('shows the first metric value with its label in the compact variant', () => {
    render(
      <ProductNudge
        variant="compact"
        content={linkContent}
        metrics={[ { label: 'clusters threatened', value: 6, format: 'count' }, { label: 'ignored', value: 1, format: 'count' } ]}
        isEligible
      />,
    );

    expect(screen.getByText('6 clusters threatened')).toBeInTheDocument();
    expect(screen.queryByText(/ignored/)).not.toBeInTheDocument();
  });

  it('formats percentage metrics with their label in the compact variant', () => {
    render(
      <ProductNudge
        variant="compact"
        content={linkContent}
        metrics={[ { label: 'match rate', value: 42, format: 'percentage' } ]}
        isEligible
      />,
    );

    expect(screen.getByText('42% match rate')).toBeInTheDocument();
  });

});
