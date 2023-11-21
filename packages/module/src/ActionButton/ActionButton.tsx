import { Button, ButtonProps, Tooltip, TooltipProps } from '@patternfly/react-core';
import React from 'react';

export interface ActionButtonProps extends Omit<ButtonProps, 'innerRef'> {
  /** Content for the action button tooltip */
  tooltip?: React.ReactNode;
  /** Tooltip props */
  tooltipProps?: Omit<TooltipProps, 'triggerRef'>;
};

export const ActionButton: React.FunctionComponent<ActionButtonProps> = ({
  tooltipProps,
  ...buttonProps
}: ActionButtonProps) => {
  const tooltipRef = React.useRef();
  return (
    <>
      <Button
        aria-describedby={tooltipProps?.id}
        innerRef={tooltipRef}
        {...buttonProps}
      />
      {tooltipProps ? <Tooltip {...tooltipProps} triggerRef={tooltipRef} /> : null}
    </>
  );
};

export default ActionButton;
