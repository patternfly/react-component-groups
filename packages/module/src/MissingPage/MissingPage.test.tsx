import MissingPage from './MissingPage';
import { render } from '@testing-library/react';

describe('MissingPage component', () => {
  test('should render', () => {
    expect(render(<MissingPage />)).toMatchSnapshot();
  });
});