import React, { useState } from 'react';
import {
  Form,
  FormSelect,
  FormSelectOption,
} from '@patternfly/react-core';
import { FieldBuilder } from '@patternfly/react-component-groups/dist/dynamic/FieldBuilder';

interface TeamMember {
  department: string;
  role: string;
}

export const FieldBuilderSelectExample: React.FunctionComponent = () => {
  const [ teamMembers, setTeamMembers ] = useState<TeamMember[]>([
    { department: '', role: '' }
  ]);

  // Handle adding a new team member row
  const handleAddTeamMember = (event: React.MouseEvent) => {
    // eslint-disable-next-line no-console
    console.log('Add button clicked:', event.currentTarget);
    const newTeamMembers = [ ...teamMembers, { department: '', role: '' } ];
    setTeamMembers(newTeamMembers);
    
    // Focus management: focus the first field of the new row
    setTimeout(() => {
      const newRowNumber = newTeamMembers.length;
      const newRowFirstSelect = document.querySelector(`select[aria-label*="Team member ${newRowNumber}"][aria-label*="Department"]`) as HTMLSelectElement;
      if (newRowFirstSelect) {
        newRowFirstSelect.focus();
      }
    }, 100);
  };

  // Handle removing a team member row
  const handleRemoveTeamMember = (event: React.MouseEvent, index: number) => {
    // eslint-disable-next-line no-console
    console.log('Remove button clicked:', event.currentTarget, 'for index:', index);
    const newTeamMembers = teamMembers.filter((_, i) => i !== index);
    setTeamMembers(newTeamMembers);
    
    // Focus management: avoid focusing on destructive actions
    setTimeout(() => {
      // If there are still team members after removal
      if (newTeamMembers.length > 0) {
        // If we removed the last row, focus the new last row's first select
        if (index >= newTeamMembers.length) {
          const newLastRowIndex = newTeamMembers.length;
          const previousRowFirstSelect = document.querySelector(`select[aria-label*="Team member ${newLastRowIndex}"][aria-label*="Department"]`) as HTMLSelectElement;
          if (previousRowFirstSelect) {
            previousRowFirstSelect.focus();
          }
        } else {
          // If we removed a middle row, focus the first select of the row that took its place
          const newRowNumber = index + 1;
          const sameIndexFirstSelect = document.querySelector(`select[aria-label*="Team member ${newRowNumber}"][aria-label*="Department"]`) as HTMLSelectElement;
          if (sameIndexFirstSelect) {
            sameIndexFirstSelect.focus();
          }
        }
      } else {
        // If this was the last team member, focus the add button
        const addButton = document.querySelector('button[aria-label*="Add"]') as HTMLButtonElement;
        if (addButton) {
          addButton.focus();
        }
      }
    }, 100);
  };

  // Handle updating team member data
  const handleTeamMemberChange = (index: number, field: keyof TeamMember, value: string) => {
    const updatedTeamMembers = [ ...teamMembers ];
    updatedTeamMembers[index] = { ...updatedTeamMembers[index], [field]: value };
    setTeamMembers(updatedTeamMembers);
  };

  // Custom announcement for adding rows
  const customAddAnnouncement = (rowNumber: number, rowGroupLabelPrefix: string) => `New ${rowGroupLabelPrefix.toLowerCase()} ${rowNumber} added.`;

  // Custom announcement for removing rows
  const customRemoveAnnouncement = (rowNumber: number, rowGroupLabelPrefix: string) => {
    const removedIndex = rowNumber - 1;
    const removedTeamMember = teamMembers[removedIndex];
    if (removedTeamMember?.department && removedTeamMember?.role) {
      return `Removed ${rowGroupLabelPrefix.toLowerCase()} ${removedTeamMember.role} from ${removedTeamMember.department}.`;
    }
    return `${rowGroupLabelPrefix} ${rowNumber} removed.`;
  };

  // Custom aria-label for remove buttons
  const customRemoveAriaLabel = (rowNumber: number, rowGroupLabelPrefix: string) => {
    const teamMemberIndex = rowNumber - 1;
    const teamMember = teamMembers[teamMemberIndex];
    if (teamMember?.department && teamMember?.role) {
      return `Remove ${rowGroupLabelPrefix.toLowerCase()} ${teamMember.role} from ${teamMember.department}`;
    }
    return `Remove ${rowGroupLabelPrefix.toLowerCase()} in row ${rowNumber}`;
  };

  // Create a ref callback that works with FormSelect
  const createFormSelectRef = (focusRef: (element: HTMLElement | null) => void) => 
    (instance: React.ComponentRef<typeof FormSelect> | HTMLElement | null) => {
      if (instance) {
        // Get the underlying DOM element from the FormSelect instance
        const domElement = (instance as any)?.ref?.current || instance;
        if (domElement instanceof HTMLElement) {
          focusRef(domElement);
        }
      }
    };

  const departmentOptions = [
    { label: 'Choose a department', value: '', disabled: true },
    { label: 'Engineering', value: 'engineering' },
    { label: 'Marketing', value: 'marketing' },
    { label: 'Sales', value: 'sales' },
    { label: 'Human Resources', value: 'hr' },
    { label: 'Finance', value: 'finance' }
  ];

  const roleOptions = [
    { label: 'Choose a role', value: '', disabled: true },
    { label: 'Manager', value: 'manager' },
    { label: 'Senior', value: 'senior' },
    { label: 'Junior', value: 'junior' },
    { label: 'Intern', value: 'intern' },
    { label: 'Contractor', value: 'contractor' }
  ];

  return (
    <Form>
      <FieldBuilder
        label=""
        labelInfo=""
        isRequired
        firstColumnLabel="Department"
        secondColumnLabel="Role"
        rowCount={teamMembers.length}
        onAddRow={handleAddTeamMember}
        onRemoveRow={handleRemoveTeamMember}
        onAddRowAnnouncement={customAddAnnouncement}
        onRemoveRowAnnouncement={customRemoveAnnouncement}
        removeButtonAriaLabel={customRemoveAriaLabel}
        rowGroupLabelPrefix="Team member"
        addButtonContent="Add team member"
      >
        {({ focusRef, firstColumnAriaLabel, secondColumnAriaLabel }, index) => [
          <FormSelect
            key="department"
            ref={createFormSelectRef(focusRef)}
            value={teamMembers[index]?.department || ''}
            onChange={(event, value) => handleTeamMemberChange(index, 'department', value)}
            aria-label={firstColumnAriaLabel}
            isRequired
          >
            {departmentOptions.map((option, optionIndex) => (
              <FormSelectOption
                key={optionIndex}
                value={option.value}
                label={option.label}
                isDisabled={option.disabled}
              />
            ))}
          </FormSelect>,
          <FormSelect
            key="role"
            value={teamMembers[index]?.role || ''}
            onChange={(event, value) => handleTeamMemberChange(index, 'role', value)}
            aria-label={secondColumnAriaLabel}
            isRequired
          >
            {roleOptions.map((option, optionIndex) => (
              <FormSelectOption
                key={optionIndex}
                value={option.value}
                label={option.label}
                isDisabled={option.disabled}
              />
            ))}
          </FormSelect>
        ]}
      </FieldBuilder>
    </Form>
  );
};

export default FieldBuilderSelectExample;
