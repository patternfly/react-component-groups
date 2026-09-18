import { render, screen } from '@testing-library/react';
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

  it('applies the Lightwell CTA color inline', () => {
    render(<ProductNudgeMatchAnalysisModal isOpen onClose={jest.fn()} />);

    expect(screen.getByRole('button', { name: 'Download report' })).toHaveStyle({
      '--pf-v6-c-button--BackgroundColor': 'var(--pf-t--color--red--50)',
    });
  });
});
