import React, { useState } from 'react';
import {
  Form,
  Select,
  SelectOption,
  SelectList,
  MenuToggle,
  MenuToggleElement,
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

  // State for managing which select dropdowns are open
  const [ departmentOpenStates, setDepartmentOpenStates ] = useState<boolean[]>([ false ]);
  const [ roleOpenStates, setRoleOpenStates ] = useState<boolean[]>([ false ]);

  // Handle adding a new team member row
  const handleAddTeamMember = (event: React.MouseEvent) => {
    // eslint-disable-next-line no-console
    console.log('Add button clicked:', event.currentTarget);
    const newTeamMembers = [ ...teamMembers, { department: '', role: '' } ];
    setTeamMembers(newTeamMembers);
    // Add new open states for the selects
    setDepartmentOpenStates([ ...departmentOpenStates, false ]);
    setRoleOpenStates([ ...roleOpenStates, false ]);
  };

  // Handle removing a team member row
  const handleRemoveTeamMember = (event: React.MouseEvent, index: number) => {
    // eslint-disable-next-line no-console
    console.log('Remove button clicked:', event.currentTarget, 'for index:', index);
    const newTeamMembers = teamMembers.filter((_, i) => i !== index);
    setTeamMembers(newTeamMembers);
    // Remove corresponding open states
    setDepartmentOpenStates(departmentOpenStates.filter((_, i) => i !== index));
    setRoleOpenStates(roleOpenStates.filter((_, i) => i !== index));
  };

  // Handle updating team member data
  const handleTeamMemberChange = (index: number, field: keyof TeamMember, value: string) => {
    const updatedTeamMembers = [ ...teamMembers ];
    updatedTeamMembers[index] = { ...updatedTeamMembers[index], [field]: value };
    setTeamMembers(updatedTeamMembers);
  };

  // Handle department select open/close
  const handleDepartmentToggle = (index: number) => {
    const newOpenStates = [ ...departmentOpenStates ];
    newOpenStates[index] = !newOpenStates[index];
    setDepartmentOpenStates(newOpenStates);
  };

  // Handle role select open/close
  const handleRoleToggle = (index: number) => {
    const newOpenStates = [ ...roleOpenStates ];
    newOpenStates[index] = !newOpenStates[index];
    setRoleOpenStates(newOpenStates);
  };

  // Handle department selection
  const handleDepartmentSelect = (index: number, _event: React.MouseEvent<Element, MouseEvent> | undefined, value: string | number | undefined) => {
    handleTeamMemberChange(index, 'department', value as string);
    const newOpenStates = [ ...departmentOpenStates ];
    newOpenStates[index] = false;
    setDepartmentOpenStates(newOpenStates);
  };

  // Handle role selection
  const handleRoleSelect = (index: number, _event: React.MouseEvent<Element, MouseEvent> | undefined, value: string | number | undefined) => {
    handleTeamMemberChange(index, 'role', value as string);
    const newOpenStates = [ ...roleOpenStates ];
    newOpenStates[index] = false;
    setRoleOpenStates(newOpenStates);
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
          <Select
            key="department"
            id={`department-select-${index}`}
            isOpen={departmentOpenStates[index] || false}
            selected={teamMembers[index]?.department || ''}
            onSelect={(event, value) => handleDepartmentSelect(index, event, value)}
            onOpenChange={(isOpen) => {
              const newOpenStates = [ ...departmentOpenStates ];
              newOpenStates[index] = isOpen;
              setDepartmentOpenStates(newOpenStates);
            }}
            toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
              <MenuToggle
                ref={(element) => {
                  // Handle both the toggle ref and focus ref
                  if (typeof toggleRef === 'function') {
                    toggleRef(element);
                  } else if (toggleRef && 'current' in toggleRef && toggleRef.current !== element) {
                    (toggleRef as React.MutableRefObject<MenuToggleElement | null>).current = element;
                  }
                  focusRef(element);
                }}
                onClick={() => handleDepartmentToggle(index)}
                isExpanded={departmentOpenStates[index] || false}
                aria-label={firstColumnAriaLabel}
                style={{ width: '100%' }}
              >
                {teamMembers[index]?.department ? 
                  departmentOptions.find(opt => opt.value === teamMembers[index]?.department)?.label || 'Choose a department'
                  : 'Choose a department'}
              </MenuToggle>
            )}
            shouldFocusToggleOnSelect
          >
            <SelectList>
              {departmentOptions.map((option, optionIndex) => (
                <SelectOption
                  key={optionIndex}
                  value={option.value}
                  isDisabled={option.disabled}
                >
                  {option.label}
                </SelectOption>
              ))}
            </SelectList>
          </Select>,
          <Select
            key="role"
            id={`role-select-${index}`}
            isOpen={roleOpenStates[index] || false}
            selected={teamMembers[index]?.role || ''}
            onSelect={(event, value) => handleRoleSelect(index, event, value)}
            onOpenChange={(isOpen) => {
              const newOpenStates = [ ...roleOpenStates ];
              newOpenStates[index] = isOpen;
              setRoleOpenStates(newOpenStates);
            }}
            toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
              <MenuToggle
                ref={toggleRef}
                onClick={() => handleRoleToggle(index)}
                isExpanded={roleOpenStates[index] || false}
                aria-label={secondColumnAriaLabel}
                style={{ width: '100%' }}
              >
                {teamMembers[index]?.role ? 
                  roleOptions.find(opt => opt.value === teamMembers[index]?.role)?.label || 'Choose a role'
                  : 'Choose a role'}
              </MenuToggle>
            )}
            shouldFocusToggleOnSelect
          >
            <SelectList>
              {roleOptions.map((option, optionIndex) => (
                <SelectOption
                  key={optionIndex}
                  value={option.value}
                  isDisabled={option.disabled}
                >
                  {option.label}
                </SelectOption>
              ))}
            </SelectList>
          </Select>
        ]}
      </FieldBuilder>
    </Form>
  );
};

export default FieldBuilderSelectExample;
