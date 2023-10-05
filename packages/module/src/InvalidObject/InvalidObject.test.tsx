import InvalidObject from './InvalidObject';
import React from 'react';
import { render } from '@testing-library/react';

describe('InvalidObject component', () => {
  test('should render', () => {
    expect(render(<InvalidObject />)).toMatchSnapshot();
  });
});