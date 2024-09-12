import MissingPage from './MissingPage';
import React from 'react';
import { render } from '@testing-library/react';

describe('MissingPage component', () => {
  test('should render', () => {
    expect(render(<MissingPage />)).toMatchSnapshot();
  });
});