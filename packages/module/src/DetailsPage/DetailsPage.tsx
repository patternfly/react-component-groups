import React from 'react';
import DetailsPageHeader, { DetailsPageHeaderProps } from '../DetailsPageHeader';
import HorizontalNav, { HorizontalNavProps } from '../HorizontalNav';

export interface DetailsPageProps extends DetailsPageHeaderProps, HorizontalNavProps {
  /** DetailsPage custom children component */
  children?: React.ReactNode
};

const DetailsPage: React.FunctionComponent<DetailsPageProps> = ({
  breadcrumbs,
  actionButtons,
  actionMenu,
  pageHeading,
  onTabSelect,
  tabs = [],
  defaultActiveKey,
  children,
  ...props
}: DetailsPageProps ) => (
  <>
    <DetailsPageHeader
      breadcrumbs={breadcrumbs}
      actionButtons={actionButtons}
      actionMenu={actionMenu}
      pageHeading={pageHeading}
      {...props}
    />
    {tabs?.length > 0 ? <HorizontalNav tabs={tabs} onTabSelect={onTabSelect} defaultActiveKey={defaultActiveKey} {...props} /> : null}
    {children}
  </>
);

export default DetailsPage;
