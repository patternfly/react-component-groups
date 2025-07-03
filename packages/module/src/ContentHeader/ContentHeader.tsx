import type { PropsWithChildren, FunctionComponent, ReactNode } from 'react';
import {
  Flex,
  FlexItem,
  Split,
  SplitItem,
  Content,
  PageSection,
  Button,
  ButtonVariant,
  ButtonProps,
  Divider
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

export interface ContentHeaderProps {
  /** Title for content header */
  title: React.ReactNode;
  /** Optional subtitle for content header */
  subtitle?: React.ReactNode;
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
}

const useStyles = createUseStyles({
  iconMinWidth: {
    minWidth: '48px'
  }
});

export const ContentHeader: FunctionComponent<PropsWithChildren<ContentHeaderProps>> = ({
  title,
  subtitle = null,
  linkProps,
  icon,
  label: labelProp,
  breadcrumbs = null,
  actionMenu,
  ouiaId = 'ContentHeader'
}: ContentHeaderProps) => {
  const classes = useStyles();
  const { isExternal = false, label = String(linkProps?.label), ...linkRestProps } = linkProps ?? {};

  return (
    <PageSection hasBodyWrapper={false}>
      {breadcrumbs && <div className="pf-v6-u-mb-md">{breadcrumbs}</div>}
      <Flex>
        {icon && (
          <>
            <FlexItem alignSelf={{ default: 'alignSelfCenter' }} className={`${classes.iconMinWidth}`}>
              {icon}
            </FlexItem>
            <Divider
              orientation={{
                default: 'vertical'
              }}
            />
          </>
        )}
        <FlexItem flex={{ default: 'flex_1' }}>
          <Split hasGutter>
            <SplitItem>
              {typeof title === 'string' ? (
                <Content className="pf-v6-u-mb-sm" component="h1" ouiaId={`${ouiaId}-title`}>
                  {title}
                </Content>
              ) : (
                title
              )}
            </SplitItem>
            {labelProp && <SplitItem>{labelProp}</SplitItem>}
            <SplitItem isFilled />
            {actionMenu && <SplitItem>{actionMenu}</SplitItem>}
          </Split>
          {typeof subtitle === 'string' ? (
            <Content component="p" ouiaId={`${ouiaId}-subtitle`}>
              {subtitle}
            </Content>
          ) : (
            subtitle
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
      </Flex>
    </PageSection>
  );
};

export default ContentHeader;
