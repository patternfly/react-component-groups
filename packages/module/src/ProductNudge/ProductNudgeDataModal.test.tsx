import { fireEvent, render, screen } from '@testing-library/react';
import ProductNudgeDataModal from './ProductNudgeDataModal';

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
    const { container } = render(
      <ProductNudgeDataModal {...lightwellProps} isOpen onClose={jest.fn()} />,
    );
    expect(container).toMatchSnapshot();
  });

  it('renders closed', () => {
    const { container } = render(
      <ProductNudgeDataModal {...lightwellProps} isOpen={false} onClose={jest.fn()} />,
    );
    expect(container).toMatchSnapshot();
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
    expect(productTitle.parentElement?.querySelector('img')).toBeInTheDocument();

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
        analysisContent={<div>Custom analysis placement</div>}
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
});
