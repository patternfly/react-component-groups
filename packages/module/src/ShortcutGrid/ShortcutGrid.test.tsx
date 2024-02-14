import React from 'react';
import { render } from '@testing-library/react';
import ShortcutGrid from './ShortcutGrid';

describe('ShortcutGrid component', () => {
  it('should render correctly', () => {
    expect(render(
      <ShortcutGrid 
        shortcuts={[ 
          { description: 'Open in a new tab', keys: [ 'cmd', 'shift', 't' ] }, 
          { description: 'Open new page', keys: [ 'opt', 'n' ] },
          { description: 'Move object', keys: [ 'ctrl' ], drag: true },  
        ]}
      />
    )).toMatchSnapshot();
  });
});
