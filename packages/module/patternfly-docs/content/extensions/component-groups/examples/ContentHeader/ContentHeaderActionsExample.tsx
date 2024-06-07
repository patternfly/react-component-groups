import React from 'react';
import ContentHeader from '@patternfly/react-component-groups/dist/dynamic/ContentHeader';
import { ActionList, ActionListItem, Dropdown, DropdownItem, DropdownList, MenuToggle, MenuToggleElement } from '@patternfly/react-core';
import { EllipsisVIcon } from '@patternfly/react-icons';

export const ActionsExample: React.FunctionComponent = () => {
  const [ isOpen, setIsOpen ] = React.useState(false);

  const onToggle = () => {
    setIsOpen(!isOpen);
  };

  const onSelect = (event: React.MouseEvent<Element, MouseEvent> | undefined) => {
    event?.stopPropagation();
    setIsOpen(!isOpen);
  };

  const dropdownItems = (
    <>
      <DropdownItem to="#" key="link">
            Link
      </DropdownItem>
      <DropdownItem key="action">Action</DropdownItem>
      <DropdownItem to="#" key="disabled link" isDisabled>
            Disabled Link
      </DropdownItem>
    </>
  );
      
  return (
    <React.Fragment>
      <ContentHeader
        title='My Title'
        subtitle='This is a subtitle for your content header' 
        actionMenu={
          <ActionList>
            <ActionListItem>
              <Dropdown
                popperProps={{ position: 'right' }}
                onSelect={onSelect}
                toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
                  <MenuToggle
                    ref={toggleRef}
                    onClick={onToggle}
                    variant="plain"
                    isExpanded={isOpen}
                    aria-label="Action list single group kebab"
                  >
                    <EllipsisVIcon />
                  </MenuToggle>
                )}
                isOpen={isOpen}
                onOpenChange={(isOpen: boolean) => setIsOpen(isOpen)}
              >
                <DropdownList>{dropdownItems}</DropdownList>
              </Dropdown>
            </ActionListItem>
          </ActionList>
        } 
      />
    </React.Fragment>
  )
};
