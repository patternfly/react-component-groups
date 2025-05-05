import type { FunctionComponent } from 'react';
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

/** extends ButtonProps */
export interface CloseButtonProps extends ButtonProps {
  /** Data test ID used for testing. */
  dataTestID?: string;
};

export const CloseButton: FunctionComponent<CloseButtonProps> = ({
  className,
  dataTestID,
  onClick,
  ouiaId="CloseButton",
  ...props
}: CloseButtonProps) => {
  const classes = useStyles();
  return (
    <Button icon={<CloseIcon />}
      aria-label={props['aria-label'] || 'Close'}
      className={clsx(classes.closeButton, className)}
      data-test-id={dataTestID}
      onClick={onClick}
      variant={ButtonVariant.plain}
      ouiaId={ouiaId}
      {...props}
    />
  );
};

export default CloseButton;
