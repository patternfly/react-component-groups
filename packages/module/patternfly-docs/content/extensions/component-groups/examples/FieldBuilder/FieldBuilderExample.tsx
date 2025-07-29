import React, { useState } from 'react';
import {
  Form,
  TextInput,
} from '@patternfly/react-core';
import { FieldBuilder } from '@patternfly/react-component-groups/dist/dynamic/FieldBuilder';

interface Contact {
  name: string;
  email: string;
}

export const FieldBuilderExample: React.FunctionComponent = () => {
  const [ contacts, setContacts ] = useState<Contact[]>([
    { name: '', email: '' }
  ]);

  // Handle adding a new contact row
  const handleAddContact = () => {
    setContacts([ ...contacts, { name: '', email: '' } ]);
  };

  // Handle removing a contact row
  const handleRemoveContact = (index: number) => {
    setContacts(contacts.filter((_, i) => i !== index));
  };

  // Handle updating contact data
  const handleContactChange = (index: number, field: keyof Contact, value: string) => {
    const updatedContacts = [ ...contacts ];
    updatedContacts[index] = { ...updatedContacts[index], [field]: value };
    setContacts(updatedContacts);
  };

  return (
    <Form>
      <FieldBuilder
        label=""
        labelInfo=""
        isRequired
        firstColumnLabel="Name"
        secondColumnLabel="Email"
        rowCount={contacts.length}
        onAddRow={handleAddContact}
        onRemoveRow={handleRemoveContact}
        addButtonProps={{
          children: 'Add team member'
        }}
      >
        {({ rowIndex, focusRef, firstColumnAriaLabelledBy, secondColumnAriaLabelledBy }) => [
          <TextInput
            key="name"
            ref={focusRef}
            type="text"
            value={contacts[rowIndex]?.name || ''}
            placeholder="Enter full name"
            onChange={(_event, value) => handleContactChange(rowIndex, 'name', value)}
            aria-labelledby={firstColumnAriaLabelledBy}
            isRequired
          />,
          <TextInput
            key="email"
            type="email"
            value={contacts[rowIndex]?.email || ''}
            placeholder="name@example.com"
            onChange={(_event, value) => handleContactChange(rowIndex, 'email', value)}
            aria-labelledby={secondColumnAriaLabelledBy}
            isRequired
          />
        ]}
      </FieldBuilder>
    </Form>
  );
};

export default FieldBuilderExample;
