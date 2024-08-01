import React from 'react';
import ServiceCard from '../../packages/module/dist/dynamic/ServiceCard';
import { Button, ButtonVariant } from '@patternfly/react-core';

describe('ServiceCard', () => {
  it('renders ServiceCard', () => {
    cy.mount(
      <ServiceCard
        title='Example'
        subtitle='A basic example'
        description='This is a basic ServiceCard Example'
        icon={<img src="/" alt="content-header-icon" />}
        helperText='Here is helper text'
        ouiaId='Example'
      />)
    cy.get('[data-ouia-component-id="Example-card"]').should('exist');
  });
  it('renders custom footer', () => {
    cy.mount(
      <ServiceCard
        title='Example'
        subtitle='A basic example'
        description='This is a basic ServiceCard Example'
        icon={<img src="/" alt="content-header-icon" />}
        helperText='Here is helper text'
        ouiaId='Example'
        footer={<>
          <Button
            variant={ButtonVariant.secondary}
            isInline
            className='pf-v5-u-pr-md'
            component="a"
            href='www.google.com'>
            Launch
          </Button>
          <Button
            variant={ButtonVariant.link}
            component="a"
            isInline
            href='www.google.com'
          >
            Learn More
          </Button></>
        }
      />)
    cy.get('[data-ouia-component-id="Example-footer"]').should('exist');
  })
});