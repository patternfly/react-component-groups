import { render } from '@testing-library/react';
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
});
