import type { FunctionComponent } from 'react';
import { ButtonProps } from '@patternfly/react-core';

/** extends ButtonProps */
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
export const ResponsiveAction: FunctionComponent<ResponsiveActionProps> = (_props: ResponsiveActionProps) => <div/>;

export default ResponsiveAction;