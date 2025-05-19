import { Ansible } from '@patternfly/react-component-groups/dist/dynamic/Ansible';

describe('Ansible', () => {
  it('renders supported Ansible', () => {
    cy.mount(<Ansible />);
    cy.get('i').should('have.class', 'ansibleSupported-0-2-2');
  });
  it('renders unsupported Ansible', () => {
    cy.mount(<Ansible isSupported={false} />);
    cy.get('i').should('have.class', 'ansibleUnsupported-0-2-3');
  });
});
