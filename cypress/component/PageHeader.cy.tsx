import PageHeader from '@patternfly/react-component-groups/dist/dynamic/PageHeader';

describe('PageHeader', () => {
  it('should render PageHeader title and subtitle', () => {
    cy.mount(<PageHeader title="My title" subtitle="This is a subtitle for your page header" />);
    cy.get('title').should('exist');
    cy.get('[data-ouia-component-id="PageHeader-title"]').should('have.text', 'My title');
    cy.get('[data-ouia-component-id="PageHeader-subtitle"]').should(
      'have.text',
      'This is a subtitle for your page header'
    );
  });
});
