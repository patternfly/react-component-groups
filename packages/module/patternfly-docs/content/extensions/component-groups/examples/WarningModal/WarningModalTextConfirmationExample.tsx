import React from 'react';
import WarningModal from '@patternfly/react-component-groups/dist/dynamic/WarningModal';
import { Button } from '@patternfly/react-core';

export const BasicExample: React.FunctionComponent = () => {
  const [ isOpen, setIsOpen ] = React.useState(false);
  return <>
    <Button onClick={() => setIsOpen(true)}>Open modal</Button>
    <WarningModal
      isOpen={isOpen}
      title='Delete item?'
      confirmButtonLabel='Yes'
      cancelButtonLabel='No'
      onClose={() => setIsOpen(false)}
      onConfirm={() => setIsOpen(false)}
      confirmationInputProps={{ type: 'text', isRequired: true }}
      confirmationText='Item1'>
      The item will be deleted.
    </WarningModal>
  </>
};
