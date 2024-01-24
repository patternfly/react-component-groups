import React from 'react';
import RemoveModal from '@patternfly/react-component-groups/dist/dynamic/RemoveModal';
import { Button } from '@patternfly/react-core';

export const BasicExample: React.FunctionComponent = () => {
  const [ isOpen, setIsOpen ] = React.useState(false);
  return <>
    <Button onClick={() => setIsOpen(true)}>Open modal</Button>
    <RemoveModal
      isOpen={isOpen}
      title='Remove Item?'
      confirmButtonLabel='Yup'
      onClose={() => setIsOpen(false)}
      onSubmit={() => setIsOpen(false)}
      confirmCheckMessage='checked'
    >
      Do you want to remove this item?
    </RemoveModal>
  </>
  
}