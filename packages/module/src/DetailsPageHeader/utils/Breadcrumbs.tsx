import { Breadcrumb, BreadcrumbItem, BreadcrumbItemProps } from '@patternfly/react-core';
import React from 'react';
import { Link } from 'react-router-dom';

export type BreadcrumbProps = Omit<BreadcrumbItemProps, 'isDropdown'|'component'>;

export interface BreadcrumbsProps {
  /** Array of breadcrumbs */
  breadcrumbs: BreadcrumbProps[];
};

export const Breadcrumbs: React.FunctionComponent<BreadcrumbsProps> = ({
  breadcrumbs
}: BreadcrumbsProps) => (
  <Breadcrumb>
    {breadcrumbs.map((crumb, i, { length }) => {
      const id = `breadcrumb-link-${i}`;
      const isLast = i === length - 1;

      return (
        <BreadcrumbItem
          className={crumb?.className}
          to={crumb?.to}
          isActive={crumb?.isActive || isLast}
          showDivider={crumb?.showDivider}
          target={crumb?.target}
          component={(props) => <Link {...props} to={crumb.to} data-testid={id} />}
          render={crumb?.render}
          key={id}
        >
          {crumb?.children}
        </BreadcrumbItem>
      );
    })}
  </Breadcrumb>
);


export default Breadcrumbs;
