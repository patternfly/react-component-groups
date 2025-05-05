import { FunctionComponent } from 'react';
import { IconStatus, Status, StatusVariant } from '@patternfly/react-component-groups/dist/dynamic/Status';
import { CheckCircleIcon } from '@patternfly/react-icons/';

export const BasicExample: FunctionComponent = () => (
  <Status
    variant={StatusVariant.link}
    status={IconStatus.success}
    label="Ready"
    // eslint-disable-next-line no-console
    onClick={() => console.log('Link status clicked')}
    icon={<CheckCircleIcon />}
  />
);
