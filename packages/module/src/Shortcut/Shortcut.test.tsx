import React from 'react';
import { render } from '@testing-library/react';
import Shortcut from './Shortcut';

describe('Shortcut component', () => {
  it('should render correctly', () => {
    expect(render(<Shortcut description='Shortcut description' keys={[ 'cmd', 'shift' ]} click/>)).toMatchSnapshot();
  });
});
