import React from 'react';
import { Button, ButtonProps, ButtonVariant } from '@patternfly/react-core';
import { CloseIcon } from '@patternfly/react-icons';
import { createUseStyles } from 'react-jss';
import clsx from 'clsx';

const useStyles = createUseStyles({
  closeButton: {
    float: 'inline-end',
    padding: '10px 14px'
  },
});

export interface CloseButtonProps extends ButtonProps {
  /** Data test ID used for testing. */
  dataTestID?: string;
};

const CloseButton: React.FunctionComponent<CloseButtonProps> = ({
  className,
  dataTestID,
  onClick,
  ...props
}: CloseButtonProps) => {
  const classes = useStyles();
  return (
    <Button
      aria-label={props['aria-label'] || 'Close'}
      className={clsx(classes.closeButton, className)}
      data-test-id={dataTestID}
      onClick={onClick}
      variant={ButtonVariant.plain}
      {...props}
    >
      <CloseIcon />
    </Button>
  );
};

export default CloseButton;
