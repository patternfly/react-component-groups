import { ResponsiveActions } from '@patternfly/react-component-groups/dist/dynamic/ResponsiveActions';
import { ResponsiveAction } from '@patternfly/react-component-groups/dist/dynamic/ResponsiveAction';

describe('ResponsiveActions', () => {
  beforeEach(() => {
    cy.viewport(1280, 2000);
  });

  it('renders persistent, pinned, and overflow actions', () => {
    cy.mount(
      <ResponsiveActions breakpoint="lg">
        <ResponsiveAction isPersistent>Persistent action</ResponsiveAction>
        <ResponsiveAction isPinned variant="secondary">
          Pinned action
        </ResponsiveAction>
        <ResponsiveAction>Overflow action</ResponsiveAction>
      </ResponsiveActions>
    );

    cy.get('[data-ouia-component-id="ResponsiveActions-action-0"]').should('be.visible');
    cy.get('[data-ouia-component-id="ResponsiveActions-action-1"]').should('be.visible');
    cy.get('[data-ouia-component-id="ResponsiveActions-action-2"]').should('not.exist');

    cy.get('[data-ouia-component-id="ResponsiveActions-menu-dropdown-toggle"]').click();
    cy.get('[data-ouia-component-id="ResponsiveActions-action-2"]').should('be.visible');
  });

  it('handles click events on actions', () => {
    const onClickSpy = cy.spy().as('actionClickSpy');

    cy.mount(
      <ResponsiveActions breakpoint="lg">
        <ResponsiveAction isPersistent onClick={onClickSpy}>
          Persistent action
        </ResponsiveAction>
        <ResponsiveAction isPinned variant="secondary" onClick={onClickSpy}>
          Pinned action
        </ResponsiveAction>
        <ResponsiveAction onClick={onClickSpy}>Overflow action</ResponsiveAction>
      </ResponsiveActions>
    );

    cy.get('[data-ouia-component-id="ResponsiveActions-action-0"]').click();
    cy.get('@actionClickSpy').should('have.been.calledOnce');

    cy.get('[data-ouia-component-id="ResponsiveActions-action-1"]').click();
    cy.get('@actionClickSpy').should('have.been.calledTwice');

    cy.get('[data-ouia-component-id="ResponsiveActions-menu-dropdown-toggle"]').click();
    cy.get('[data-ouia-component-id="ResponsiveActions-action-2"]').click();
    cy.get('@actionClickSpy').should('have.been.calledThrice');
  });

  it('renders no persistent or pinned actions without flags', () => {
    cy.mount(
      <ResponsiveActions breakpoint="lg">
        <ResponsiveAction>Overflow action</ResponsiveAction>
      </ResponsiveActions>
    );

    cy.get('[data-ouia-component-id="menu-persistent-content"]').should('not.exist');
    cy.get('[data-ouia-component-id="menu-pinned-content"]').should('not.exist');

    cy.get('[data-ouia-component-id="ResponsiveActions-menu-dropdown-toggle"]').click();
    cy.contains('Overflow action').should('be.visible');
  });
});
