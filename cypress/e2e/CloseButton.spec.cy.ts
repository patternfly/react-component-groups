describe('Test the close button', () => {
  it('passes', () => {
    cy.visit('http://localhost:8006/extensions/component-groups/about-component-groups', { onBeforeLoad: (win) => {cy.stub(win.console, 'log').as('consoleLog');}, });
    cy.wait(1000);
    cy.get('a[href="/extensions/component-groups/closebutton"]').click();
    cy.wait(1000);

    cy.get('[data-test-id="close-button-example"]').click();
    cy.wait(1000);
    cy.get('@consoleLog').should('be.calledWith', 'Close button clicked');
    
  })
})