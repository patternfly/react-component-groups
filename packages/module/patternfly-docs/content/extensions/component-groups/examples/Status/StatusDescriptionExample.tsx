import React from 'react';
import { Status } from '@patternfly/react-component-groups/dist/dynamic/Status';
import { ExclamationTriangleIcon } from '@patternfly/react-icons/';

export const BasicExample: React.FunctionComponent = () => (
  <Status label='Warning' description='1 issue found' icon={<ExclamationTriangleIcon color='var(--pf-v5-global--warning-color--100)'/>}/>
);
