import React from 'react';
import ShortcutGrid from '@patternfly/react-component-groups/dist/dynamic/ShortcutGrid';

export const BasicExample: React.FunctionComponent = () => (
  <ShortcutGrid 
    shortcuts={[ 
      { description: 'Open new tab', keys: [ 'cmd', 'shift', 't' ] }, 
      { description: 'Open new page', keys: [ 'opt', 'n' ] },
      { description: 'Move object', keys: [ 'ctrl' ], drag: true },  
    ]}
  />
);
