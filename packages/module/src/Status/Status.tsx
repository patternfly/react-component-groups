import * as React from 'react';  
import { StatusComponent as Status } from './StatusCompnent';

export interface StatusIconProps {
  status: string;
};

export const StatusIcon: React.FC<StatusIconProps> = ({ status }) => (
  <Status status={status} iconOnly />
);