import React from 'react';
import { Tabs, Tab, TabProps, TabTitleText, TabsProps as TabsPropsPF } from '@patternfly/react-core';

type TabsProps = Omit<TabsPropsPF, 'children' | 'ref' | 'onSelect'>;

export interface HorizontalNavProps extends TabsProps {
  /** Navigation tabs */
  tabs: Omit<TabProps, 'ref'>[];
  /** Callback to handle tab selection */
  onTabSelect?: (event: React.MouseEvent<HTMLElement, MouseEvent>, eventKey: number | string) => void;
};

const HorizontalNav: React.FunctionComponent<HorizontalNavProps> = ({
  tabs,
  defaultActiveKey,
  onTabSelect,
  ...props
}: HorizontalNavProps) => {

  const [ activeTabKey, setActiveTabKey ] = React.useState<string | number>(defaultActiveKey ?? tabs?.[0]?.eventKey ?? 0);

  return (
    <Tabs
      mountOnEnter
      activeKey={activeTabKey}
      onSelect={(e, eventKey) => {
        setActiveTabKey(eventKey);
        onTabSelect?.(e, eventKey);
      }}
      role="nav"
      {...props}
    >
      {tabs.map((tab) => (
        <Tab
          {...tab}
          title={[ 'string', 'number', 'boolean' ].includes(typeof tab.title) ? <TabTitleText>{tab.title}</TabTitleText> : tab.title}
          key={tab.eventKey}
        >
          {tab.children}
        </Tab>
      ))}
    </Tabs>
  );
};

export default HorizontalNav;
