import React from 'react';
import { Tabs, Tab, TabProps, TabTitleText, TabsProps as TabsPropsPF } from '@patternfly/react-core';

type TabsProps = Omit<TabsPropsPF, 'children' | 'ref' | 'onSelect'>;

export interface HorizontalNavProps extends TabsProps {
  /** aria-label for all tabs */
  ariaLabel?: string;
  /** Navigation tabs */
  tabs: Omit<TabProps, 'ref'>[];
  /** Callback to handle tab selection */
  onTabSelect?: (event: React.MouseEvent<HTMLElement, MouseEvent>, eventKey: number | string) => void;
};

const HorizontalNav: React.FunctionComponent<HorizontalNavProps> = ({
  ariaLabel,
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
      role="navigation"
      aria-label={ariaLabel}
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
