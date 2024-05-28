import React from 'react';
import { Status, IconStatus } from '@patternfly/react-component-groups/dist/dynamic/Status';
import { ExclamationTriangleIcon } from '@patternfly/react-icons/';

export const BasicExample: React.FunctionComponent = () => (
  <Status iconOnly iconTitle='1 security issue found' status={IconStatus.warning} label='Warning' icon={<ExclamationTriangleIcon/>}/>
);
