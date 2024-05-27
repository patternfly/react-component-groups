import * as React from 'react';
import clsx from 'clsx';
import { Button, ButtonVariant, Flex, FlexItem, Popover, PopoverPosition, PopoverProps, Text, TextVariants, } from '@patternfly/react-core';
import { createUseStyles } from 'react-jss';

export const StatusVariant = {
  link: 'link',
  popover: 'popover',
  plain: 'plain'
} as const;

export type StatusVariant = typeof StatusVariant[keyof typeof StatusVariant];

export interface StatusProps extends React.PropsWithChildren {
  /** Status label text */
  label?: string;
  /** Description to be displayed under the label */
  description?: string;
  /** If true, only displays icon */
  iconOnly?: boolean;
  /** Variant of the status component to be displayed */
  variant?: StatusVariant;
  /** Status icon */
  icon?: React.ReactElement;
  /** Custom OUIA ID */
  ouiaId?: string | number;
  /** Props for the optional popover */
  popoverProps?: PopoverProps,
  /** Optional link variant onClick callback */
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

const useStyles = createUseStyles({
  icon: {
    margin: 0
  },
  statusLabel: {
    lineHeight: 'var(--pf-v5-global--LineHeight--sm)',
  },
  statusDescription: {
    color: 'var(--pf-v5-c-content--small--Color)',
  } 
})

export const Status: React.FC<StatusProps> = ({ variant = StatusVariant.plain, label, children, iconOnly, icon, ouiaId = 'Status', popoverProps, onClick, description, ...props }: StatusProps) => {
  const classes = useStyles();

  const statusBody = (
    <Flex title={label} alignItems={{ default: 'alignItemsCenter' }} {...props}>
      { icon && (
        <FlexItem className={classes.icon}>
          {React.cloneElement(icon, { className: clsx('pf-v5-u-mr-md', icon?.props?.className), title: label, 'data-ouia-component-id': `${ouiaId}-icon` })}
        </FlexItem>
      )}
      { !iconOnly && (
        <FlexItem>
          <Text ouiaId={`${ouiaId}-label`} className={classes.statusLabel}>{label}</Text>
          <Text component={TextVariants.small} ouiaId={`${ouiaId}-description`} className={classes.statusDescription}>{description}</Text>
        </FlexItem>
      )}
    </Flex>
  );

  if (variant === StatusVariant.link) {
    return ( 
      <Button variant={ButtonVariant.link} title={label} onClick={onClick} ouiaId={`${ouiaId}-link-icon`}>
        {statusBody}
      </Button>
    );
  }

  if (variant === StatusVariant.popover) {
    return (
      <Popover
        position={PopoverPosition.right}
        headerContent={label}
        bodyContent={children}
        aria-label={label}
        data-ouia-component-id={`${ouiaId}-popover`}
        {...popoverProps}
      >
        <Button variant={ButtonVariant.link} isInline style={{ textDecoration: 'none' }} ouiaId={`${ouiaId}-popover-icon`}>
          {statusBody}
        </Button>
      </Popover>
    )
  };

  return statusBody
};

export default Status;
