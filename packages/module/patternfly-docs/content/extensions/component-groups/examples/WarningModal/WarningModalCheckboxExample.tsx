import React from 'react';
import WarningModal from '@patternfly/react-component-groups/dist/dynamic/WarningModal';
import { Button } from '@patternfly/react-core';

export const BasicExample: React.FunctionComponent = () => {
  const [ isOpen, setIsOpen ] = React.useState(false);
  return <>
    <Button onClick={() => setIsOpen(true)}>Open modal</Button>
    <WarningModal
      isOpen={isOpen}
      title='Unsaved changes'
      onClose={() => setIsOpen(false)}
      onConfirm={() => setIsOpen(false)}
      withCheckbox={true}
      confirmCheckMessage='Are you sure?'
      dangerButtonVariant={true}
    >
      Your page contains unsaved changes. Do you want to leave?
    </WarningModal>
  </>
};
