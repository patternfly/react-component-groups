import React from 'react';
import { IconStatus, Status, StatusVariant } from '@patternfly/react-component-groups/dist/dynamic/Status';
import { CheckCircleIcon } from '@patternfly/react-icons/';

export const BasicExample: React.FunctionComponent = () => (
  // eslint-disable-next-line no-console
  <Status variant={StatusVariant.link} status={IconStatus.success} label='Ready' onClick={() => console.log('Link status clicked')} icon={<CheckCircleIcon/>}/>
);
