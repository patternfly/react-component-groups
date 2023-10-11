import {
  Label,
  LabelProps,
  Split,
  SplitItem,
  Text,
  TextContent,
  TextVariants,
} from '@patternfly/react-core';
import React from 'react';
import { createUseStyles } from 'react-jss'
import {
  ActionButtonProps,
  ActionButtons,
  ActionMenu,
  ActionMenuProps,
  Breadcrumbs,
  BreadcrumbProps
} from './utils';

export type PageHeadingLabelProps = Omit<
  LabelProps,
  'isEditable'|'editableProps'|'onEditComplete'|'onEditCancel'|'onClose'|'closeBtn'|'closeBtnAriaLabel'|'closeBtnProps'|'isOverflowLabel'
>;

export interface PageHeading {
  /** Title for page heading */
  title: string;
  /** Optional icon for page heading (appears to the left of the page heading's title) */
  iconBeforeTitle?: React.ReactNode;
  /** Optional icon for page heading (appears to the right of the page heading's title) */
  iconAfterTitle?: React.ReactNode;
  /** Optional label for page heading */
  label?: PageHeadingLabelProps;
};

export interface DetailsPageHeaderProps {
  /** Top content area of details page */
  pageHeading: PageHeading;
  /** Breadcrumbs component */
  breadcrumbs?: React.ReactNode;
   /** One or more action buttons that appear to the right of the title */
  actionButtons?: ActionButtonProps[];
   /** Menu that appears to the right of the title */
  actionMenu?: ActionMenuProps;
};

const useStyles = createUseStyles({
  detailsPageHeaderSplit: {
    alignItems: 'center',
  }
});

const DetailsPageHeader: React.FunctionComponent<DetailsPageHeaderProps> = ({
  breadcrumbs = null,
  actionButtons,
  actionMenu,
  pageHeading,
}: DetailsPageHeaderProps) => {
  const classes = useStyles();
  return (
    <>
      {breadcrumbs}
      <Split hasGutter isWrappable className={classes.detailsPageHeaderSplit}>
        <SplitItem>
          <Split hasGutter isWrappable className={`pf-v5-u-mb-sm ${classes.detailsPageHeaderSplit}`}>
            {/* Optional icon for details page heading (before title) */}
            {pageHeading?.iconBeforeTitle && (
              <SplitItem>
                {pageHeading.iconBeforeTitle}
              </SplitItem>
            )}
            {/* Page heading title */}
            <SplitItem>
              <TextContent>
                <Text component={TextVariants.h1}>{pageHeading.title}</Text>
              </TextContent>
            </SplitItem>
            {/* Icon for details page heading (after title) */}
            {pageHeading?.iconAfterTitle && (
              <SplitItem>
                {pageHeading.iconAfterTitle}
              </SplitItem>
            )}
            {/* Optional details page label */}
            {pageHeading?.label && (
              <SplitItem>
                <Label
                  className={pageHeading.label?.className}
                  color={pageHeading.label?.color}
                  variant={pageHeading.label?.variant}
                  isCompact={pageHeading.label?.isCompact}
                  
                  tooltipPosition={pageHeading.label?.tooltipPosition}
                  icon={pageHeading.label?.icon}
                  href={pageHeading.label?.href}
                  render={pageHeading.label?.render}
                >
                  {pageHeading.label.children}
                </Label>
              </SplitItem>
            )}
          </Split>
        </SplitItem>
        <SplitItem isFilled />
        <SplitItem>
          <Split hasGutter isWrappable className={classes.detailsPageHeaderSplit}>
            {/* Optional action buttons */}
            {Array.isArray(actionButtons) && actionButtons.length > 0 && (
              <SplitItem>
                <ActionButtons actionButtons={actionButtons} />
              </SplitItem>
            )}
            {/* Optional action menu - ungrouped actions */}
            {actionMenu?.actions && (
              <SplitItem className="pf-v5-u-mb-sm">
                <ActionMenu
                  actions={actionMenu.actions}
                  isDisabled={actionMenu?.isDisabled}
                  variant={actionMenu?.variant}
                  label={actionMenu?.label}
                  position={actionMenu?.position}
                  id={actionMenu?.id}
                />
              </SplitItem>
            )}
            {/* Optional action menu - Grouped actions */}
            {actionMenu?.groupedActions && (
              <SplitItem className="pf-v5-u-mb-sm">
                <ActionMenu
                  groupedActions={actionMenu.groupedActions}
                  isDisabled={actionMenu?.isDisabled}
                  variant={actionMenu?.variant}
                  label={actionMenu?.label}
                  position={actionMenu?.position}
                />
              </SplitItem>
            )}
          </Split>
        </SplitItem>
      </Split>
    </>
  );
};

export default DetailsPageHeader;
