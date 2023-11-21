import {
  Dropdown,
  DropdownGroup,
  DropdownGroupProps,
  DropdownItem,
  DropdownItemProps,
  DropdownList,
  DropdownPopperProps,
  MenuToggle,
  MenuToggleElement,
} from '@patternfly/react-core';
import { EllipsisVIcon } from '@patternfly/react-icons';
import React from 'react';

type Never<T> = {
  [K in keyof T]?: never;
};

type EitherNotBoth<TypeA, TypeB> = (TypeA & Never<TypeB>) | (TypeB & Never<TypeA>);


export type ActionProps = Omit<DropdownItemProps, 'innerRef'>
export interface GroupedActionsProps extends Omit<DropdownGroupProps, 'children'> {
  /** A unique identifier for this group. */
  groupId: string;
  /** Actions under this group. */
  actions: ActionProps[];
};

export enum ActionMenuVariant {
  KEBAB = 'plain',
  DROPDOWN = 'default',
};

export interface ActionMenuOptions {
  /** Optional flag to indicate whether action menu should be disabled */
  isDisabled?: boolean;
  /** Optional variant for action menu: DROPDOWN vs KEBAB (defaults to dropdown) */
  variant?: ActionMenuVariant;
  /** Optional label for action menu (defaults to 'Actions') */
  label?: string;
  /** Optional popper props */
  popperProps?: DropdownPopperProps;
  /** Optional id for action menu (defaults to 'actions') */
  id?: string;
};

export type ActionMenuProps = EitherNotBoth<
  { actions: ActionProps[] },
  { groupedActions: GroupedActionsProps[] }
> &
  ActionMenuOptions;

export const ActionMenu: React.FunctionComponent<ActionMenuProps> = ({  // replace deprecated
  actions = [],
  groupedActions = [],
  isDisabled,
  variant = ActionMenuVariant.DROPDOWN,
  label = 'Actions',
  popperProps,
  id = 'actions',
}: ActionMenuProps) => {
  const [ isOpen, setIsOpen ] = React.useState(false);

  const onToggle = () => setIsOpen(!isOpen);

  const onFocus = () => {
    const element = document.getElementById(`toggle-menu-${id}`);
    if (element) {
      element.focus();
    };
  };

  const onSelect = () => {
    setIsOpen(false);
    onFocus();
  };

  return (
    <Dropdown
      isOpen={isOpen}
      onSelect={onSelect}
      popperProps={popperProps}
      toggle={
        (toggleRef: React.Ref<MenuToggleElement>) => 
          <MenuToggle ref={toggleRef} id={`toggle-menu-${id}`} onClick={onToggle} isDisabled={isDisabled} variant={variant} isExpanded={isOpen}>
            {variant === ActionMenuVariant.DROPDOWN ? label : <EllipsisVIcon />}
          </MenuToggle>   
      }
    >
      {actions.length > 0 ?
        <DropdownList>
          {actions.map((action: ActionProps) => 
            <DropdownItem
              {...action}
              description={action.description}
              isDisabled={action.isDisabled}
              value={action.itemId}
              onClick={action.onClick}
              tooltipProps={action.tooltipProps}
              key={action.itemId}
            >
              {action.children}
            </DropdownItem>
          )}
        </DropdownList> : null
      }
      {
        groupedActions?.map((action: GroupedActionsProps) => (
          <DropdownGroup label={action?.label} key={action.groupId}>
            <DropdownList>
              {action.actions.map((action: ActionProps) => 
                <DropdownItem
                  {...action}
                  description={action.description}
                  isDisabled={action.isDisabled}
                  value={action.itemId}
                  onClick={action.onClick}
                  tooltipProps={action.tooltipProps}
                  key={action.itemId}
                >
                  {action.children}
                </DropdownItem>
              )}
            </DropdownList>
          </DropdownGroup>
        ))
      }
    </Dropdown>
  );
};

export default ActionMenu;
