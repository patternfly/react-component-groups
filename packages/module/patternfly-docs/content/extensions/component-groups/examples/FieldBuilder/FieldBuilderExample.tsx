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
  const handleAddContact = (event: React.MouseEvent) => {
    // eslint-disable-next-line no-console
    console.log('Add button clicked:', event.currentTarget);
    const newContacts = [ ...contacts, { name: '', email: '' } ];
    setContacts(newContacts);
  };

  // Handle removing a contact row
  const handleRemoveContact = (event: React.MouseEvent, index: number) => {
    // eslint-disable-next-line no-console
    console.log('Remove button clicked:', event.currentTarget, 'for index:', index);
    const newContacts = contacts.filter((_, i) => i !== index);
    setContacts(newContacts);
  };

  // Handle updating contact data
  const handleContactChange = (index: number, field: keyof Contact, value: string) => {
    const updatedContacts = [ ...contacts ];
    updatedContacts[index] = { ...updatedContacts[index], [field]: value };
    setContacts(updatedContacts);
  };

  // Custom announcement for adding rows
  const customAddAnnouncement = (rowNumber: number, rowGroupLabelPrefix: string) => `New ${rowGroupLabelPrefix.toLowerCase()} ${rowNumber} added.`;

  // Custom announcement for removing rows
  const customRemoveAnnouncement = (rowNumber: number, rowGroupLabelPrefix: string) => {
    const removedIndex = rowNumber - 1;
    const removedContact = contacts[removedIndex];
    if (removedContact?.name) {
      return `Removed ${rowGroupLabelPrefix.toLowerCase()} ${removedContact.name}.`;
    }
    return `${rowGroupLabelPrefix} ${rowNumber} removed.`;
  };

  // Custom aria-label for remove buttons
  const customRemoveAriaLabel = (rowNumber: number, rowGroupLabelPrefix: string) => {
    const contactIndex = rowNumber - 1;
    const contact = contacts[contactIndex];
    if (contact?.name) {
      return `Remove ${rowGroupLabelPrefix.toLowerCase()} ${contact.name}`;
    }
    return `Remove ${rowGroupLabelPrefix.toLowerCase()} in row ${rowNumber}`;
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
        onAddRowAnnouncement={customAddAnnouncement}
        onRemoveRowAnnouncement={customRemoveAnnouncement}
        removeButtonAriaLabel={customRemoveAriaLabel}
        addButtonContent="Add contact"
      >
        {({ focusRef, firstColumnAriaLabel, secondColumnAriaLabel }, index) => [
          <TextInput
            key="name"
            ref={focusRef}
            type="text"
            value={contacts[index]?.name || ''}
            placeholder="Enter full name"
            onChange={(_event, value) => handleContactChange(index, 'name', value)}
            aria-label={firstColumnAriaLabel}
            isRequired
          />,
          <TextInput
            key="email"
            type="email"
            value={contacts[index]?.email || ''}
            placeholder="name@example.com"
            onChange={(_event, value) => handleContactChange(index, 'email', value)}
            aria-label={secondColumnAriaLabel}
            isRequired
          />
        ]}
      </FieldBuilder>
    </Form>
  );
};

export default FieldBuilderExample;
