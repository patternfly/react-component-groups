import React, { useState, useEffect } from 'react';
import {
  Button, Dropdown, DropdownList, MenuToggle,
  OverflowMenu, OverflowMenuContent, OverflowMenuControl,
  OverflowMenuDropdownItem, OverflowMenuGroup, OverflowMenuItem,
  OverflowMenuProps,
} from '@patternfly/react-core';
import { EllipsisVIcon } from '@patternfly/react-icons';
import { ResponsiveActionProps } from '../ResponsiveAction';

export interface ResponsiveActionsProps extends Omit<OverflowMenuProps, 'ref' | 'breakpoint'> {
  /** Indicates breakpoint at which to switch between horizontal menu and vertical dropdown */
  breakpoint?: OverflowMenuProps['breakpoint'];
  /** Custom OUIA ID */
  ouiaId?: string;
  /** Child actions to be displayed */
  children: React.ReactNode;
  /** Reference element for breakpoint calculations */
  breakpointReference?: React.RefObject<HTMLElement>;
}

const breakpoints = {
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  '2xl': 1450,
};

export const ResponsiveActions: React.FunctionComponent<ResponsiveActionsProps> = ({
  ouiaId = 'ResponsiveActions',
  breakpoint = 'lg',
  children,
  breakpointReference,
  ...props
}: ResponsiveActionsProps) => {
  const [ isOpen, setIsOpen ] = useState(false);
  const [ isBelowBreakpoint, setIsBelowBreakpoint ] = useState(false);
  const currentBreakpoint = breakpoints[breakpoint];

  useEffect(() => {
    const referenceElement = breakpointReference?.current;
    const observeSize = () => {
      const elementWidth = referenceElement?.offsetWidth || window.innerWidth;
      setIsBelowBreakpoint(elementWidth < currentBreakpoint);
    };
  
    const observer = new ResizeObserver(observeSize);
  
    if (referenceElement) {
      observer.observe(referenceElement);
    } else {
      window.addEventListener('resize', observeSize);
      observeSize();
    }
  
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', observeSize);
    };
  }, [ breakpointReference, currentBreakpoint ]);

  const persistentActions: React.ReactNode[] = [];
  const pinnedActions: React.ReactNode[] = [];
  const dropdownItems: React.ReactNode[] = [];

  React.Children.forEach(children, (child, index) => {
    if (React.isValidElement<ResponsiveActionProps>(child)) {
      const { isPersistent, isPinned, key = index, children, onClick, ...actionProps } = child.props;

      if (isPersistent || (isPinned && !isBelowBreakpoint)) {
        (isPersistent ? persistentActions : pinnedActions).push(
          <OverflowMenuItem key={key} isPersistent={isPersistent}>
            <Button onClick={onClick} ouiaId={`${ouiaId}-action-${key}`} {...actionProps}>
              {children}
            </Button>
          </OverflowMenuItem>
        );
      } else {
        dropdownItems.push(
          <OverflowMenuDropdownItem key={key} onClick={onClick} ouiaId={`${ouiaId}-action-${key}`} isDisabled={actionProps.isDisabled}>
            {children}
          </OverflowMenuDropdownItem>
        );
      }
    }
  });

  return (
    <OverflowMenu breakpoint={breakpoint} data-ouia-component-id={`${ouiaId}-menu`} {...props}>
      {persistentActions.length > 0 && (
        <OverflowMenuContent isPersistent data-ouia-component-id={`${ouiaId}-menu-persistent-content`}>
          <OverflowMenuGroup groupType="button" data-ouia-component-id={`${ouiaId}-menu-persistent-group`} isPersistent>
            {persistentActions}
          </OverflowMenuGroup>
        </OverflowMenuContent>
      )}
      {pinnedActions.length > 0 && (
        <OverflowMenuContent data-ouia-component-id={`${ouiaId}-menu-pinned-content`}>
          <OverflowMenuGroup groupType="button" data-ouia-component-id={`${ouiaId}-menu-pinned-group`}>
            {pinnedActions}
          </OverflowMenuGroup>
        </OverflowMenuContent>
      )}
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
                onClick={() => setIsOpen(!isOpen)}
                isExpanded={isOpen}
              >
                <EllipsisVIcon />
              </MenuToggle>
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
