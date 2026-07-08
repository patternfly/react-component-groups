import { Fragment, useState } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Content,
  DescriptionList,
  DescriptionListDescription,
  DescriptionListGroup,
  DescriptionListTerm,
  Divider,
  Title
} from '@patternfly/react-core';
import Tearsheet from '@patternfly/react-component-groups/dist/dynamic/Tearsheet';
import TearsheetHeader from '@patternfly/react-component-groups/dist/dynamic/TearsheetHeader';
import TearsheetBody from '@patternfly/react-component-groups/dist/dynamic/TearsheetBody';
import TearsheetFooter from '@patternfly/react-component-groups/dist/dynamic/TearsheetFooter';
import { Flex, FlexItem, Grid, GridItem } from '@patternfly/react-core';

type BodyLayout = 'simple' | 'xl-text' | 'grid' | 'long';

const LOREM =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore ' +
  'magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo ' +
  'consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla ' +
  'pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id ' +
  'est laborum.';

const bodyLayouts: Record<BodyLayout, { label: string; render: () => React.ReactNode }> = {
  simple: {
    label: 'Simple text',
    render: () => <Content component="p">{LOREM}</Content>
  },
  'xl-text': {
    label: 'XL text',
    render: () => (
      <>
        {Array.from({ length: 30 }, (_, i) => (
          <Content component="p" key={i}>
            {LOREM}
          </Content>
        ))}
      </>
    )
  },
  grid: {
    label: 'Grid layout',
    render: () => (
      <Grid hasGutter>
        {[ 'Overview', 'Configuration', 'Resources', 'Networking', 'Storage', 'Monitoring' ].map((title) => (
          <GridItem span={4} key={title}>
            <Card isFullHeight>
              <CardHeader>
                <CardTitle>{title}</CardTitle>
              </CardHeader>
              <CardBody>{LOREM.slice(0, 120)}...</CardBody>
            </Card>
          </GridItem>
        ))}
      </Grid>
    )
  },
  long: {
    label: 'Long layout',
    render: () => (
      <Flex direction={{ default: 'column' }} gap={{ default: 'gapLg' }}>
        {[ 'General', 'Details', 'Configuration', 'Permissions', 'Audit log' ].map((section) => (
          <FlexItem key={section}>
            <Title headingLevel="h3">{section}</Title>
            <Divider />
            <DescriptionList>
              {[ 'Name', 'Status', 'Created', 'Modified' ].map((term) => (
                <DescriptionListGroup key={term}>
                  <DescriptionListTerm>{term}</DescriptionListTerm>
                  <DescriptionListDescription>{LOREM.slice(0, 80)}</DescriptionListDescription>
                </DescriptionListGroup>
              ))}
            </DescriptionList>
          </FlexItem>
        ))}
      </Flex>
    )
  }
};

export const TearsheetLayouts: React.FunctionComponent = () => {
  const [ activeLayout, setActiveLayout ] = useState<BodyLayout | null>(null);

  const open = (layout: BodyLayout) => () => setActiveLayout(layout);
  const close = (_event: React.MouseEvent<Element, MouseEvent> | KeyboardEvent | MouseEvent) => setActiveLayout(null);

  return (
    <Fragment>
      <Flex gap={{ default: 'gapSm' }}>
        {(Object.keys(bodyLayouts) as BodyLayout[]).map((key) => (
          <Button key={key} variant="primary" onClick={open(key)}>
            Show Tearsheet ({bodyLayouts[key].label})
          </Button>
        ))}
      </Flex>
      <Tearsheet isOpen={activeLayout !== null} onClose={close}>
        <TearsheetHeader title={`Tearsheet — ${activeLayout ? bodyLayouts[activeLayout].label : ''}`} />
        <TearsheetBody>{activeLayout && bodyLayouts[activeLayout].render()}</TearsheetBody>
        <TearsheetFooter>
          <Button key="confirm" variant="primary" onClick={close}>
            Confirm
          </Button>
          <Button key="cancel" variant="link" onClick={close}>
            Cancel
          </Button>
        </TearsheetFooter>
      </Tearsheet>
    </Fragment>
  );
};
