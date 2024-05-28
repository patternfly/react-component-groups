import React from 'react';
import { IconStatus, Status } from '@patternfly/react-component-groups/dist/dynamic/Status';
import { ExclamationTriangleIcon } from '@patternfly/react-icons/';

export const BasicExample: React.FunctionComponent = () => (
  <Status status={IconStatus.warning} label='Warning' description='1 issue found' icon={<ExclamationTriangleIcon/>}/>
);
