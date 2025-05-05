import { render } from '@testing-library/react';
import PageHeader from './PageHeader';

describe('PageHeader component', () => {
  test('should render', () => {
    expect(render(<PageHeader title='My title' subtitle='This is a subtitle for your page header' />)).toMatchSnapshot();
  });
});