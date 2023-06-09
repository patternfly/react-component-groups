import React from 'react';
import { DetailsPageHeader, DetailsPageHeaderProps } from '../DetailsPageHeader';
import { HorizontalNav, HorizontalNavProps } from '../HorizontalNav';

export interface DetailsPageProps extends DetailsPageHeaderProps, HorizontalNavProps {};

export const DetailsPage: React.FunctionComponent<DetailsPageProps> = ({
  breadcrumbs,
  actionButtons,
  actionMenu,
  pageHeading,
  ariaLabel,
  tabs,
  location,
  params,
  navigate
}: DetailsPageProps ) => (
  <>
    <DetailsPageHeader
      breadcrumbs={breadcrumbs}
      actionButtons={actionButtons}
      actionMenu={actionMenu}
      pageHeading={pageHeading}
    />
    <HorizontalNav ariaLabel={ariaLabel} tabs={tabs} location={location} params={params} navigate={navigate} />
  </>
);
