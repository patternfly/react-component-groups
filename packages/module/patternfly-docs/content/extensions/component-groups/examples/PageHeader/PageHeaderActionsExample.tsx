import { Fragment, FunctionComponent, MouseEvent, Ref, useState } from 'react';
import PageHeader from '@patternfly/react-component-groups/dist/dynamic/PageHeader';
import {
  ActionList,
  ActionListItem,
  Dropdown,
  DropdownItem,
  DropdownList,
  MenuToggle,
  MenuToggleElement
} from '@patternfly/react-core';
import { EllipsisVIcon } from '@patternfly/react-icons';

export const ActionsExample: FunctionComponent = () => {
  const [ isOpen, setIsOpen ] = useState(false);

  const onToggle = () => {
    setIsOpen(!isOpen);
  };

  const onSelect = (event: MouseEvent<Element, MouseEvent> | undefined) => {
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
    <Fragment>
      <PageHeader
        title="My Title"
        subtitle="This is a subtitle for your page header"
        actionMenu={
          <ActionList>
            <ActionListItem>
              <Dropdown
                popperProps={{ position: 'right' }}
                onSelect={onSelect}
                toggle={(toggleRef: Ref<MenuToggleElement>) => (
                  <MenuToggle
                    ref={toggleRef}
                    icon={<EllipsisVIcon />}
                    onClick={onToggle}
                    variant="plain"
                    isExpanded={isOpen}
                    aria-label="Action list single group kebab"
                  />
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
    </Fragment>
  );
};
