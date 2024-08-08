import React from 'react';
import MultiContentCard, { MultiContentCardDividerVariant } from "@patternfly/react-component-groups/dist/dynamic/MultiContentCard";
import { Button, Card, CardHeader, CardBody, CardFooter, Content, List, ListItem, ContentVariants, Icon } from '@patternfly/react-core';
import { ArrowRightIcon, BellIcon, CogIcon, LockIcon } from '@patternfly/react-icons';
import { createUseStyles } from 'react-jss';
import clsx from 'clsx';

const useStyles = createUseStyles({
  action: {
    color: 'var(--pf-t--global--text--color--brand--default)',
    fontSize: 'var(-pf-t--global--font--size--sm)',
  },
  actionIcon: {
    color: 'var(--pf-t--global--icon--color--regular)',
  },
  bulletPoints: {
    color: 'var(--pf-t--global--color--brand--default)',
  },
});

export const BasicExample: React.FunctionComponent = () => {
  const classes = useStyles();

  const cards = [
    <Card isFullHeight isPlain key="card-1">
      <CardHeader className="pf-v6-u-pt-0">
        <Content component={ContentVariants.h3}>Getting Started</Content>
      </CardHeader>
      <CardBody>
        <Content className={clsx(classes.action, 'pf-v6-u-font-weight-bold', 'pf-v6-u-mb-sm')}>
          <Icon size="md" className="pf-v6-u-pl-sm pf-v6-u-pr-md">
            <CogIcon className={classes.actionIcon} />
          </Icon>
          Configure application
        </Content>
        <Content className="pf-v6-u-font-size-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Content>
      </CardBody>
      <CardFooter>
        <List className={clsx(classes.bulletPoints, 'pf-v6-u-font-size-sm', 'pf-v6-u-ml-0')}>
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
      <CardHeader/>
      <CardBody>
        <Content className={clsx(classes.action, 'pf-v6-u-font-weight-bold', 'pf-v6-u-mb-sm')}>
          <Icon size="md" className="pf-v6-u-pl-sm pf-v6-u-pr-md">
            <LockIcon className={classes.actionIcon} />
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
    {
      content: (
        <Card isFullHeight isPlain key="card-3">
          <CardHeader className="pf-v6-u-pt-0">
            <Content component={ContentVariants.h3}>Next Steps</Content>
          </CardHeader>
          <CardBody>
            <Content className={clsx(classes.action, 'pf-v6-u-font-weight-bold', 'pf-v6-u-mb-sm')}>
              <Icon size="md" className="pf-v6-u-pl-sm pf-v6-u-pr-md">
                <BellIcon className={classes.actionIcon} />
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
      ), 
      dividerVariant: MultiContentCardDividerVariant.left
    }
  ];

  return(<MultiContentCard isExpandable toggleText='Card with dividers toggle text' cards={cards} />);}
