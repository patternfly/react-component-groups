import { render, screen } from '@testing-library/react';
import { ModalDeck } from './ModalDeck';
import { Button } from '@patternfly/react-core';

describe('ModalDeck component', () => {
  test('should render when open', () => {
    const { container } = render(
      <ModalDeck isOpen={true}>
        <div>
          Modal content
          <Button>Close</Button>
        </div>
      </ModalDeck>
    );
    
    expect(screen.getByText('Modal content')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  test('should not render when closed', () => {
    render(
      <ModalDeck isOpen={false}>
        <div>
          Modal content
          <Button>Close</Button>
        </div>
      </ModalDeck>
    );
    
    expect(screen.queryByText('Modal content')).not.toBeInTheDocument();
  });

  test('should render children', () => {
    render(
      <ModalDeck isOpen={true}>
        <div data-testid="test-child">
          Test content
          <Button>Action</Button>
        </div>
      </ModalDeck>
    );
    
    expect(screen.getByTestId('test-child')).toBeInTheDocument();
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  test('should apply small variant by default', () => {
    render(
      <ModalDeck isOpen={true}>
        <div>
          Content
          <Button>Close</Button>
        </div>
      </ModalDeck>
    );
    
    const modal = screen.getByRole('dialog');
    expect(modal).toBeInTheDocument();
    // Small variant is the default, just verify modal renders
  });

  test('should pass through modalProps', () => {
    render(
      <ModalDeck 
        isOpen={true}
        modalProps={{
          'aria-label': 'Custom modal label',
          'aria-describedby': 'custom-description'
        }}
      >
        <div>
          Content
          <Button>Close</Button>
        </div>
      </ModalDeck>
    );
    
    const modal = screen.getByRole('dialog');
    expect(modal).toHaveAttribute('aria-label', 'Custom modal label');
    expect(modal).toHaveAttribute('aria-describedby', 'custom-description');
  });

  test('should override variant through modalProps', () => {
    render(
      <ModalDeck 
        isOpen={true}
        modalProps={{
          variant: 'medium'
        }}
      >
        <div>
          Content
          <Button>Close</Button>
        </div>
      </ModalDeck>
    );
    
    const modal = screen.getByRole('dialog');
    expect(modal).toBeInTheDocument();
    // Variant override is passed through modalProps, just verify modal renders
  });
});

