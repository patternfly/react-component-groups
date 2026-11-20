import { fireEvent, render, screen } from '@testing-library/react';
import { getResizeObserver } from '@patternfly/react-core';
import ProductNudgeDataModal from './ProductNudgeDataModal';

jest.mock('@patternfly/react-core', () => {
  const actual = jest.requireActual('@patternfly/react-core');
  return { ...actual, getResizeObserver: jest.fn(actual.getResizeObserver) };
});

const lightwellProps = {
  brand: 'lightwell' as const,
  matchData: { exact: 118, partial: 195, noMatch: 534 },
  ecosystemData: [
    { name: 'Java', exact: 70, partial: 120, noMatch: 180 },
    { name: 'Python', exact: 50, partial: 80, noMatch: 170 },
  ],
  titleText: 'Lightwell Lens',
  descriptionText: 'Lightwell match analysis.',
  footerText: 'Download a full, shareable report with detailed match results and remediation guidance.',
  primaryAction: { label: 'Download report', onClick: jest.fn() },
  secondaryAction: { label: 'Learn more about Lightwell', href: 'https://www.redhat.com/en/lightwell' },
};

describe('ProductNudgeDataModal component', () => {
  it('renders when open', () => {
    render(<ProductNudgeDataModal {...lightwellProps} isOpen onClose={jest.fn()} />);

    expect(screen.getByRole('dialog', { name: 'Lightwell Lens' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Match analysis' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'By ecosystem' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Learn more about Lightwell' })).toHaveAttribute(
      'href',
      'https://www.redhat.com/en/lightwell',
    );
  });

  it('associates the dialog description and labels its scrollable body', () => {
    render(<ProductNudgeDataModal {...lightwellProps} isOpen onClose={jest.fn()} />);

    const dialog = screen.getByRole('dialog', { name: 'Lightwell Lens' });
    const descriptionId = dialog.getAttribute('aria-describedby');

    expect(descriptionId).toBeTruthy();
    expect(document.getElementById(descriptionId ?? '')).toHaveTextContent('Lightwell match analysis.');
    expect(dialog.querySelector('[aria-label="Additional details"]')).toBeInTheDocument();
  });

  it('renders closed', () => {
    render(<ProductNudgeDataModal {...lightwellProps} isOpen={false} onClose={jest.fn()} />);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders supplied match analysis data', () => {
    render(
      <ProductNudgeDataModal
        {...lightwellProps}
        isOpen
        onClose={jest.fn()}
        matchData={{ exact: 10, partial: 20, noMatch: 30 }}
        ecosystemData={[ { name: 'Java', exact: 5, partial: 10, noMatch: 15 } ]}
      />,
    );

    expect(screen.getByText('50%')).toBeInTheDocument();
    expect(screen.getByText('10', { selector: 'strong' })).toBeInTheDocument();
  });

  it('renders the redesigned two-section analysis content', () => {
    render(<ProductNudgeDataModal {...lightwellProps} isOpen onClose={jest.fn()} />);

    const dialog = screen.getByRole('dialog', { name: 'Lightwell Lens' });
    const productTitle = screen.getByRole('heading', { name: 'Lightwell Lens' });
    expect(dialog).toContainElement(productTitle);
    const titleLogo = productTitle.parentElement?.querySelector('img');
    expect(titleLogo).toBeInTheDocument();
    expect(titleLogo?.parentElement).toHaveStyle({ width: '1.5rem', height: '1.5rem' });
    expect(titleLogo).toHaveStyle({ width: '100%', height: '100%' });

    const sectionsFlex = dialog.querySelector('.pf-v6-l-flex.pf-m-column.pf-m-row-on-md.pf-m-gap-2xl');
    expect(sectionsFlex?.children).toHaveLength(2);
    expect(sectionsFlex?.children[0]).toHaveClass('pf-m-flex-1');
    expect(sectionsFlex?.children[1]).toHaveClass('pf-m-flex-1');
    const sectionStack = sectionsFlex?.children[0].firstElementChild;
    expect(sectionStack).toHaveClass('pf-v6-l-stack', 'pf-m-gutter');
    expect(sectionStack?.firstElementChild?.getAttribute('class')).toBe('');
    expect(sectionStack?.firstElementChild?.firstElementChild).toHaveClass('pf-v6-l-stack', 'pf-m-gutter');

    expect(screen.getByRole('heading', { name: 'Match analysis' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'By ecosystem' })).toBeInTheDocument();
    expect(screen.getByText('See how packages map to supported ecosystems.')).toBeInTheDocument();
    expect(screen.getByText(/Download a full, shareable report/)).toBeInTheDocument();
  });

  it('renders responsive chart dimensions, series legend, and ecosystem labels', () => {
    render(
      <ProductNudgeDataModal
        {...lightwellProps}
        isOpen
        onClose={jest.fn()}
        ecosystemData={[
          { name: 'Java', exact: 5, partial: 10, noMatch: 15 },
          { name: 'Python', exact: 5, partial: 10, noMatch: 15 },
          { name: 'Go', exact: 5, partial: 10, noMatch: 15 },
          { name: 'Ruby', exact: 5, partial: 10, noMatch: 15 },
          { name: 'Rust', exact: 5, partial: 10, noMatch: 15 },
        ]}
      />
    );

    const chartViewport = screen.getByRole('region', { name: 'By ecosystem chart' });
    const chart = chartViewport.querySelector('svg');
    expect(chart).toHaveAttribute('viewBox');
    expect(chart).toHaveAttribute('height', '158');
    expect(screen.getByText('Exact match')).toBeInTheDocument();
    expect(screen.getByText('Partial match')).toBeInTheDocument();
    expect(screen.getByText('No match')).toBeInTheDocument();
    expect(screen.getByText('Java')).toBeInTheDocument();
    expect(screen.getByText('Python')).toBeInTheDocument();

    expect(chart?.querySelector('desc')).toHaveTextContent(
      'Java: 5 exact matches, 10 partial matches, 15 with no match',
    );

    expect(chart?.querySelector('path[style*="lightwell-chart-color-exact"]')).toBeInTheDocument();
    expect(chart?.querySelector('path[style*="lightwell-chart-color-partial"]')).toBeInTheDocument();
    const legendSwatches = Array.from(chart?.querySelectorAll('path') ?? []).slice(-3);
    expect(legendSwatches[0]).toHaveAttribute('style', expect.stringContaining('lightwell-chart-color-exact'));
    expect(legendSwatches[1]).toHaveAttribute('style', expect.stringContaining('lightwell-chart-color-partial'));
    expect(legendSwatches[2]).toHaveAttribute(
      'style',
      expect.stringContaining(
        'lightwell-chart-color-no-match, var(--pf-t--chart--global--fill--color--200, #e0e0e0)',
      ),
    );
  });

  it('uses the caller-provided chart palette for ecosystem legend swatches', () => {
    const chartColors = [ '#123456', '#234567', '#345678' ];
    render(
      <ProductNudgeDataModal
        {...lightwellProps}
        isOpen
        onClose={jest.fn()}
        chartColors={chartColors}
      />,
    );

    const chart = screen.getByRole('region', { name: 'By ecosystem chart' }).querySelector('svg');
    const legendSwatches = Array.from(chart?.querySelectorAll('path') ?? []).slice(-3);
    expect(legendSwatches.map((swatch) => swatch.style.fill)).toEqual(chartColors);
  });

  it('shows match type and value in ecosystem bar tooltips', async () => {
    render(<ProductNudgeDataModal {...lightwellProps} isOpen onClose={jest.fn()} />);

    const chart = screen.getByRole('region', { name: 'By ecosystem chart' }).querySelector('svg');
    const exactBar = chart?.querySelector('path[style*="lightwell-chart-color-exact"]');

    if (!exactBar) {
      throw new Error('Expected to find the exact-match bar');
    }
    fireEvent.mouseOver(exactBar);

    expect(await screen.findByText('Exact match: 70')).toBeInTheDocument();
  });

  it('applies the Lightwell CTA color inline', () => {
    render(<ProductNudgeDataModal {...lightwellProps} isOpen onClose={jest.fn()} />);

    expect(screen.getByRole('button', { name: 'Download report' })).toHaveStyle({
      '--pf-v6-c-button--BackgroundColor': 'var(--pf-t--color--red--50)',
    });
  });

  it('supports caller content and actions without adding Lightwell copy', () => {
    const onClick = jest.fn();
    render(
      <ProductNudgeDataModal
        isOpen
        onClose={jest.fn()}
        titleText="Coverage overview"
        customContent={<div>Custom analysis placement</div>}
        footerText="Your custom report is ready."
        primaryAction={{ label: 'Open report', onClick }}
      />,
    );

    expect(screen.getByRole('dialog', { name: 'Coverage overview' })).toBeInTheDocument();
    expect(screen.getByText('Custom analysis placement')).toBeInTheDocument();
    expect(screen.queryByRole('region', { name: 'By ecosystem chart' })).not.toBeInTheDocument();
    expect(screen.queryByText('Learn more about Lightwell')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Open report' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('does not supply product-specific chart data implicitly', () => {
    render(<ProductNudgeDataModal isOpen onClose={jest.fn()} titleText="Analysis" />);

    expect(screen.queryByRole('region', { name: 'By ecosystem chart' })).not.toBeInTheDocument();
    expect(screen.queryByText('Java')).not.toBeInTheDocument();
  });

  it('allows overriding the title icon size and content aria-label', () => {
    render(
      <ProductNudgeDataModal
        {...lightwellProps}
        isOpen
        onClose={jest.fn()}
        titleIconSize="2rem"
        contentAriaLabel="Custom region label"
      />,
    );

    const productTitle = screen.getByRole('heading', { name: 'Lightwell Lens' });
    const titleLogo = productTitle.parentElement?.querySelector('img');
    expect(titleLogo?.parentElement).toHaveStyle({ width: '2rem', height: '2rem' });
    expect(screen.getByRole('region', { name: 'Custom region label' })).toBeInTheDocument();
  });

  it('renders only the match analysis when ecosystemData is omitted', () => {
    render(<ProductNudgeDataModal {...lightwellProps} ecosystemData={undefined} isOpen onClose={jest.fn()} />);

    expect(screen.getByRole('heading', { name: 'Match analysis' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'By ecosystem' })).not.toBeInTheDocument();
  });

  it('renders only the ecosystem chart when matchData is omitted', () => {
    render(<ProductNudgeDataModal {...lightwellProps} matchData={undefined} isOpen onClose={jest.fn()} />);

    expect(screen.getByRole('heading', { name: 'By ecosystem' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Match analysis' })).not.toBeInTheDocument();
  });

  it('renders no charts when neither matchData nor ecosystemData is provided', () => {
    render(<ProductNudgeDataModal titleText="Empty" isOpen onClose={jest.fn()} />);

    expect(screen.queryByRole('heading', { name: 'Match analysis' })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'By ecosystem' })).not.toBeInTheDocument();
  });

  it('prefers customContent over both built-in charts', () => {
    render(<ProductNudgeDataModal {...lightwellProps} customContent={<p>Custom body</p>} isOpen onClose={jest.fn()} />);

    expect(screen.getByText('Custom body')).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Match analysis' })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'By ecosystem' })).not.toBeInTheDocument();
  });

  it('scales the ecosystem chart axis to data larger than 200', () => {
    render(
      <ProductNudgeDataModal
        {...lightwellProps}
        ecosystemData={[ { name: 'Java', exact: 350, partial: 20, noMatch: 10 } ]}
        isOpen
        onClose={jest.fn()}
      />,
    );

    const chart = screen.getByRole('region', { name: 'By ecosystem chart' }).querySelector('svg');
    expect(chart?.textContent).toContain('400');
  });

  it('keeps the default axis ticks for small ecosystem data', () => {
    render(<ProductNudgeDataModal {...lightwellProps} isOpen onClose={jest.fn()} />);

    const chart = screen.getByRole('region', { name: 'By ecosystem chart' }).querySelector('svg');
    expect(chart?.textContent).toContain('200');
    expect(chart?.textContent).not.toContain('400');
  });

  it('observes the ecosystem chart when the modal starts closed and is opened later', () => {
    const resizeObserverMock = getResizeObserver as jest.Mock;
    resizeObserverMock.mockClear();
    const { rerender } = render(<ProductNudgeDataModal {...lightwellProps} isOpen={false} onClose={jest.fn()} />);
    expect(resizeObserverMock).not.toHaveBeenCalled();

    rerender(<ProductNudgeDataModal {...lightwellProps} isOpen onClose={jest.fn()} />);

    expect(resizeObserverMock).toHaveBeenCalledWith(
      screen.getByRole('region', { name: 'By ecosystem chart' }),
      expect.any(Function),
    );
  });

  it('renders the secondary link action with a trailing icon in the button icon slot', () => {
    render(<ProductNudgeDataModal {...lightwellProps} isOpen onClose={jest.fn()} />);

    const link = screen.getByRole('link', { name: 'Learn more about Lightwell' });
    expect(link.querySelector('.pf-v6-c-button__icon.pf-m-end svg')).toBeInTheDocument();
  });

  it('does not remount the title icon when the modal rerenders with the same props', () => {
    const { rerender } = render(<ProductNudgeDataModal {...lightwellProps} isOpen onClose={jest.fn()} />);
    const icon = screen.getByRole('dialog').querySelector('.pf-v6-c-modal-box__title-icon img');

    rerender(<ProductNudgeDataModal {...lightwellProps} isOpen onClose={jest.fn()} />);

    expect(screen.getByRole('dialog').querySelector('.pf-v6-c-modal-box__title-icon img')).toBe(icon);
  });

  it('keeps the ecosystem axis close to the data instead of overshooting', () => {
    render(
      <ProductNudgeDataModal
        {...lightwellProps}
        ecosystemData={[ { name: 'Java', exact: 70, partial: 120, noMatch: 804 } ]}
        isOpen
        onClose={jest.fn()}
      />,
    );

    const chart = screen.getByRole('region', { name: 'By ecosystem chart' }).querySelector('svg');
    expect(chart?.textContent).toContain('1K');
    expect(chart?.textContent).not.toContain('2K');
  });

  it('does not render the ecosystem section for an empty ecosystemData array', () => {
    render(<ProductNudgeDataModal {...lightwellProps} ecosystemData={[]} isOpen onClose={jest.fn()} />);

    expect(screen.queryByRole('heading', { name: 'By ecosystem' })).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Match analysis' })).toBeInTheDocument();
  });

  it('keeps a consumer title icon mounted and up to date across rerenders', () => {
    const { rerender } = render(
      <ProductNudgeDataModal {...lightwellProps} titleIcon={<span data-testid="title-icon">First</span>} isOpen onClose={jest.fn()} />,
    );
    const icon = screen.getByTestId('title-icon');

    rerender(
      <ProductNudgeDataModal {...lightwellProps} titleIcon={<span data-testid="title-icon">Second</span>} isOpen onClose={jest.fn()} />,
    );

    expect(screen.getByTestId('title-icon')).toBe(icon);
    expect(icon).toHaveTextContent('Second');
  });
});
