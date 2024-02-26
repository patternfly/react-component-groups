import React from 'react';
import WarningModal from '@patternfly/react-component-groups/dist/dynamic/WarningModal';
import { Button, ButtonVariant } from '@patternfly/react-core';

export const BasicExample: React.FunctionComponent = () => {
  const [ isOpen, setIsOpen ] = React.useState(false);
  return <>
    <Button onClick={() => setIsOpen(true)}>Open modal</Button>
    <WarningModal
      isOpen={isOpen}
      title='Unsaved changes'
      onClose={() => setIsOpen(false)}
      onConfirm={() => setIsOpen(false)}
      withCheckbox
      checkboxLabel='Are you sure?'
      confirmButtonVariant={ButtonVariant.danger}
    >
      Your page contains unsaved changes. Do you want to leave?
    </WarningModal>
  </>
};
