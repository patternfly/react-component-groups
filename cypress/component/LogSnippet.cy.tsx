import LogSnippet from '../../packages/module/dist/dynamic/LogSnippet';

describe('LogSnippet', () => {
  it('renders LogSnippet', () => {
    cy.mount(<LogSnippet logSnippet="test test code" message="A test message" />);
    cy.get('[data-ouia-component-id="LogSnippet-message"]').contains('A test message');
    cy.get('[data-ouia-component-id="LogSnippet-code-content"]').contains('test code');
  });
});
