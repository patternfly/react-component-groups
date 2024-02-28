import React from 'react';
import { screen, render } from '@testing-library/react';
import { Button, Card, CardHeader, CardBody, Text, TextContent, TextVariants, Icon, TextList, TextListItem, CardFooter, Dropdown, MenuToggle, DropdownList, DropdownItem, MenuToggleElement } from '@patternfly/react-core';
import { ArrowRightIcon, BellIcon, CogIcon, EllipsisVIcon, LockIcon } from '@patternfly/react-icons';
import MultiContentCard from './MultiContentCard';

const cards = [
  <Card isFullHeight isPlain key="card-1">
    <CardHeader>
      <TextContent>
        <Text component={TextVariants.h4}>Getting Started</Text>
      </TextContent>
    </CardHeader>
    <CardBody>
      <TextContent>
        <Text className="pf-v5-u-font-size-sm pf-v5-u-font-weight-bold pf-v5-u-mb-sm pf-v5-u-link-color-hover">
          <Icon size="md" className="pf-v5-u-pl-sm pf-v5-u-pr-md">
            <CogIcon />
          </Icon>
          Configure application
        </Text>
        <Text className="pf-v5-u-font-size-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Text>
      </TextContent>
    </CardBody>
    <CardFooter>
      <TextContent>
        <TextList className="pf-v5-u-font-size-sm pf-v5-u-link-color pf-v5-u-ml-0">
          <TextListItem>
            <Button variant="link" isInline>First link</Button>
          </TextListItem>
          <TextListItem>
            <Button variant="link" isInline>Second link</Button>
          </TextListItem>
          <TextListItem>
            <Button variant="link" isInline>Another link</Button>
          </TextListItem>
        </TextList>
      </TextContent>
    </CardFooter>
  </Card>,
  <Card isFullHeight isPlain key="card-2">
    <CardBody className="pf-v5-u-pt-3xl-on-md">
      <TextContent>
        <Text className="pf-v5-u-font-size-sm pf-v5-u-font-weight-bold pf-v5-u-mb-sm pf-v5-u-link-color-hover">
          <Icon size="md" className="pf-v5-u-pl-sm pf-v5-u-pr-md">
            <LockIcon />
          </Icon>
          Configure access
        </Text>
        <Text className="pf-v5-u-font-size-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </Text>
      </TextContent>
    </CardBody>
    <CardFooter>
      <Text>
        <Button variant="link" isInline>
            Learn more  
          <Icon className="pf-u-ml-sm" isInline>
            <ArrowRightIcon />
          </Icon>
        </Button>
      </Text>
    </CardFooter>
  </Card>,
  <Card isFullHeight isPlain key="card-3">
    <CardHeader>
      <TextContent>
        <Text component={TextVariants.h4}>Next Steps</Text>
      </TextContent>
    </CardHeader>
    <CardBody>
      <TextContent>
        <Text className="pf-v5-u-font-size-sm pf-v5-u-font-weight-bold pf-v5-u-mb-sm pf-v5-u-link-color-hover">
          <Icon size="md" className="pf-v5-u-pl-sm pf-v5-u-pr-md">
            <BellIcon />
          </Icon>
          Configure notifications
        </Text>
        <Text className="pf-v5-u-font-size-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Text>
      </TextContent>
    </CardBody>
    <CardFooter>
      <Text>
        <Button variant="link" isInline>
            Learn more  
          <Icon className="pf-u-ml-sm" isInline>
            <ArrowRightIcon />
          </Icon>
        </Button>
      </Text>
    </CardFooter>
  </Card>
];

describe('MultiContentCard component', () => {
  it('should render basic multi content card', () => {
    const { container } = render(<MultiContentCard cards={cards} />);
    expect(screen.getByText('Getting Started')).toBeInTheDocument();
    expect(screen.getByText('Next Steps')).toBeInTheDocument();
    expect(screen.getByText('Configure application')).toBeInTheDocument();
    expect(screen.getByText('Configure access')).toBeInTheDocument();
    expect(screen.getByText('Configure notifications')).toBeInTheDocument();
    expect(screen.getAllByText('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.')).toHaveLength(2);
    expect(screen.getByText('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.')).toBeInTheDocument();
    expect(screen.getByText('First link')).toBeInTheDocument();
    expect(screen.getByText('Second link')).toBeInTheDocument();
    expect(screen.getByText('Another link')).toBeInTheDocument();
    expect(screen.getAllByText('Learn more')).toHaveLength(2);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render expandable multi content card - expanded', () => {
    const { container } = render(
      <MultiContentCard
        isExpandable
        toggleText='Expandable card toggle text' 
        cards={cards}
      />
    );
    expect(screen.getByText('Expandable card toggle text')).toBeInTheDocument();
    expect(screen.getByText('Getting Started')).toBeInTheDocument();

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render expandable multi content card - collapsed', () => {
    const { container } = render(
      <MultiContentCard
        isExpandable
        defaultExpanded={false}
        toggleText='Expandable card toggle text' 
        cards={cards}
      />
    );
    expect(screen.getByText('Expandable card toggle text')).toBeInTheDocument();
    expect(screen.queryByText('Getting Started')).toBe(null);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render expandable multi content card - with actions', () => {
    const { container } = render(
      <MultiContentCard
        isExpandable
        defaultExpanded={false}
        toggleText='Expandable card toggle text' 
        cards={cards}
        actions={
          <Dropdown
            isOpen
            onSelect={() => null}
            onOpenChange={() => null}
            toggle={(toggleRef: React.Ref<MenuToggleElement>) => (
              <MenuToggle
                ref={toggleRef}
                aria-label="kebab dropdown toggle"
                variant="plain"
                onClick={() => null}
                isExpanded
              >
                <EllipsisVIcon />
              </MenuToggle>
            )}
            shouldFocusToggleOnSelect
          >
            <DropdownList>
              <DropdownItem value={0} key="action">
                Action item
              </DropdownItem>
            </DropdownList>
          </Dropdown>
        }
      />
    );
    expect(screen.getByText('Action item')).toBeInTheDocument();

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render multi content card with dividers', () => {
    const { container } = render(<MultiContentCard cards={cards} withDividers />);

    expect(screen.getAllByRole('separator')).toHaveLength(2);

    expect(container.firstChild).toMatchSnapshot();
  });

});