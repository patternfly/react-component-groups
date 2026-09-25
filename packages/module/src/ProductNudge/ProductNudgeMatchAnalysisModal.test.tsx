import { fireEvent, render, screen } from '@testing-library/react';
import ProductNudgeMatchAnalysisModal from './ProductNudgeMatchAnalysisModal';

describe('ProductNudgeMatchAnalysisModal component', () => {
  it('renders when open', () => {
    const { container } = render(
      <ProductNudgeMatchAnalysisModal isOpen onClose={jest.fn()} />,
    );
    expect(container).toMatchSnapshot();
  });

  it('renders closed', () => {
    const { container } = render(
      <ProductNudgeMatchAnalysisModal isOpen={false} onClose={jest.fn()} />,
    );
    expect(container).toMatchSnapshot();
  });

  it('renders supplied match analysis data', () => {
    render(
      <ProductNudgeMatchAnalysisModal
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
    render(<ProductNudgeMatchAnalysisModal isOpen onClose={jest.fn()} />);

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
      <ProductNudgeMatchAnalysisModal
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
    render(<ProductNudgeMatchAnalysisModal isOpen onClose={jest.fn()} />);

    const chart = screen.getByRole('region', { name: 'By ecosystem chart' }).querySelector('svg');
    const exactBar = chart?.querySelector('path[style*="lightwell-chart-color-exact"]');

    if (!exactBar) {
      throw new Error('Expected to find the exact-match bar');
    }
    fireEvent.mouseOver(exactBar);

    expect(await screen.findByText('Exact match: 70')).toBeInTheDocument();
  });

  it('applies the Lightwell CTA color inline', () => {
    render(<ProductNudgeMatchAnalysisModal isOpen onClose={jest.fn()} />);

    expect(screen.getByRole('button', { name: 'Download report' })).toHaveStyle({
      '--pf-v6-c-button--BackgroundColor': 'var(--pf-t--color--red--50)',
    });
  });
});
