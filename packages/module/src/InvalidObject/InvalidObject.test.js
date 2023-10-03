import InvalidObject from './InvalidObject';
import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

describe('InvalidObject component', () => {
  it('should render', () => {
    const wrapper = mount(<InvalidObject />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});