import { Tabs, Tab, TabProps as PfTabProps, TabTitleText } from '@patternfly/react-core';
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export type TabProps = Omit<
  PfTabProps,
  'tabContentId'|'tabContentRef'|'isHidden'|'innerRef'|'closeButtonAriaLabel'|'isCloseDisabled'|'actions'
>

export interface HorizontalNavProps {
  /** aria-label for all tabs */
  ariaLabel?: string;
  /** Properties for tabs */
  tabs: TabProps[];
  /** URL parameters */
  params?: Record<string, string>;
  /** Navigate function */
  navigate?: ReturnType<typeof useNavigate>;
  /** Current location */
  location?: ReturnType<typeof useLocation>;
};

const HorizontalNav: React.FunctionComponent<HorizontalNavProps> = ({
  ariaLabel,
  tabs,
  params,
  navigate,
  location,
}: HorizontalNavProps) => {
  const defaultActiveTab = tabs && tabs[0] ? tabs[0].eventKey : 0; // Set first tab as the default active tab

  const activeTabFromUrlParam = params?.selectedTab;
  const isValidTabFromUrl =
    activeTabFromUrlParam && tabs?.some((tab) => tab.eventKey === activeTabFromUrlParam);
  const activeTab = isValidTabFromUrl ? activeTabFromUrlParam : defaultActiveTab;

  const [ activeTabKey, setActiveTabKey ] = React.useState<string | number>(activeTab ? activeTab : defaultActiveTab);

  return (
    <Tabs
      mountOnEnter
      activeKey={activeTabKey}
      onSelect={(e, eventKey) => {
        setActiveTabKey(eventKey);
        if (location?.pathname && navigate) {
          const currentPathName = location.pathname;
          if (params?.selectedTab) {
            navigate(currentPathName.replace(params.selectedTab, eventKey as string), {
              replace: true,
            });
          } else {
            navigate(`${currentPathName}/${eventKey as string}`);
          }
        }
      }}
      aria-label={ariaLabel}
      role="region"
    >
      {tabs.map((tab: TabProps) => (
        <Tab
          className={tab?.className}
          href={tab?.href}
          title={<TabTitleText>{tab.title}</TabTitleText>}
          eventKey={tab.eventKey}
          isDisabled={tab?.isDisabled}
          isAriaDisabled={tab?.isAriaDisabled}
          inoperableEvents={tab?.inoperableEvents}
          tooltip={tab?.tooltip}
          ouiaId={tab?.ouiaId}
          key={tab.eventKey}
        >
          {tab.children}
        </Tab>
      ))}
    </Tabs>
  );
};

export default HorizontalNav;
