import { act, render, screen } from '@testing-library/react';
import ProductNudgeStack from './ProductNudgeStack';

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

  it('calls onImpression once when at least half visible', () => {
    const intersectionObserver = installIntersectionObserverMock();
    const onImpression = jest.fn();

    render(<ProductNudgeStack isEligible titleText="Headline" bodyText="Body text." onImpression={onImpression} />);

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
      <ProductNudgeStack isEligible={false} titleText="Headline" bodyText="Body text." onImpression={jest.fn()} />
    );
    expect(intersectionObserver.observerConstructor).not.toHaveBeenCalled();

    rerender(<ProductNudgeStack isEligible titleText="Headline" bodyText="Body text." />);
    expect(intersectionObserver.observerConstructor).not.toHaveBeenCalled();
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
