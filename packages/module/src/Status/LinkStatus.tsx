import * as React from 'react';
import { Button } from '@patternfly/react-core';
import { StatusIconAndText } from '@openshift-console/dynamic-plugin-sdk';

const LinkStatus: React.FC<LinkStatusProps> = ({ linkTitle, ...other }) =>
  <Button variant="link" title={linkTitle}>
    <StatusIconAndText {...other} />
  </Button>

export interface LinkStatusProps extends React.ComponentProps<typeof StatusIconAndText> {
  linkTitle?: string;
};

export default LinkStatus;
