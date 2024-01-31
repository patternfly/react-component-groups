import React from 'react';
import { Button, ButtonProps, ButtonVariant } from '@patternfly/react-core';
import { CloseIcon } from '@patternfly/react-icons';
import clsx from 'clsx';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  '& float-right': {
    float: 'right'
  },
  '&  no-padding': {
    padding: 0
  }
});

export interface CloseButtonProps extends ButtonProps {
  /** Additional styling to apply to the close button. */
  additionalClassName?: string;
  /** Aria label for accessibility */
  ariaLabel?: string;
  /** Data test id used for testing. */
  dataTestID?: string;
  /** Callback when the button is clicked*/
  onClick: (event: any) => void;
}

const CloseButton: React.FunctionComponent<CloseButtonProps> = ({
  additionalClassName,
  ariaLabel,
  dataTestID,
  onClick,
  ...props
}: CloseButtonProps) => {
  const classes = useStyles();
  return (
    <Button
      aria-label={ariaLabel || 'Close'}
      className={clsx(classes, additionalClassName)}
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
