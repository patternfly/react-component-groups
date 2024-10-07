import React from 'react';
import { ButtonProps } from '@patternfly/react-core';

export interface ResponsiveActionProps extends ButtonProps {
  /** Determines whether the action should be displayed next to dropdown if possible */
  isPinned?: boolean;
  /** Determines whether the action should always be displayed as pinned */
  isPersistent?: boolean;
  /** Key for the action */
  key?: string;
  /** Action label */
  children: React.ReactNode;
};

// This component is only used declaratively - rendering ishandled by ResponsiveActions
export const ResponsiveAction: React.FunctionComponent<ResponsiveActionProps> = (_props: ResponsiveActionProps) => null;

export default ResponsiveAction;