import React from 'react';
import ShortcutGrid from '../../packages/module/dist/dynamic/ShortcutGrid';

describe('ShortcutGrid', () => {
  /* eslint-disable no-console */
  it('renders ShortcutGrid', () => {
    const shortCutGridExample = <ShortcutGrid 
      shortcuts={[ 
        { description: 'Open new tab', keys: [ 'cmd', 'shift', 't' ] }, 
        { description: 'Open new page', keys: [ 'opt', 'n' ] },
        { description: 'Move object', keys: [ 'ctrl' ], drag: true },  
      ]}
    />
    cy.mount(shortCutGridExample);
    cy.get('[class="pf-v5-l-grid pf-m-all-6-col pf-m-gutter"]').should('exist');
    cy.get('div div').should('have.text', '⌘ Cmd + ⇧ Shift + TOpen new tab⌥ Opt + NOpen new page^ Ctrl +  DragMove object⌘ Cmd + ⇧ Shift + T⌘ Cmd⇧ ShiftTOpen new tab⌥ Opt + N⌥ OptNOpen new page^ Ctrl +  Drag^ Ctrl DragMove object');
  });
})