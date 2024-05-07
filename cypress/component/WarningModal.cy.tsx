import React from 'react';
import { Button } from '@patternfly/react-core';
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

describe('WarningModal', () => {
  it('renders WarningModal', () => {
    cy.mount(<BasicModal />)
    cy.get('button').click();
    cy.get('[class="pf-v5-c-modal-box pf-m-warning pf-m-sm"').should('exist');
    cy.get('div header h1 span').should('have.text', 'Warning alert:Unsaved changes');
  });
});