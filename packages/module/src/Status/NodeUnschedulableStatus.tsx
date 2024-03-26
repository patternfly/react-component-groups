import * as React from 'react';
import { WarningStatus } from './statuses';

export interface StatusComponentProps {
  title?: string;
  iconOnly?: boolean;
  noTooltip?: boolean;
  className?: string;
  popoverTitle?: string;
};

const NodeUnschedulableStatus: React.FC<NodeUnschedulableStatusProps> = ({
  status,
  title,
  iconOnly,
  noTooltip,
  className,
}) => {
  const statusProps = { title: title || status, iconOnly, noTooltip, className };
  return <WarningStatus {...statusProps} />;
};

export interface NodeUnschedulableStatusProps extends StatusComponentProps {
  status: string;
};

export default NodeUnschedulableStatus;
