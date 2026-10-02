import { render, screen } from '@testing-library/react';
import ProductNudgeStack from './ProductNudgeStack';

describe('ProductNudgeStack component', () => {
  it('renders nothing when not eligible', () => {
    const { container } = render(
      <ProductNudgeStack isEligible={false} titleText="Headline" bodyText="Body text." />,
    );
    expect(container).toMatchSnapshot();
  });

  it('renders when eligible', () => {
    const { container } = render(
      <ProductNudgeStack
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
      <ProductNudgeStack isEligible titleText="Headline" bodyText="Body text." />,
    );
    expect(container).toMatchSnapshot();
  });

  it('renders the Lightwell inline mark at 16px', () => {
    const { container } = render(
      <ProductNudgeStack
        isEligible
        brand="lightwell"
        titleText="Security summary"
        bodyText="Custom body"
      />,
    );

    expect(container.querySelector('img')).toHaveStyle({ width: '1rem' });
  });

  it('allows overriding the logomark size', () => {
    const { container } = render(
      <ProductNudgeStack
        isEligible
        brand="lightwell"
        logoMarkSize="2rem"
        titleText="Security summary"
        bodyText="Custom body"
      />,
    );

    expect(container.querySelector('img')).toHaveStyle({ width: '2rem' });
  });

  it('uses the Lightwell mark only when the brand is selected and allows an icon override', () => {
    render(
      <ProductNudgeStack
        isEligible
        brand="lightwell"
        titleText="Security summary"
        titleIcon={<span data-testid="field-icon">Custom icon</span>}
        bodyText="Custom body"
      />,
    );

    expect(screen.getByTestId('field-icon')).toBeInTheDocument();
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });
});
