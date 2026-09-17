import { render } from '@testing-library/react';
import ProductNudgeField from './ProductNudgeField';

describe('ProductNudgeField component', () => {
  it('renders nothing when not eligible', () => {
    const { container } = render(
      <ProductNudgeField isEligible={false} titleText="Headline" bodyText="Body text." />,
    );
    expect(container).toMatchSnapshot();
  });

  it('renders when eligible', () => {
    const { container } = render(
      <ProductNudgeField
        isEligible
        titleText="Headline"
        bodyText="Body text."
        ctaText="Learn more"
        ctaUrl="https://example.com"
        logo={{ src: 'logo.png', alt: 'Logo' }}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('renders without logo or CTA link', () => {
    const { container } = render(
      <ProductNudgeField isEligible titleText="Headline" bodyText="Body text." />,
    );
    expect(container).toMatchSnapshot();
  });
});
