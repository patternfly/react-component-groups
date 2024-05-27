import React from 'react';
import { Status, StatusVariant } from '@patternfly/react-component-groups/dist/dynamic/Status';
import { BanIcon } from '@patternfly/react-icons/';
import { Button, ButtonSize, ButtonVariant } from '@patternfly/react-core';

export const BasicExample: React.FunctionComponent = () => (
  <Status 
    variant={StatusVariant.popover} 
    label='Not Ready' 
    icon={<BanIcon color='var(--pf-v5-global--danger-color--100)'/>}
    popoverProps={{ 
      bodyContent: 'Example state description', 
      footerContent: <Button size={ButtonSize.sm} variant={ButtonVariant.link} isInline>Action</Button> 
    }}
  />
);
