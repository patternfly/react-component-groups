import { render, screen } from '@testing-library/react';

import ProductNudgeDescriptionItem from './ProductNudgeDescriptionItem';

describe('ProductNudgeDescriptionItem component', () => {
  it('renders caller-provided term, icon, description, and link content', () => {
    render(
      <dl>
        <ProductNudgeDescriptionItem
          isEligible
          termText="Acme Security"
          termIcon={<span data-testid="term-icon">Icon</span>}
          headline="12 issues addressed"
          bodyText="A product-specific description."
          ctaText="View the report"
          ctaUrl="https://example.com/report"
        />
      </dl>,
    );

    expect(screen.getByText('Acme Security')).toBeInTheDocument();
    expect(screen.getByTestId('term-icon')).toBeInTheDocument();
    expect(screen.getByText('12 issues addressed')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'View the report' })).toHaveAttribute('href', 'https://example.com/report');
  });

  it('renders neutral term content when no brand or term text is supplied', () => {
    render(
      <dl>
        <ProductNudgeDescriptionItem isEligible headline="Summary" bodyText="Details" />
      </dl>,
    );

    expect(screen.queryByText('Lightwell')).not.toBeInTheDocument();
  });

  it('renders the Lightwell inline mark at 16px', () => {
    const { container } = render(
      <dl>
        <ProductNudgeDescriptionItem
          isEligible
          brand="lightwell"
          termText="Lightwell"
          headline="Summary"
          bodyText="Details"
        />
      </dl>,
    );

    expect(container.querySelector('img')).toHaveStyle({ width: '1rem' });
  });

  it('allows overriding the term logo size', () => {
    const { container } = render(
      <dl>
        <ProductNudgeDescriptionItem
          isEligible
          brand="lightwell"
          logoMarkSize="2rem"
          termText="Lightwell"
          headline="Summary"
          bodyText="Details"
        />
      </dl>,
    );

    expect(container.querySelector('img')).toHaveStyle({ width: '2rem' });
  });
});
