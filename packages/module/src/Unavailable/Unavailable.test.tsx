import React from 'react';
import { render } from '@testing-library/react';  
import Unavailable from './Unavailable';

describe('Unavailable component', () => {
  it('should render with no link', () => {
    expect(render(<Unavailable />)).toMatchSnapshot();
  });

  it('should render with a link', () => {
    expect(render(<Unavailable statusPageUrl="https://www.patternfly.org" />)).toMatchSnapshot();
  });
  
});
