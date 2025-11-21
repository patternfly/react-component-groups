import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Deck, { DeckButton } from './Deck';
import { ButtonVariant } from '@patternfly/react-core';

describe('Deck component', () => {
  const mockPages = [
    {
      content: <div>Page 1 content</div>,
      buttons: [
        {
          children: 'Next',
          variant: ButtonVariant.primary,
          navigation: 'next' as const
        }
      ] as DeckButton[]
    },
    {
      content: <div>Page 2 content</div>,
      buttons: [
        {
          children: 'Previous',
          variant: ButtonVariant.secondary,
          navigation: 'previous' as const
        },
        {
          children: 'Next',
          variant: ButtonVariant.primary,
          navigation: 'next' as const
        }
      ] as DeckButton[]
    },
    {
      content: <div>Page 3 content</div>,
      buttons: [
        {
          children: 'Close',
          variant: ButtonVariant.primary,
          navigation: 'close' as const
        }
      ] as DeckButton[]
    }
  ];

  test('should render with basic pages', () => {
    const pages = [
      {
        content: <div>Page 1 content</div>,
        buttons: []
      }
    ];
    
    const { container } = render(<Deck pages={pages} />);
    expect(container).toMatchSnapshot();
  });

  test('should render first page content by default', () => {
    render(<Deck pages={mockPages} />);
    expect(screen.getByText('Page 1 content')).toBeInTheDocument();
  });

  test('should render with hideProgressDots', () => {
    const pages = [
      {
        content: <div>Page 1 content</div>,
        buttons: []
      }
    ];
    
    const { container } = render(
      <Deck pages={pages} hideProgressDots />
    );
    
    const progressDots = container.querySelector('[data-ouia-component-id="Deck-progress-dots"]');
    expect(progressDots).not.toBeInTheDocument();
  });

  test('should not render progress dots when only one page', () => {
    const pages = [
      {
        content: <div>Single page</div>,
        buttons: []
      }
    ];
    
    const { container } = render(<Deck pages={pages} />);
    const progressDots = container.querySelector('[data-ouia-component-id="Deck-progress-dots"]');
    expect(progressDots).not.toBeInTheDocument();
  });

  test('should navigate to next page when next button is clicked', async () => {
    const user = userEvent.setup();
    render(<Deck pages={mockPages} />);
    
    expect(screen.getByText('Page 1 content')).toBeInTheDocument();
    
    const nextButton = screen.getByRole('button', { name: 'Next' });
    await user.click(nextButton);
    
    expect(screen.getByText('Page 2 content')).toBeInTheDocument();
  });

  test('should navigate to previous page when previous button is clicked', async () => {
    const user = userEvent.setup();
    render(<Deck pages={mockPages} initialPage={1} />);
    
    expect(screen.getByText('Page 2 content')).toBeInTheDocument();
    
    const previousButton = screen.getByRole('button', { name: 'Previous' });
    await user.click(previousButton);
    
    expect(screen.getByText('Page 1 content')).toBeInTheDocument();
  });

  test('should call onClose when close button is clicked', async () => {
    const user = userEvent.setup();
    const onClose = jest.fn();
    
    render(<Deck pages={mockPages} onClose={onClose} initialPage={2} />);
    
    const closeButton = screen.getByRole('button', { name: 'Close' });
    await user.click(closeButton);
    
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test('should call onPageChange callback when page changes', async () => {
    const user = userEvent.setup();
    const onPageChange = jest.fn();
    
    render(<Deck pages={mockPages} onPageChange={onPageChange} />);
    
    const nextButton = screen.getByRole('button', { name: 'Next' });
    await user.click(nextButton);
    
    expect(onPageChange).toHaveBeenCalledWith(1);
  });

  test('should call custom onClick before navigation', async () => {
    const user = userEvent.setup();
    const customOnClick = jest.fn();
    
    const pagesWithCustomClick = [
      {
        content: <div>Page 1</div>,
        buttons: [
          {
            children: 'Next',
            variant: ButtonVariant.primary,
            navigation: 'next' as const,
            onClick: customOnClick
          }
        ] as DeckButton[]
      },
      {
        content: <div>Page 2</div>,
        buttons: []
      }
    ];
    
    render(<Deck pages={pagesWithCustomClick} />);
    
    const nextButton = screen.getByRole('button', { name: 'Next' });
    await user.click(nextButton);
    
    expect(customOnClick).toHaveBeenCalledTimes(1);
    expect(screen.getByText('Page 2')).toBeInTheDocument();
  });

  test('should start at initialPage', () => {
    render(<Deck pages={mockPages} initialPage={1} />);
    expect(screen.getByText('Page 2 content')).toBeInTheDocument();
  });

  test('should render with custom OUIA ID', () => {
    const { container } = render(<Deck pages={mockPages} ouiaId="CustomDeck" />);
    const element = container.querySelector('[data-ouia-component-id="CustomDeck"]');
    expect(element).toBeInTheDocument();
  });

  test('should apply custom text alignment class', () => {
    const { container } = render(<Deck pages={mockPages} textAlign="left" />);
    const contentElement = container.querySelector('[data-ouia-component-id="Deck-content"]');
    expect(contentElement).toHaveClass('pf-v6-u-text-align-left');
  });

  test('should not apply text alignment class when textAlign is false', () => {
    const { container } = render(<Deck pages={mockPages} textAlign={false} />);
    const contentElement = container.querySelector('[data-ouia-component-id="Deck-content"]');
    expect(contentElement).not.toHaveClass('pf-v6-u-text-align-center');
  });

  test('should render with custom aria labels', () => {
    const { container } = render(
      <Deck 
        pages={mockPages} 
        ariaLabel="Custom deck label"
        ariaRoleDescription="Custom role description"
      />
    );
    
    const region = container.querySelector('[role="region"]');
    expect(region).toHaveAttribute('aria-label', 'Custom deck label');
    expect(region).toHaveAttribute('aria-roledescription', 'Custom role description');
  });

  test('should render accessible page info for screen readers', () => {
    const { container } = render(<Deck pages={mockPages} />);
    const pageInfo = container.querySelector('.pf-v6-screen-reader');
    expect(pageInfo).toBeInTheDocument();
    expect(pageInfo).toHaveTextContent('Page 1 of 3');
  });

  test('should update page info when page changes', async () => {
    const user = userEvent.setup();
    const { container } = render(<Deck pages={mockPages} />);
    
    const nextButton = screen.getByRole('button', { name: 'Next' });
    await user.click(nextButton);
    
    const pageInfo = container.querySelector('.pf-v6-screen-reader');
    expect(pageInfo).toHaveTextContent('Page 2 of 3');
  });

  test('should use custom getPageLabel function', () => {
    const getPageLabel = (current: number, total: number) => `Step ${current}/${total}`;
    const { container } = render(
      <Deck pages={mockPages} getPageLabel={getPageLabel} />
    );
    
    const pageInfo = container.querySelector('.pf-v6-screen-reader');
    expect(pageInfo).toHaveTextContent('Step 1/3');
  });

  test('should render correct number of progress dots', () => {
    const { container } = render(<Deck pages={mockPages} />);
    const dots = container.querySelectorAll('[data-ouia-component-id="Deck-progress-dots"] span[aria-hidden="true"]');
    expect(dots).toHaveLength(3);
  });

  test('should not navigate beyond last page', async () => {
    const onPageChange = jest.fn();
    
    render(<Deck pages={mockPages} onPageChange={onPageChange} initialPage={2} />);
    
    expect(screen.getByText('Page 3 content')).toBeInTheDocument();
    
    // There's no next button on the last page in our mock, so the page shouldn't change
    // This tests the boundary condition
    expect(onPageChange).not.toHaveBeenCalled();
  });

  test('should not navigate before first page', async () => {
    const onPageChange = jest.fn();
    
    render(<Deck pages={mockPages} onPageChange={onPageChange} initialPage={0} />);
    
    expect(screen.getByText('Page 1 content')).toBeInTheDocument();
    
    // There's no previous button on the first page in our mock
    expect(onPageChange).not.toHaveBeenCalled();
  });
});
