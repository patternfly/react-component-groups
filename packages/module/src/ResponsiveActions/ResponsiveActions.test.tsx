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

    test('ResponsiveActions with only isPersistent actions', () => {
      const { container } = render(
        <ResponsiveActions breakpoint="lg">
          <ResponsiveAction isPersistent>Persistent action 1</ResponsiveAction>
          <ResponsiveAction isPersistent>Persistent action 2</ResponsiveAction>
        </ResponsiveActions>);

      // Should not have dropdown control when only persistent actions
      const dropdownControl = container.querySelector('[data-ouia-component-id="ResponsiveActions-menu-control"]');
      expect(dropdownControl).toBeNull();

      // Should have persistent actions
      const buttons = container.querySelectorAll('button');
      expect(buttons).toHaveLength(2);
    });

    test('ResponsiveActions with only isPinned actions', () => {
      const { container } = render(
        <ResponsiveActions breakpoint="lg">
          <ResponsiveAction isPinned>Pinned action 1</ResponsiveAction>
          <ResponsiveAction isPinned>Pinned action 2</ResponsiveAction>
        </ResponsiveActions>);

      // Should have pinned actions as buttons
      const buttons = container.querySelectorAll('button');
      expect(buttons).toHaveLength(2);
      expect(container).toMatchSnapshot();
    });

    test('ResponsiveActions with mix of isPersistent and isPinned actions', () => {
      const { container } = render(
        <ResponsiveActions breakpoint="lg">
          <ResponsiveAction isPersistent>Persistent action</ResponsiveAction>
          <ResponsiveAction isPinned>Pinned action</ResponsiveAction>
        </ResponsiveActions>);

      // Should have both persistent and pinned actions as buttons
      const buttons = container.querySelectorAll('button');
      expect(buttons).toHaveLength(2);
      expect(container).toMatchSnapshot();
    });

    test('ResponsiveActions with all dropdown items disabled should disable kebab', () => {
      const { container } = render(
        <ResponsiveActions breakpoint="lg">
          <ResponsiveAction isDisabled>Disabled action 1</ResponsiveAction>
          <ResponsiveAction isDisabled>Disabled action 2</ResponsiveAction>
        </ResponsiveActions>);

      // Kebab toggle should be disabled when all dropdown items are disabled
      const kebabToggle = container.querySelector('[data-ouia-component-id="ResponsiveActions-menu-dropdown-toggle"]');
      expect(kebabToggle).toHaveAttribute('disabled');
      expect(container).toMatchSnapshot();
    });

    test('ResponsiveActions with some enabled dropdown items should not disable kebab', () => {
      const { container } = render(
        <ResponsiveActions breakpoint="lg">
          <ResponsiveAction isDisabled>Disabled action</ResponsiveAction>
          <ResponsiveAction>Enabled action</ResponsiveAction>
        </ResponsiveActions>);

      // Kebab toggle should be enabled when at least one dropdown item is enabled
      const kebabToggle = container.querySelector('[data-ouia-component-id="ResponsiveActions-menu-dropdown-toggle"]');
      expect(kebabToggle).not.toHaveAttribute('disabled');
      expect(container).toMatchSnapshot();
    });

    test('ResponsiveActions with enabled pinned item and disabled regular item should disable kebab above breakpoint', () => {
      const { container } = render(
        <ResponsiveActions breakpoint="lg">
          <ResponsiveAction isPinned>Enabled pinned action</ResponsiveAction>
          <ResponsiveAction isDisabled>Disabled regular action</ResponsiveAction>
        </ResponsiveActions>);

      // Above breakpoint: pinned items show as buttons, so kebab is disabled if regular items are disabled
      // (When resized below breakpoint, the pinned item moves into kebab and it becomes enabled)
      const kebabToggle = container.querySelector('[data-ouia-component-id="ResponsiveActions-menu-dropdown-toggle"]');
      expect(kebabToggle).toHaveAttribute('disabled');
      expect(container).toMatchSnapshot();
    });

    test('ResponsiveActions with enabled pinned item and enabled regular item should not disable kebab', () => {
      const { container } = render(
        <ResponsiveActions breakpoint="lg">
          <ResponsiveAction isPinned>Enabled pinned action</ResponsiveAction>
          <ResponsiveAction>Enabled regular action</ResponsiveAction>
        </ResponsiveActions>);

      // Kebab should be enabled because there's an enabled regular action
      const kebabToggle = container.querySelector('[data-ouia-component-id="ResponsiveActions-menu-dropdown-toggle"]');
      expect(kebabToggle).not.toHaveAttribute('disabled');
      expect(container).toMatchSnapshot();
    });

    test('ResponsiveActions with all dropdown items disabled including pinned should disable kebab', () => {
      const { container } = render(
        <ResponsiveActions breakpoint="lg">
          <ResponsiveAction isPinned isDisabled>Disabled pinned action</ResponsiveAction>
          <ResponsiveAction isDisabled>Disabled action</ResponsiveAction>
        </ResponsiveActions>);

      // Kebab toggle should be disabled when all dropdown items (including pinned) are disabled
      const kebabToggle = container.querySelector('[data-ouia-component-id="ResponsiveActions-menu-dropdown-toggle"]');
      expect(kebabToggle).toHaveAttribute('disabled');
      expect(container).toMatchSnapshot();
    });

    test('ResponsiveActions with only persistent items should not render kebab', () => {
      const { container } = render(
        <ResponsiveActions breakpoint="lg">
          <ResponsiveAction isPersistent>Persistent action</ResponsiveAction>
        </ResponsiveActions>);

      // Should not have kebab when only persistent items exist
      const kebabToggle = container.querySelector('[data-ouia-component-id="ResponsiveActions-menu-dropdown-toggle"]');
      expect(kebabToggle).toBeNull();
    });
  });
});