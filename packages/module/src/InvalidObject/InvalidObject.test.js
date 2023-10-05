import InvalidObject from './InvalidObject';
import React from 'react';
import { render } from '@testing-library/react';
import toJson from 'enzyme-to-json';

describe('InvalidObject component', () => {
  test('should render', () => {
    const wrapper = render(<InvalidObject />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});