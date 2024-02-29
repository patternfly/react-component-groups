import React from 'react';
import MultiContentCard from "@patternfly/react-component-groups/dist/dynamic/MultiContentCard";
import { Button, Card, CardHeader, CardBody, CardFooter, Text, TextContent, TextVariants, Icon, TextList, TextListItem } from '@patternfly/react-core';
import { ArrowRightIcon, BellIcon, CogIcon, LockIcon } from '@patternfly/react-icons';
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

export const BasicExample: React.FunctionComponent = () => (
  <MultiContentCard isExpandable withHeaderBorder toggleText='Card with border toggle text' leftBorderVariant="primary" cards={cards} />
);
