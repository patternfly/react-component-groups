import { act, render, screen } from '@testing-library/react';

import ProductNudgeDescriptionItem from './ProductNudgeDescriptionItem';

let restoreIntersectionObserver: () => void = jest.fn();

const installIntersectionObserverMock = () => {
  let callback: IntersectionObserverCallback = () => undefined;
  const observe = jest.fn();
  const disconnect = jest.fn();
  const originalDescriptor = Object.getOwnPropertyDescriptor(global, 'IntersectionObserver');
  const observerConstructor = jest.fn((nextCallback: IntersectionObserverCallback) => {
    callback = nextCallback;
    return { observe, disconnect } as unknown as IntersectionObserver;
  });

  Object.defineProperty(global, 'IntersectionObserver', {
    configurable: true,
    value: observerConstructor
  });

  const restore = () => {
    if (originalDescriptor) {
      Object.defineProperty(global, 'IntersectionObserver', originalDescriptor);
    } else {
      Reflect.deleteProperty(global, 'IntersectionObserver');
    }
  };
  restoreIntersectionObserver = restore;

  return {
    observe,
    disconnect,
    observerConstructor,
    notify: (intersectionRatio: number) =>
      act(() =>
        callback([ { isIntersecting: true, intersectionRatio } as IntersectionObserverEntry ], {} as IntersectionObserver)
      ),
  };
};

afterEach(() => restoreIntersectionObserver());

describe('ProductNudgeDescriptionItem component', () => {
  it('calls onImpression once when at least half visible', () => {
    const intersectionObserver = installIntersectionObserverMock();
    const onImpression = jest.fn();

    render(
      <dl>
        <ProductNudgeDescriptionItem
          isEligible
          termText="Acme Security"
          headline="Summary"
          bodyText="Details"
          onImpression={onImpression}
        />
      </dl>,
    );

    expect(intersectionObserver.observe).toHaveBeenCalledTimes(1);
    expect(intersectionObserver.observerConstructor).toHaveBeenCalledWith(expect.any(Function), { threshold: 0.5 });
    intersectionObserver.notify(0.25);
    expect(onImpression).not.toHaveBeenCalled();
    intersectionObserver.notify(0.5);
    intersectionObserver.notify(0.75);

    expect(onImpression).toHaveBeenCalledTimes(1);
    expect(intersectionObserver.disconnect).toHaveBeenCalledTimes(1);
  });

  it('does not observe when ineligible or when onImpression is omitted', () => {
    const intersectionObserver = installIntersectionObserverMock();

    const { rerender } = render(
      <dl>
        <ProductNudgeDescriptionItem
          isEligible={false}
          headline="Summary"
          bodyText="Details"
          onImpression={jest.fn()}
        />
      </dl>,
    );
    expect(intersectionObserver.observerConstructor).not.toHaveBeenCalled();

    rerender(
      <dl>
        <ProductNudgeDescriptionItem isEligible headline="Summary" bodyText="Details" />
      </dl>,
    );
    expect(intersectionObserver.observerConstructor).not.toHaveBeenCalled();
  });

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
