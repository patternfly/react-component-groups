import React from 'react';
import CloseButton from '../../packages/module/dist/dynamic/CloseButton';

describe('CloseButton', () => {
  it('renders the Close button', () => {
    /* eslint-disable no-console */
    cy.mount(<CloseButton dataTestID="close-button-example" onClick={()=>{console.log('Close button clicked')}} style={{ float: 'none' }}/>)
    cy.get('[data-test-id="close-button-example"]').should('exist');
  })
})