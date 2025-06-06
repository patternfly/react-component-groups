import { FunctionComponent, useState } from 'react';
import MultiContentCard from '@patternfly/react-component-groups/dist/dynamic/MultiContentCard';
import { EllipsisVIcon } from '@patternfly/react-icons';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Content,
  ContentVariants,
  List,
  ListItem,
  Icon,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownList,
  MenuToggle,
  MenuToggleElement,
  Label
} from '@patternfly/react-core';
import { ArrowRightIcon, BellIcon, CogIcon, LockIcon } from '@patternfly/react-icons';
import { createUseStyles } from 'react-jss';
import { css } from '@patternfly/react-styles';

const useStyles = createUseStyles({
  bulletPoints: {
    color: 'var(--pf-t--global--color--brand--default)'
  }
});

export const BasicExample: FunctionComponent = () => {
  const classes = useStyles();
  const [ isMenuOpen, setMenuOpen ] = useState(false);

  const cards = [
    <Card isFullHeight isPlain key="card-1">
      <CardHeader className="pf-v6-u-pt-0">
        <Content component={ContentVariants.h4}>Getting Started</Content>
      </CardHeader>
      <CardBody>
        <Label className="pf-v6-u-mb-sm" icon={<CogIcon />} color="blue">
          Configure application
        </Label>
        <Content className="pf-v6-u-font-size-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua.
        </Content>
      </CardBody>
      <CardFooter>
        <List className={css(classes.bulletPoints, 'pf-v6-u-font-size-sm', 'pf-v6-u-ml-0')}>
          <ListItem>
            <Button variant="link" isInline>
              First link
            </Button>
          </ListItem>
          <ListItem>
            <Button variant="link" isInline>
              Second link
            </Button>
          </ListItem>
          <ListItem>
            <Button variant="link" isInline>
              Another link
            </Button>
          </ListItem>
        </List>
      </CardFooter>
    </Card>,
    <Card isFullHeight isPlain key="card-2">
      <CardHeader className="pf-v6-u-pt-0" style={{ visibility: 'hidden' }}>
        -
      </CardHeader>
      <CardBody>
        <Label className="pf-v6-u-mb-sm" icon={<LockIcon />} color="green">
          Configure access
        </Label>
        <Content className="pf-v6-u-font-size-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat.
        </Content>
      </CardBody>
      <CardFooter>
        <Content>
          <Button
            icon={
              <Icon className="pf-v6-u-ml-sm" isInline>
                <ArrowRightIcon />
              </Icon>
            }
            variant="link"
            isInline
          >
            Learn more
          </Button>
        </Content>
      </CardFooter>
    </Card>,
    <Card isFullHeight isPlain key="card-3">
      <CardHeader className="pf-v6-u-pt-0">
        <Content component={ContentVariants.h4}>Next Steps</Content>
      </CardHeader>
      <CardBody>
        <Label className="pf-v6-u-mb-sm" icon={<BellIcon />} color="orange">
          Configure notifications
        </Label>
        <Content className="pf-v6-u-font-size-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua.
        </Content>
      </CardBody>
      <CardFooter>
        <Content>
          <Button
            icon={
              <Icon className="pf-v6-u-ml-sm" isInline>
                <ArrowRightIcon />
              </Icon>
            }
            variant="link"
            isInline
          >
            Learn more
          </Button>
        </Content>
      </CardFooter>
    </Card>
  ];

  const onToggleClick = () => {
    setMenuOpen(!isMenuOpen);
  };
  return (
    <MultiContentCard
      isExpandable
      toggleText="Card with actions toggle text"
      cards={cards}
      actions={
        <Dropdown
          isOpen={isMenuOpen}
          onSelect={() => null}
          onOpenChange={(isMenuOpen: boolean) => setMenuOpen(isMenuOpen)}
          popperProps={{ position: 'right' }}
          toggle={(toggleRef: Ref<MenuToggleElement>) => (
            <MenuToggle
              ref={toggleRef}
              aria-label="kebab dropdown toggle"
              variant="plain"
              onClick={onToggleClick}
              isExpanded={isMenuOpen}
            >
              <EllipsisVIcon />
            </MenuToggle>
          )}
          shouldFocusToggleOnSelect
        >
          <DropdownList>
            <DropdownItem value={0} key="action">
              Action
            </DropdownItem>
            <DropdownItem value={1} isDisabled key="disabled action">
              Disabled Action
            </DropdownItem>
            <Divider component="li" key="separator" />
            <DropdownItem value={2} key="separated action">
              Separated Action
            </DropdownItem>
          </DropdownList>
        </Dropdown>
      }
    />
  );
};
