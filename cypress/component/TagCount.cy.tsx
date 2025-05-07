import TagCount from '../../packages/module/dist/dynamic/TagCount';

describe('TagCount', () => {
  it('renders TagCount', () => {
    cy.mount(<TagCount count={50} />);
    cy.get('button[data-ouia-component-id="TagCount"]').should('exist');
    cy.get('[data-ouia-component-id="TagCount-text"]').contains('50');
  });

  it('render disabled', () => {
    cy.mount(<TagCount disabled={true} />);
    cy.get('button[data-ouia-component-id="TagCount"]').should('be.disabled');
  });
});
