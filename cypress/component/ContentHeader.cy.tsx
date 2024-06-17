import React from 'react';
import ContentHeader from '../../packages/module/dist/dynamic/ContentHeader';

describe('ContentHeader', () => {
  it('should render ContentHeader title and subtitle', () => {
    cy.mount(<ContentHeader title='My title' subtitle='This is a subtitle for your content header' />);
    cy.get('title').should('exist')
    cy.get('[data-ouia-component-id="ContentHeader-title"]').should('have.text', 'My title')
    cy.get('[data-ouia-component-id="ContentHeader-subtitle"]').should('have.text', 'This is a subtitle for your content header')
  })
});