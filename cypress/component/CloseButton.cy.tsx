import CloseButton from '../../packages/module/dist/dynamic/CloseButton';

describe('CloseButton', () => {
  /* eslint-disable no-console */
  it('renders the Close button', () => {
    cy.mount(
      <CloseButton
        dataTestID="close-button-example"
        onClick={() => {
          console.log('Close button clicked');
        }}
        style={{ float: 'none' }}
      />
    );
    cy.get('[data-test-id="close-button-example"]').should('exist');
  });
  it('should call callback on click', () => {
    const onClickSpy = cy.spy().as('onClickSpy');
    cy.mount(<CloseButton dataTestID="close-button-example" onClick={onClickSpy} />);
    cy.get('[data-test-id="close-button-example"]').click();
    cy.get('@onClickSpy').should('have.been.called');
  });
});
