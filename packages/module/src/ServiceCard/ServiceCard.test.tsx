import React from 'react';
import { render } from '@testing-library/react';
import ServiceCard from './ServiceCard';

describe('LogSnippet component', () => {
  it('should render LogSnippet component', () => {
    expect(render(<ServiceCard 
      title='Example'
      subtitle='A basic example'
      description='This is a basic ServiceCard Example'
      iconUrl='/'
      showDisabledButton={false}
      helperText=''
      learnMoreUrl='/'
      launchUrl='/'
    />)).toMatchSnapshot();
  });
});