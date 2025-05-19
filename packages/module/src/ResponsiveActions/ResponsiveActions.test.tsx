import { render } from '@testing-library/react';
import ResponsiveActions from './ResponsiveActions';
import ResponsiveAction from '../ResponsiveAction';

describe('ResponsiveActions component', () => {
  describe('should render correctly', () => {

    test('ResponsiveActions', () => {
      const { container } = render(
        <ResponsiveActions breakpoint="lg">
          <ResponsiveAction isPersistent>Persistent action</ResponsiveAction>
          <ResponsiveAction isPinned variant='secondary'>Pinned action</ResponsiveAction>
          <ResponsiveAction>Overflow action</ResponsiveAction>
        </ResponsiveActions>);
      expect(container).toMatchSnapshot();
    });
  });
});