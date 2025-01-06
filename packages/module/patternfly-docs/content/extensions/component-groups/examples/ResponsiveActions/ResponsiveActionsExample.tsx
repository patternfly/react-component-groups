import React from 'react';
import { ResponsiveAction } from '@patternfly/react-component-groups/dist/dynamic/ResponsiveAction';
import { ResponsiveActions } from '@patternfly/react-component-groups/dist/dynamic/ResponsiveActions';

export const TagCountDisabledExample: React.FunctionComponent = () => (
  <ResponsiveActions breakpoint="lg">
    <ResponsiveAction isPersistent>
        Persistent Action
    </ResponsiveAction>
    <ResponsiveAction isPinned variant='secondary'>
        Pinned Action
    </ResponsiveAction>
    <ResponsiveAction>
        Overflow Action
    </ResponsiveAction>
    <ResponsiveAction isDisabled>
        Disabled action
    </ResponsiveAction>
  </ResponsiveActions>
);
