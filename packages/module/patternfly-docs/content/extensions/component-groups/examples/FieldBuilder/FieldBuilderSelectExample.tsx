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
  const handleAddTeamMember = () => {
    setTeamMembers([ ...teamMembers, { department: '', role: '' } ]);
  };

  // Handle removing a team member row
  const handleRemoveTeamMember = (index: number) => {
    setTeamMembers(teamMembers.filter((_, i) => i !== index));
  };

  // Handle updating team member data
  const handleTeamMemberChange = (index: number, field: keyof TeamMember, value: string) => {
    const updatedTeamMembers = [ ...teamMembers ];
    updatedTeamMembers[index] = { ...updatedTeamMembers[index], [field]: value };
    setTeamMembers(updatedTeamMembers);
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
        rowGroupLabelPrefix="Team member"
        addButtonProps={{
          children: 'Add team member'
        }}
      >
        {({ rowIndex, focusRef, firstColumnAriaLabelledBy, secondColumnAriaLabelledBy }) => [
          <FormSelect
            key="department"
            ref={createFormSelectRef(focusRef)}
            value={teamMembers[rowIndex]?.department || ''}
            onChange={(event, value) => handleTeamMemberChange(rowIndex, 'department', value)}
            aria-labelledby={firstColumnAriaLabelledBy}
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
            value={teamMembers[rowIndex]?.role || ''}
            onChange={(event, value) => handleTeamMemberChange(rowIndex, 'role', value)}
            aria-labelledby={secondColumnAriaLabelledBy}
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
