import { FunctionComponent } from 'react';
import ErrorState from '@patternfly/react-component-groups/dist/dynamic/ErrorState';

export const BasicExample: FunctionComponent = () => (
  <ErrorState titleText="Sample error title" bodyText="Sample error description" />
);
