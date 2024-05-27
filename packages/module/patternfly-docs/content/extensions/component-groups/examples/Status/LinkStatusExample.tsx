import React from 'react';
import { Status, StatusVariant } from '@patternfly/react-component-groups/dist/dynamic/Status';
import { CheckCircleIcon } from '@patternfly/react-icons/';

export const BasicExample: React.FunctionComponent = () => (
  // eslint-disable-next-line no-console
  <Status variant={StatusVariant.link} label='Ready' onClick={() => console.log('Link status clicked')} icon={<CheckCircleIcon color='var(--pf-v5-global--success-color--100)'/>}/>
);
