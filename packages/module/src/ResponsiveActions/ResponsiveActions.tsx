import type { ReactNode, FunctionComponent } from 'react';
import { Children, isValidElement, useState, useContext } from 'react';
import { Button, Dropdown, DropdownList, MenuToggle, OverflowMenu, OverflowMenuContent, OverflowMenuControl, OverflowMenuDropdownItem, OverflowMenuGroup, OverflowMenuItem, OverflowMenuProps } from '@patternfly/react-core';
import { EllipsisVIcon } from '@patternfly/react-icons';
import { ResponsiveActionProps } from '../ResponsiveAction';
import { OverflowMenuContext } from '@patternfly/react-core/dist/esm/components/OverflowMenu/OverflowMenuContext';

/** extends OverflowMenuProps */
export interface ResponsiveActionsProps extends Omit<OverflowMenuProps, 'ref' | 'breakpoint'> {
  /** Indicates breakpoint at which to switch between horizontal menu and vertical dropdown */
  breakpoint?: OverflowMenuProps['breakpoint'];
  /** Custom OUIA ID */
  ouiaId?: string;
  /** Child actions to be displayed */
  children: React.ReactNode;
}

const ResponsiveActionsDropdown: FunctionComponent<{
  ouiaId: string;
  dropdownItems: ReactNode[];
  pinnedItemsDisabled: boolean[];
  regularItemsDisabled: boolean[];
}> = ({ ouiaId, dropdownItems, pinnedItemsDisabled, regularItemsDisabled }) => {
  const [ isOpen, setIsOpen ] = useState(false);
  const { isBelowBreakpoint } = useContext(OverflowMenuContext);

  const isKebabDisabled = (() => {
    const allPinnedDisabled = pinnedItemsDisabled.length > 0 && pinnedItemsDisabled.every(disabled => disabled);
    const allRegularDisabled = regularItemsDisabled.length > 0 && regularItemsDisabled.every(disabled => disabled);

    if (isBelowBreakpoint) {
      return (pinnedItemsDisabled.length > 0 || regularItemsDisabled.length > 0) &&
             (pinnedItemsDisabled.length === 0 || allPinnedDisabled) &&
             (regularItemsDisabled.length === 0 || allRegularDisabled);
    } else {
      return allRegularDisabled;
    }
  })();

  return (
    <Dropdown
      ouiaId={`${ouiaId}-menu-dropdown`}
      onSelect={() => setIsOpen(false)}
      toggle={(toggleRef) => (
        <MenuToggle
          ouiaId={`${ouiaId}-menu-dropdown-toggle`}
          ref={toggleRef}
          aria-label="Actions overflow menu"
          variant="plain"
          icon={<EllipsisVIcon />}
          onClick={() => setIsOpen(!isOpen)}
          isExpanded={isOpen}
          isDisabled={isKebabDisabled}
        />
      )}
      isOpen={isOpen}
      onOpenChange={setIsOpen}
    >
      <DropdownList data-ouia-component-id={`${ouiaId}-menu-dropdown-list`}>
        {dropdownItems}
      </DropdownList>
    </Dropdown>
  );
};

export const ResponsiveActions: FunctionComponent<ResponsiveActionsProps> = ({ ouiaId = 'ResponsiveActions', breakpoint = 'lg', children, ...props }: ResponsiveActionsProps) => {

  // separate persistent, pinned and collapsed actions
  const persistentActions: ReactNode[] = [];
  const pinnedActions: ReactNode[] = [];
  const dropdownItems: ReactNode[] = [];
  const pinnedItemsDisabled: boolean[] = [];
  const regularItemsDisabled: boolean[] = [];
  let hasRegularActions = false;

  Children.forEach(children, (child, index) => {
    if (isValidElement<ResponsiveActionProps>(child)) {
      const { isPersistent, isPinned, children, onClick, ...actionProps } = child.props;
      const key = child.key ?? index;

      if (isPersistent || isPinned) {
        (isPersistent ? persistentActions : pinnedActions).push(
          <OverflowMenuItem key={key} isPersistent={isPersistent}>
            <Button onClick={onClick} ouiaId={`${ouiaId}-action-${key}`} {...actionProps}>
              {children}
            </Button>
          </OverflowMenuItem>
        );
      } else {
        hasRegularActions = true;
      }

      if (!isPersistent) {
        dropdownItems.push(
          <OverflowMenuDropdownItem key={key} onClick={onClick} isShared={isPinned} ouiaId={`${ouiaId}-action-${key}`} isDisabled={actionProps.isDisabled}>
            {children}
          </OverflowMenuDropdownItem>
        );
        if (isPinned) {
          pinnedItemsDisabled.push(!!actionProps.isDisabled);
        } else {
          regularItemsDisabled.push(!!actionProps.isDisabled);
        }
      }
    }
  });

  // Only render OverflowMenu if there are actions to display
  if (persistentActions.length === 0 && pinnedActions.length === 0 && dropdownItems.length === 0) {
    return null;
  }

  return (
    <OverflowMenu breakpoint={breakpoint} data-ouia-component-id={`${ouiaId}-menu`} {...props}>
      {persistentActions.length > 0 ? (
        <OverflowMenuContent isPersistent data-ouia-component-id={`${ouiaId}-menu-persistent-content`}>
          <OverflowMenuGroup groupType="button" data-ouia-component-id={`${ouiaId}-menu-persistent-group`} isPersistent>
            {persistentActions}
          </OverflowMenuGroup>
        </OverflowMenuContent>
      ) : null}
      {pinnedActions.length > 0 ? (
        <OverflowMenuContent data-ouia-component-id={`${ouiaId}-menu-pinned-content`}>
          <OverflowMenuGroup groupType="button" data-ouia-component-id={`${ouiaId}-menu-pinned-group`}>
            {pinnedActions}
          </OverflowMenuGroup>
        </OverflowMenuContent>
      ) : null}
      {dropdownItems.length > 0 && (
        <OverflowMenuControl hasAdditionalOptions={hasRegularActions} data-ouia-component-id={`${ouiaId}-menu-control`}>
          <ResponsiveActionsDropdown
            ouiaId={ouiaId}
            dropdownItems={dropdownItems}
            pinnedItemsDisabled={pinnedItemsDisabled}
            regularItemsDisabled={regularItemsDisabled}
          />
        </OverflowMenuControl>
      )}
    </OverflowMenu>
  );
};

export default ResponsiveActions;