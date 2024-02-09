import React from 'react';
import { render } from '@testing-library/react';
import LogSnippet from './LogSnippet';

describe('LogSnippet component', () => {
  it('should render LogSnippet component', () => {
    expect(render(<LogSnippet message='A log snippet' logSnippet='console.log(hello world)'/>)).toMatchSnapshot();
  });
});