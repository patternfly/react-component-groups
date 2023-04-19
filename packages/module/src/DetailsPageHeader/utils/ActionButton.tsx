import { Button, ButtonProps, Tooltip, TooltipProps } from '@patternfly/react-core';
import React from 'react';

interface ActionButtonTooltipProps {
  /** Content for the action button tooltip */
  tooltip?: React.ReactNode;
  /** ID for the action button tooltip */
  tooltipId?: TooltipProps['id'];
  /** Position of the action button tooltip */
  tooltipPosition?: TooltipProps['position'];
}

export interface ActionButtonProps extends ButtonProps, ActionButtonTooltipProps {};

export const ActionButton: React.FunctionComponent<ActionButtonProps> = ({
  tooltip,
  tooltipId,
  tooltipPosition,
  ...buttonProps
}: ActionButtonProps) => {
  const tooltipRef = React.useRef();
  return (
    <>
      <Button
        {...buttonProps}
        innerRef={tooltipRef}
        aria-describedby={tooltipId}
      >
        {buttonProps.children}
      </Button>
      {tooltip ? <Tooltip content={tooltip} reference={tooltipRef} id={tooltipId} position={tooltipPosition} /> : null}
    </>
  );
};

export default ActionButton;
