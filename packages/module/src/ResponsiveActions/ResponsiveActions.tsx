import React, { useState } from 'react';
import { Button, Dropdown, DropdownList, MenuToggle, OverflowMenu, OverflowMenuContent, OverflowMenuControl, OverflowMenuDropdownItem, OverflowMenuGroup, OverflowMenuItem, OverflowMenuProps } from '@patternfly/react-core';
import { EllipsisVIcon } from '@patternfly/react-icons';
import { ResponsiveActionProps } from '../ResponsiveAction';

/** extends OverflowMenuProps */
export interface ResponsiveActionsProps extends Omit<OverflowMenuProps, 'ref' | 'breakpoint'> {
  /** Indicates breakpoint at which to switch between horizontal menu and vertical dropdown */
  breakpoint?: OverflowMenuProps['breakpoint'];
  /** Custom OUIA ID */
  ouiaId?: string;
  /** Child actions to be displayed */
  children: React.ReactNode;
}

export const ResponsiveActions: React.FunctionComponent<ResponsiveActionsProps> = ({ ouiaId = 'ResponsiveActions', breakpoint = 'lg', children, ...props }: ResponsiveActionsProps) => {
  const [ isOpen, setIsOpen ] = useState(false);

  // separate persistent, pinned and collapsed actions
  const persistentActions: React.ReactNode[] = [];
  const pinnedActions: React.ReactNode[] = [];
  const dropdownItems: React.ReactNode[] = [];

  React.Children.forEach(children, (child, index) => {
    if (React.isValidElement<ResponsiveActionProps>(child)) {
      const { isPersistent, isPinned, key = index, children, onClick, ...actionProps } = child.props;

      if (isPersistent || isPinned) {
        (isPersistent ? persistentActions : pinnedActions).push(
          <OverflowMenuItem key={key} isPersistent={isPersistent}>
            <Button onClick={onClick} ouiaId={`${ouiaId}-action-${key}`} {...actionProps}>
              {children}
            </Button>
          </OverflowMenuItem>
        );
      }
      if (!isPersistent) {
        dropdownItems.push(
          <OverflowMenuDropdownItem key={key} onClick={onClick} isShared={isPinned} ouiaId={`${ouiaId}-action-${key}`} isDisabled={actionProps.isDisabled}>
            {children}
          </OverflowMenuDropdownItem>
        );
      }
    }
  });

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
        <OverflowMenuControl hasAdditionalOptions data-ouia-component-id={`${ouiaId}-menu-control`}>
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
              />
            )}
            isOpen={isOpen}
            onOpenChange={setIsOpen}
          >
            <DropdownList data-ouia-component-id={`${ouiaId}-menu-dropdown-list`}>
              {dropdownItems}
            </DropdownList>
          </Dropdown>
        </OverflowMenuControl>
      )}
    </OverflowMenu>
  );
};

export default ResponsiveActions;