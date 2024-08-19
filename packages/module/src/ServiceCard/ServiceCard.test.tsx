import React from 'react';
import { render } from '@testing-library/react';
import ServiceCard from './ServiceCard';

describe('ServiceCard component', () => {
  it('should render ServiceCard component', () => {
    expect(render(<ServiceCard 
      title='Example'
      subtitle='A basic example'
      description='This is a basic ServiceCard Example'
      icon='/'
      helperText=''
    />)).toMatchSnapshot();
  });
});