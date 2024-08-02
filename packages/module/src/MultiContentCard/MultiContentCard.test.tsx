import React from 'react';
import { screen, render } from '@testing-library/react';
import { Button, Card, CardHeader, CardBody, Content, ContentVariants, Icon, List, ListItem, CardFooter, Dropdown, MenuToggle, DropdownList, DropdownItem, MenuToggleElement } from '@patternfly/react-core';
import { ArrowRightIcon, BellIcon, CogIcon, EllipsisVIcon, LockIcon } from '@patternfly/react-icons';
import MultiContentCard, { MultiContentCardDividerVariant } from './MultiContentCard';

const cards = [
  <Card isFullHeight isPlain key="card-1">
    <CardHeader>
      <Content component={ContentVariants.h4}>Getting Started</Content>
    </CardHeader>
    <CardBody>
      <Content className="pf-v6-u-font-size-sm pf-v6-u-font-weight-bold pf-v6-u-mb-sm pf-v6-u-link-color-hover">
        <Icon size="md" className="pf-v6-u-pl-sm pf-v6-u-pr-md">
          <CogIcon />
        </Icon>
          Configure application
      </Content>
      <Content className="pf-v6-u-font-size-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </Content>
    </CardBody>
    <CardFooter>
      <List className="pf-v6-u-font-size-sm pf-v6-u-link-color pf-v6-u-ml-0">
        <ListItem>
          <Button variant="link" isInline>First link</Button>
        </ListItem>
        <ListItem>
          <Button variant="link" isInline>Second link</Button>
        </ListItem>
        <ListItem>
          <Button variant="link" isInline>Another link</Button>
        </ListItem>
      </List>
    </CardFooter>
  </Card>,
  <Card isFullHeight isPlain key="card-2">
    <CardBody className="pf-v6-u-pt-3xl-on-md">
      <Content className="pf-v6-u-font-size-sm pf-v6-u-font-weight-bold pf-v6-u-mb-sm pf-v6-u-link-color-hover">
        <Icon size="md" className="pf-v6-u-pl-sm pf-v6-u-pr-md">
          <LockIcon />
        </Icon>
          Configure access
      </Content>
      <Content className="pf-v6-u-font-size-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </Content>
    </CardBody>
    <CardFooter>
      <Content>
        <Button variant="link" isInline>
            Learn more  
          <Icon className="pf-v6-u-ml-sm" isInline>
            <ArrowRightIcon />
          </Icon>
        </Button>
      </Content>
    </CardFooter>
  </Card>,
  <Card isFullHeight isPlain key="card-3">
    <CardHeader>
      <Content component={ContentVariants.h4}>Next Steps</Content>
    </CardHeader>
    <CardBody>
      <Content className="pf-v6-u-font-size-sm pf-v6-u-font-weight-bold pf-v6-u-mb-sm pf-v6-u-link-color-hover">
        <Icon size="md" className="pf-v6-u-pl-sm pf-v6-u-pr-md">
          <BellIcon />
        </Icon>
          Configure notifications
      </Content>
      <Content className="pf-v6-u-font-size-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </Content>
    </CardBody>
    <CardFooter>
      <Content>
        <Button variant="link" isInline>
            Learn more  
          <Icon className="pf-v6-u-ml-sm" isInline>
            <ArrowRightIcon />
          </Icon>
        </Button>
      </Content>
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

  it('should render multi content card with a single divider', () => {
    const { container } = render(<MultiContentCard cards={[ cards[0], cards[1], { content: cards[2], dividerVariant: MultiContentCardDividerVariant.left } ]} />);

    expect(screen.getAllByRole('separator')).toHaveLength(1);

    expect(container.firstChild).toMatchSnapshot();
  });

});