import React from 'react';
import {
  Flex,
  FlexItem,
  Split,
  SplitItem,
  Text,
  PageSection,
  TextContent,
  Button,
  ButtonVariant,
  ButtonProps,
  Divider,
} from '@patternfly/react-core';
import { ExternalLinkAltIcon } from '@patternfly/react-icons';
import { createUseStyles } from 'react-jss';

export interface PageHeaderLinkProps extends ButtonProps {
  /** Title for the link */
  label: string;
  /** Indicates if the link points to an external page */
  isExternal?: boolean;
}

export interface ContentHeaderProps extends React.PropsWithChildren {
  /** Title for content header */
  title: string;
  /** Optional subtitle for content header */
  subtitle?: string;
  /** Optional link below subtitle */
  linkProps?: PageHeaderLinkProps;
  /** Optional icon for content header (appears to the left of the content header's title with a divider) */
  icon?: React.ReactNode;
  /** Optional label for content header (appears to the right of the content header's title) */
  label?: React.ReactNode;
  /** Breadcrumbs component */
  breadcrumbs?: React.ReactNode;
  /** Menu that appears to the far right of the title */
  actionMenu?: React.ReactNode;
  /** Custom OUIA ID */
  ouiaId?: string | number;
  /** Child nodes */
  children?: React.ReactNode;
}

const useStyles = createUseStyles({
  iconMinWidth: {
    minWidth: '48px',
  }
});

export const ContentHeader: React.FunctionComponent<React.PropsWithChildren<ContentHeaderProps>> = ({
  title,
  subtitle,
  linkProps,
  icon,
  label,
  breadcrumbs = null,
  actionMenu,
  children = null,
  ouiaId = 'ContentHeader',
}: ContentHeaderProps) => {
  const classes = useStyles();

  return (
    <PageSection variant="light">
      { breadcrumbs && (
        <div className="pf-v5-u-mb-md">
          {breadcrumbs}
        </div>
      )}
      <Flex>
        {icon && (
          <>
            <FlexItem alignSelf={{ default: 'alignSelfCenter' }} className={`${classes.iconMinWidth}`}>
              {icon}
            </FlexItem>
            <Divider orientation={{
              default: 'vertical',
            }} />
          </>
        )}
        <FlexItem flex={{ default: 'flex_1' }}>
          <Split hasGutter>
            <SplitItem>
              <TextContent>
                <Text className="pf-v5-u-mb-sm" component="h1" ouiaId={`${ouiaId}-title`}>
                  {title}
                </Text>
              </TextContent>
            </SplitItem>
            {label && (
              <SplitItem>
                {label}
              </SplitItem>
            )}
            <SplitItem isFilled />
            {actionMenu && (
              <SplitItem>
                {actionMenu}
              </SplitItem>
            )}
          </Split>
          <TextContent>
            {subtitle && (
              <Text component="p" ouiaId={`${ouiaId}-subtitle`}>
                {subtitle}
              </Text>
            )}
            {linkProps && (
              <Button variant={ButtonVariant.link} component="a" ouiaId={`${ouiaId}-link-button`} isInline icon={linkProps.isExternal ? <ExternalLinkAltIcon className='pf-v5-u-ml-sm' /> : null} iconPosition="end" {...linkProps}>
                {linkProps.label}
              </Button>
            )}
          </TextContent>
        </FlexItem>
      </Flex>
      {children}
    </PageSection>
  )};

export default ContentHeader;
