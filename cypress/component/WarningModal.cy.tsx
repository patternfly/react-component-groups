import React from 'react';
import { Button, ButtonVariant } from '@patternfly/react-core';
import WarningModal from '../../packages/module/dist/dynamic/WarningModal';

const BasicModal: React.FunctionComponent = () => {
  const [ isOpen, setIsOpen ] = React.useState(false);
  return <>
    <Button onClick={() => setIsOpen(true)}>Open modal</Button>
    <WarningModal
      isOpen={isOpen}
      title='Unsaved changes'
      confirmButtonLabel='Yes'
      cancelButtonLabel='No'
      onClose={() => setIsOpen(false)}
      onConfirm={() => setIsOpen(false)}>
      Your page contains unsaved changes. Do you want to leave?
    </WarningModal>
  </>
};

const CheckboxModal: React.FunctionComponent = () => {
  const [ isOpen, setIsOpen ] = React.useState(false);
  return <>
    <Button onClick={() => setIsOpen(true)}>Open modal</Button>
    <WarningModal
      isOpen={isOpen}
      title='Unsaved changes'
      confirmButtonLabel='Yes'
      cancelButtonLabel='No'
      onClose={() => setIsOpen(false)}
      onConfirm={() => setIsOpen(false)}
      withCheckbox
      checkboxLabel='Are you sure?'
      confirmButtonVariant={ButtonVariant.danger}>
      Your page contains unsaved changes. Do you want to leave?
    </WarningModal>
  </>
};

describe('WarningModal', () => {
  it('renders WarningModal', () => {
    cy.mount(<BasicModal />)
    cy.get('button').click();
    cy.get('[data-ouia-component-id="WarningModal"]').should('exist');
    cy.get('[data-ouia-component-id="WarningModal"]').contains('Unsaved changes');
    cy.get('[data-ouia-component-id="WarningModal"]').contains('Your page contains unsaved changes. Do you want to leave?');
  });

  it('confirm button should be disabled if checkbox is not checked', () => {
    cy.mount(<CheckboxModal />)
    cy.get('button').click();
    cy.get('[data-ouia-component-id="WarningModal-confirm-button"').should('have.attr', 'disabled')
    cy.get('[data-ouia-component-id="WarningModal-confirm-checkbox"').click();
    cy.get('[data-ouia-component-id="WarningModal-confirm-button"').should('not.have.attr', 'disabled')
  });

  it('should reset the confirmation checkbox once reopened', () => {
    cy.mount(<CheckboxModal />)
    cy.get('button').click();
    cy.get('[data-ouia-component-id="WarningModal-confirm-checkbox"').click();
    cy.get('[data-ouia-component-id="WarningModal-confirm-button"').click();
    cy.get('button').click();
    cy.get('[data-ouia-component-id="WarningModal-confirm-button"').should('have.attr', 'disabled')
  })
});