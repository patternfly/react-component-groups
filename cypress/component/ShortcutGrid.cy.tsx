import React from 'react';
import ShortcutGrid from '../../packages/module/dist/dynamic/ShortcutGrid';

const shortcuts = [ 
  { description: 'Open new tab', keys: [ 'cmd', 'shift', 't' ] }, 
  { description: 'Open new page', keys: [ 'opt', 'n' ] },
  { description: 'Move object', keys: [ 'ctrl' ], drag: true },  
];

describe('ShortcutGrid', () => {
  it('renders ShortcutGrid', () => {
    const shortCutGridExample = <ShortcutGrid 
      shortcuts={shortcuts}
    />
    cy.mount(shortCutGridExample);
    cy.get('[data-ouia-component-id="ShortcutGrid"]').should('exist');
    shortcuts.forEach((shortcut, index) => {
      cy.get(`[data-ouia-component-id="ShortcutGrid-item-description-${index}"]`)
        .should('have.text', shortcut.description);
    });
  });
})