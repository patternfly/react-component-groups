import {
  Dropdown,
  DropdownGroup,
  DropdownGroupProps,
  DropdownItem,
  DropdownItemProps,
  DropdownPosition,
  DropdownToggle,
  KebabToggle,
} from '@patternfly/react-core';
import { ExternalLinkAltIcon } from '@patternfly/react-icons';
import React from 'react';
import { createUseStyles } from 'react-jss'

// Duplicated from @openshift/dynamic-plugin-sdk
type Never<T> = {
  [K in keyof T]?: never;
};

// Duplicated from @openshift/dynamic-plugin-sdk
type EitherNotBoth<TypeA, TypeB> = (TypeA & Never<TypeB>) | (TypeB & Never<TypeA>);

export type ActionCTA =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | { callback: (event: React.MouseEvent<any> | React.KeyboardEvent | MouseEvent) => void }
  | { href: string; external?: boolean };

export interface ActionProps extends Omit<DropdownItemProps, 'onClick'|'innerRef'> {
  /** Executable callback or href. External links should automatically provide an external link icon on action. */
  cta: ActionCTA;
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
  position?: DropdownPosition;
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
    '&.pf-c-dropdown__menu-item': {
      flexDirection: 'row-reverse',
      justifyContent: 'left'
    },
    '.pf-c-dropdown__menu-item-icon': {
      marginLeft: 'var(--pf-c-dropdown__menu-item-icon--MarginRight)'
    },
    '.pf-c-dropdown__menu-item-main': {
      flexDirection: 'row-reverse',
    }
  }
});

export const ActionMenu: React.FunctionComponent<ActionMenuProps> = ({
  actions = [],
  groupedActions = [],
  isDisabled,
  variant = ActionMenuVariant.DROPDOWN,
  label = 'Actions',
  position = DropdownPosition.right,
  displayLabelBeforeIcon,
  id = 'actions',
}: ActionMenuProps) => {
  const [ isOpen, setIsOpen ] = React.useState(false);

  const classes = useStyles();

  const isGrouped = groupedActions.length > 0;

  /** Returns a DropDownItem element corresponding to an action */
  const dropdownActionItem = React.useCallback(
    (action: ActionProps) => {
      const externalIcon =
        'href' in action.cta &&
        'external' in action.cta &&
        action.cta.href &&
        action.cta.external ? (
            <ExternalLinkAltIcon />
          ) : null;
      const icon = action.icon ?? externalIcon;
      const href = 'href' in action.cta ? action.cta.href : undefined;
      const onClick =
        'callback' in action.cta && action.cta.callback ? action.cta.callback : undefined;
      return (
        <DropdownItem
          className={displayLabelBeforeIcon ? classes.menuItemWithLabelBeforeIcon : ''}
          description={action.description}
          isDisabled={action.isDisabled}
          itemID={action.itemID}
          onClick={onClick}
          href={href}
          tooltip={action.tooltip}
          icon={icon}
          key={action.itemID}
        >
          {action.children}
        </DropdownItem>
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
        <DropdownGroup label={action?.label} key={action.groupId}>
          {action.groupActions.map((groupAction: ActionProps) => dropdownActionItem(groupAction))}
        </DropdownGroup>
      ))
    }
    return ddActionItems;
  }, [ actions, dropdownActionItem, isGrouped, groupedActions ]);

  const onToggle = (open: boolean) => {
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
    <Dropdown
      onSelect={onSelect}
      position={position}
      toggle={
        variant === ActionMenuVariant.DROPDOWN ? (
          <DropdownToggle id={`toggle-menu-${id}`} onToggle={onToggle} isDisabled={isDisabled}>
            {label}
          </DropdownToggle>
        ) : (
          <KebabToggle id={`toggle-menu-${id}`} onToggle={onToggle} isDisabled={isDisabled} />
        )
      }
      isOpen={isOpen}
      dropdownItems={dropdownActionItems}
      isGrouped={isGrouped}
    />
  );
};

export default ActionMenu;
