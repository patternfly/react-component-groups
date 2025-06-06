import { FunctionComponent, useState } from 'react';
import WarningModal from '@patternfly/react-component-groups/dist/dynamic/WarningModal';
import { Button, ButtonVariant } from '@patternfly/react-core';

export const BasicExample: FunctionComponent = () => {
  const [ isOpen, setIsOpen ] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open modal</Button>
      <WarningModal
        isOpen={isOpen}
        title="Unsaved changes"
        confirmButtonVariant={ButtonVariant.danger}
        onClose={() => setIsOpen(false)}
        onConfirm={() => setIsOpen(false)}
      >
        Your page contains unsaved changes. Do you want to leave?
      </WarningModal>
    </>
  );
};
