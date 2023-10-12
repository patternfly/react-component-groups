import React from 'react';
import { render } from '@testing-library/react';  
import Unavailable from './Unavailable';

describe('Unavailable component', () => {
  it('should render', () => {
    expect(render(<Unavailable />)).toMatchSnapshot();
  });
});
