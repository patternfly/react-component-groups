import { FunctionComponent } from 'react';
import Severity, { SeverityType } from '@patternfly/react-component-groups/dist/dynamic/Severity';

export const BasicExample: FunctionComponent = () => <Severity severity={SeverityType.critical} label="Critical" />;
