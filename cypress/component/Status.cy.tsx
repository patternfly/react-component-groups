import * as React from 'react';
import { ExclamationTriangleIcon, CheckCircleIcon, BanIcon } from '@patternfly/react-icons';
import { Button, ButtonVariant, ButtonSize } from '@patternfly/react-core';
import { IconStatus, Status, StatusVariant } from '../../packages/module/dist/dynamic/Status';

describe('Status', () => {
  
  it('should render with label and icon', () => {
    cy.mount(<Status status={IconStatus.warning} label='Warning' icon={<ExclamationTriangleIcon/>} />);
    cy.get(`[data-ouia-component-id="Status-label"]`).should('be.visible');
    cy.get(`[data-ouia-component-id="Status-icon"]`).should('be.visible');
  });

  it('should render with iconOnly', () => {
    cy.mount(<Status iconOnly status={IconStatus.warning} label='Warning' iconTitle='1 security issue found' icon={<ExclamationTriangleIcon/>} />);
    cy.get(`[data-ouia-component-id="Status-label"]`).should('not.exist');
    cy.get(`[data-ouia-component-id="Status-icon"]`).should('be.visible');
  });

  it('should render link variant and handle click', () => {
    const handleClick = cy.stub().as('handleClick');
    cy.mount(<Status status={IconStatus.success} variant={StatusVariant.link} label='Ready' onClick={handleClick} icon={<CheckCircleIcon/>} />);
    cy.get(`[data-ouia-component-id="Status-label"]`).should('be.visible');
    cy.get(`[data-ouia-component-id="Status-icon"]`).should('be.visible');
    cy.get(`[data-ouia-component-id="Status-link-icon"]`).click();
    cy.get('@handleClick').should('have.been.calledOnce');

  });

  it('should render popover variant and handle open/close', () => {
    cy.mount(
      <Status
        status={IconStatus.danger}
        variant={StatusVariant.popover} 
        label='Not Ready' 
        icon={<BanIcon/>}
        popoverProps={{ 
          bodyContent: 'Example state description', 
          footerContent: <Button size={ButtonSize.sm} variant={ButtonVariant.link} isInline>Action</Button> 
        }}
      />
    );
    cy.get(`[data-ouia-component-id="Status-label"]`).should('be.visible');
    cy.get(`[data-ouia-component-id="Status-icon"]`).should('be.visible');

    cy.get(`[data-ouia-component-id="Status-popover-icon"]`).click();
    cy.get('[role="dialog"]').should('be.visible');
    cy.get('body').click(0, 0);
    cy.get('[role="dialog"]').should('not.exist');

  });

  it('should render with description', () => {
    cy.mount(<Status status={IconStatus.warning} label='Warning' description='1 issue found' icon={<ExclamationTriangleIcon/>} />);
    cy.get(`[data-ouia-component-id="Status-label"]`).should('be.visible');
    cy.get(`[data-ouia-component-id="Status-icon"]`).should('be.visible');
    cy.get(`[data-ouia-component-id="Status-description"]`).should('be.visible');
  });

});