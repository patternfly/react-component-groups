import { Tooltip, TooltipPosition, TooltipProps } from '@patternfly/react-core';
import React from 'react';

export interface LongTextTooltipProps extends Omit<TooltipProps, 'content'> {
  /** Content to display in the tool tip */
  content?: string;
  /** Maximum length of the content being displayed in pixels */
  maxLength?: number;
  /** Position of the tooltip */
  tooltipPosition?: TooltipPosition;
  /** Maximum width of the tooltip */
  tooltipMaxWidth?: string;
}

const LongTextTooltip: React.FC<LongTextTooltipProps> = ({
  content = '',
  maxLength = Infinity,
  tooltipMaxWidth = '50vw',
  tooltipPosition = TooltipPosition.top,
  ...rest
}) => {
  const truncate = (str: string, max: number) => (str.length > max ? str.substr(0, max - 1) + '…' : str);

  return content.length > maxLength ? (
    <Tooltip maxWidth={tooltipMaxWidth} position={tooltipPosition} content={<div>{content}</div>} {...rest}>
      <div>{truncate(content, maxLength)}</div>
    </Tooltip>
  ) : (
    <span>{content}</span>
  );
};

export default LongTextTooltip;
