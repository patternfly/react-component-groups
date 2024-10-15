import React from 'react';
import { render } from '@testing-library/react';
import TagCount from './TagCount';

describe('TagCount component', () => {
  it('should render a disabled tag count with no value', () => {
    expect(render(<TagCount />)).toMatchSnapshot();
  });


  it('should render a tag count of 11', () => {
    expect(render(<TagCount count={11} />)).toMatchSnapshot();
  });
});