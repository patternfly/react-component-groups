import React from 'react';
import { render } from '@testing-library/react';
import ContentHeader from './ContentHeader';

describe('Contentheader component', () => {
  test('should render', () => {
    expect(render(<ContentHeader title='My title' subtitle='This is a subtitle for your content header' />)).toMatchSnapshot();
  });
});