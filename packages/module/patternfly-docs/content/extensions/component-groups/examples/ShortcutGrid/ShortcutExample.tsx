import { FunctionComponent } from 'react';
import Shortcut from '@patternfly/react-component-groups/dist/dynamic/Shortcut';

export const BasicExample: FunctionComponent = () => (
  <Shortcut description="Shortcut description" keys={[ 'cmd', 'shift' ]} click />
);
