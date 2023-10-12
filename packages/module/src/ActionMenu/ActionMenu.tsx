import {
  DropdownGroupProps,
  DropdownItemProps
} from '@patternfly/react-core';
import {
  Dropdown as DropdownDeprecated,
  DropdownGroup as DropdownGroupDeprecated,
  DropdownItem as DropdownItemDeprecated,
  DropdownPosition as DropdownPositionDeprecated,
  DropdownToggle as DropdownToggleDeprecated,
  KebabToggle as KebabToggleDeprecated
} from '@patternfly/react-core/deprecated';
import { ExternalLinkAltIcon } from '@patternfly/react-icons';
import React from 'react';
import { createUseStyles } from 'react-jss'

type Never<T> = {
  [K in keyof T]?: never;
};

type EitherNotBoth<TypeA, TypeB> = (TypeA & Never<TypeB>) | (TypeB & Never<TypeA>);

export type ActionDefinition =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | { callback: (event: React.MouseEvent<any> | React.KeyboardEvent | MouseEvent) => void }
  | { href: string; external?: boolean };

export interface ActionProps extends Omit<DropdownItemProps, 'onClick' | 'innerRef' | 'action'> {
  /** Executable callback or href. External links should automatically provide an external link icon on action. */
  action: ActionDefinition;
  /** Optional tooltip for this action. */
  tooltip?: string;
  /** Optional icon for this action. */
  icon?: React.ReactNode;
};

export interface GroupedActionsProps extends Omit<DropdownGroupProps, 'children'> {
  /** A unique identifier for this group. */
  groupId: string;
  /** Actions under this group. */
  groupActions: ActionProps[];
}

export enum ActionMenuVariant {
  KEBAB = 'plain',
  DROPDOWN = 'default',
}

export interface ActionMenuOptions {
  /** Optional flag to indicate whether action menu should be disabled */
  isDisabled?: boolean;
  /** Optional variant for action menu: DROPDOWN vs KEBAB (defaults to dropdown) */
  variant?: ActionMenuVariant;
  /** Optional label for action menu (defaults to 'Actions') */
  label?: string;
  /** Optional position (left/right) at which the action menu appears (defaults to right) */
  position?: DropdownPositionDeprecated;
  /** Optional flag to indicate whether labels should appear to the left of icons for the action menu items (icon appears after the label by default) */
  displayLabelBeforeIcon?: boolean;
  /** Optional id for action menu (defaults to 'actions') */
  id?: string;
};

export type ActionMenuProps = EitherNotBoth<
  { actions: ActionProps[] },
  { groupedActions: GroupedActionsProps[] }
> &
  ActionMenuOptions;

const useStyles = createUseStyles({
  menuItemWithLabelBeforeIcon: {
    '&.pf-v5-c-dropdown__menu-item': {
      flexDirection: 'row-reverse',
      justifyContent: 'left'
    },
    '.pf-v5-c-dropdown__menu-item-icon': {
      marginLeft: 'var(--pf-v5-c-dropdown__menu-item-icon--MarginRight)'
    },
    '.pf-v5-c-dropdown__menu-item-main': {
      flexDirection: 'row-reverse',
    }
  }
});

export const ActionMenu: React.FunctionComponent<ActionMenuProps> = ({  // replace deprecated
  // pass custom action item
  actions = [],
  groupedActions = [],
  isDisabled,
  variant = ActionMenuVariant.DROPDOWN,
  label = 'Actions',
  position = DropdownPositionDeprecated.right,
  displayLabelBeforeIcon,
  id = 'actions',
}: ActionMenuProps) => {
  const [ isOpen, setIsOpen ] = React.useState(false);

  const classes = useStyles();

  const isGrouped = groupedActions.length > 0;

  /** Returns a DropDownItem element corresponding to an action */
  const dropdownActionItem = React.useCallback(
    (item: ActionProps) => {
      const externalIcon =
        'href' in item.action &&
          'external' in item.action &&
          item.action.href &&
          item.action.external ? (
            <ExternalLinkAltIcon />
          ) : null;
      const icon = item.icon ?? externalIcon;
      const href = 'href' in item.action ? item.action.href : undefined;
      const onClick =
        'callback' in item.action && item.action.callback ? item.action.callback : undefined;
      return (
        <DropdownItemDeprecated   // use new dropdown
          className={displayLabelBeforeIcon ? classes.menuItemWithLabelBeforeIcon : ''}
          description={item.description}
          isDisabled={item.isDisabled}
          itemID={item.itemID}
          onClick={onClick}
          href={href}
          tooltip={item.tooltip}
          icon={icon}
          key={item.itemID}
        >
          {item.children}
        </DropdownItemDeprecated>
      );
    },
    [ classes.menuItemWithLabelBeforeIcon, displayLabelBeforeIcon ],
  );

  const dropdownActionItems = React.useMemo(() => {
    let ddActionItems: JSX.Element[] = [];
    if (actions.length > 0) {
      ddActionItems = actions.map((action: ActionProps) => dropdownActionItem(action as ActionProps));
    }
    if (isGrouped) {
      ddActionItems = groupedActions.map((action: GroupedActionsProps) => (
        <DropdownGroupDeprecated label={action?.label} key={action.groupId}>
          {action.groupActions.map((groupAction: ActionProps) => dropdownActionItem(groupAction))}
        </DropdownGroupDeprecated>
      ))
    }
    return ddActionItems;
  }, [ actions, dropdownActionItem, isGrouped, groupedActions ]);

  const onToggle = (_event: unknown, open: boolean) => {
    setIsOpen(open);
  };

  const onFocus = () => {
    const element = document.getElementById(`toggle-menu-${id}`);
    if (element) {
      element.focus();
    }
  };

  const onSelect = () => {
    setIsOpen(false);
    onFocus();
  };

  // Build dropdown
  return (
    <DropdownDeprecated
      onSelect={onSelect}
      position={position}
      toggle={
        variant === ActionMenuVariant.DROPDOWN ? (
          <DropdownToggleDeprecated id={`toggle-menu-${id}`} onToggle={onToggle} isDisabled={isDisabled}>
            {label}
          </DropdownToggleDeprecated>
        ) : (
          <KebabToggleDeprecated id={`toggle-menu-${id}`} onToggle={onToggle} isDisabled={isDisabled} />
        )
      }
      isOpen={isOpen}
      dropdownItems={dropdownActionItems}
      isGrouped={isGrouped}
    />
  );
};

export default ActionMenu;
