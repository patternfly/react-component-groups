import type { FunctionComponent, ReactNode } from 'react';
import {
  Button,
  ButtonProps,
  ButtonVariant,
  Content,
  Divider,
  Flex,
  FlexItem,
  PageBreadcrumb,
  PageSection,
  Split,
  SplitItem
} from '@patternfly/react-core';
import { ExternalLinkAltIcon } from '@patternfly/react-icons';
import { createUseStyles } from 'react-jss';

/** extends ButtonProps */
export interface PageHeaderLinkProps extends Omit<ButtonProps, 'label'> {
  /** Title for the link */
  label: ReactNode;
  /** Indicates if the link points to an external page */
  isExternal?: boolean;
}

export interface PageHeaderProps extends React.PropsWithChildren {
  /** Title for page header */
  title?: React.ReactNode;
  /** Subtitle for page header */
  subtitle?: React.ReactNode;
  /** Optional link below subtitle */
  linkProps?: PageHeaderLinkProps;
  /** Optional icon for page header (appears to the left of the page header's title with a divider) */
  icon?: React.ReactNode;
  /** Optional label for page header (appears to the right of the page header's title) */
  label?: React.ReactNode;
  /** Breadcrumbs component */
  breadcrumbs?: React.ReactNode;
  /** Menu that appears to the far right of the title */
  actionMenu?: React.ReactNode;
  /** Custom OUIA ID */
  ouiaId?: string | number;
  /** Child nodes */
  children?: React.ReactNode;
  /** Classname for the h1 element */
  headingClassname?: string;
}

const useStyles = createUseStyles({
  iconMinWidth: {
    minWidth: '48px'
  }
});

export const PageHeader: FunctionComponent<PageHeaderProps> = ({
  title,
  subtitle,
  linkProps,
  icon,
  label: labelProp,
  breadcrumbs = null,
  actionMenu,
  ouiaId = 'PageHeader',
  children = null,
  headingClassname = subtitle ? 'pf-v6-u-mb-sm' : ''
}: PageHeaderProps) => {
  const classes = useStyles();
  const { isExternal = false, label = String(linkProps?.label), ...linkRestProps } = linkProps ?? {};
  const showSplitRow = title || labelProp || actionMenu;
  const showMainFlex = showSplitRow || subtitle || linkProps;

  return (
    <>
      {breadcrumbs && <PageBreadcrumb>{breadcrumbs}</PageBreadcrumb>}
      <PageSection hasBodyWrapper={false}>
        {(showMainFlex || icon) && (
          <Flex>
            {icon && (
              <>
                <FlexItem alignSelf={{ default: 'alignSelfCenter' }} className={classes.iconMinWidth}>
                  {icon}
                </FlexItem>
                <Divider
                  orientation={{
                    default: 'vertical'
                  }}
                />
              </>
            )}
            {showMainFlex && (
              <FlexItem flex={{ default: 'flex_1' }}>
                {showSplitRow && (
                  <Split hasGutter>
                    {title && (
                      <SplitItem>
                        <Content className={headingClassname} component="h1" ouiaId={`${ouiaId}-title`}>
                          {title}
                        </Content>
                      </SplitItem>
                    )}
                    {labelProp && <SplitItem>{labelProp}</SplitItem>}
                    <SplitItem isFilled />
                    {actionMenu && <SplitItem>{actionMenu}</SplitItem>}
                  </Split>
                )}
                {subtitle && (
                  <Content component="p" ouiaId={`${ouiaId}-subtitle`}>
                    {subtitle}
                  </Content>
                )}
                {linkProps && (
                  <Button
                    variant={ButtonVariant.link}
                    component="a"
                    ouiaId={`${ouiaId}-link-button`}
                    isInline
                    icon={isExternal ? <ExternalLinkAltIcon className="pf-v6-u-ml-sm" /> : null}
                    iconPosition="end"
                    label={label as string}
                    {...linkRestProps}
                  >
                    {linkProps.label}
                  </Button>
                )}
              </FlexItem>
            )}
          </Flex>
        )}
        {children}
      </PageSection>
    </>
  );
};

export default PageHeader;
