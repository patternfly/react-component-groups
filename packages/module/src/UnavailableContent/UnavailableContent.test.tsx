import React from 'react';
import { render } from '@testing-library/react';  
import UnavailableContent from './UnavailableContent';

describe('Unavailable component', () => {
  it('should render with no link', () => {
    expect(render(<UnavailableContent />)).toMatchSnapshot();
  });

  it('should render with a link', () => {
    expect(render(<UnavailableContent statusPageUrl="https://www.patternfly.org" />)).toMatchSnapshot();
  });
  
});
