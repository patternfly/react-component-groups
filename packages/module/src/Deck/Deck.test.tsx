import { render } from '@testing-library/react';
import Deck from './Deck';

describe('Deck component', () => {
  test('should render', () => {
    const pages = [
      {
        content: <div>Page 1 content</div>,
        buttons: []
      },
      {
        content: <div>Page 2 content</div>,
        buttons: []
      }
    ];
    
    expect(render(
      <Deck pages={pages} />
    )).toMatchSnapshot();
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
});

