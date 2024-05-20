import React from 'react';
import { Divider, Flex, FlexItem, Icon, Label, Split, SplitItem, Text } from '@patternfly/react-core';
import { ExternalLinkAltIcon } from '@patternfly/react-icons';
import ActionMenu, { ActionMenuProps, ActionMenuVariant } from '../ActionMenu/ActionMenu';

export interface ContentHeaderProps {
/** title for content header */ 
  title: string;
/** subtitle for content header */
  subtitle: string;
/** Optional link below subtitle */
  link?: string;
/** Optional icon for content header (appears to the left of the content header's title with a divider) */
  icon?: React.ReactNode
/** Optional badge for content header (appears to the right of the content header's title) */
  label?: React.ReactNode;
/** Breadcrumbs component */
  breadcrumbs?: React.ReactNode;
/** Menu that appears to the far right of the title */
  actionMenu?: ActionMenuProps;
  /** Custom OUIA ID */
  ouiaId?: string | number,
}

const ContentHeader: React.FunctionComponent<React.PropsWithChildren<ContentHeaderProps>> = ({
  title,
  subtitle,
  link,
  icon,
  label,
  breadcrumbs = null,
  actionMenu,
}: ContentHeaderProps) => (
  <>
    <div className="pf-v5-u-mb-md">
      {breadcrumbs}
    </div>
    <Flex>
      <FlexItem>
        <Icon>{icon}</Icon>
      </FlexItem>
      <Divider
        orientation={{
          default: 'vertical',
        }}
      />
      <FlexItem>
        <Split hasGutter>
          <SplitItem>
            <Text className="pf-v5-u-font-family-heading pf-v5-u-font-size-xl pf-v5-u-mb-md">{title}</Text>
          </SplitItem>
          <SplitItem>
            <Label isCompact color='purple' className='pf-v5-u-mb-md'>{label}</Label>
          </SplitItem>
          <SplitItem isFilled></SplitItem>
          <SplitItem>
            {/* Optional action menu - ungrouped actions */}
            {actionMenu?.actions && (
              <ActionMenu
                actions={actionMenu.actions}
                isDisabled={actionMenu?.isDisabled}
                variant={ActionMenuVariant.KEBAB}
                id={actionMenu?.id}
              />
            )}
          </SplitItem>
        </Split>
        <FlexItem>
          <Text className="pf-v5-u-font-family-text pf-v5-u-font-size-sm pf-v5-u-mb-md">
            {subtitle}
          </Text>
        </FlexItem>
        <FlexItem>
          <a
            href=""
            title=""
            target="_blank"
            rel="noreferrer"
          >
            {link} <ExternalLinkAltIcon />
          </a>          
        </FlexItem>
      </FlexItem>
    </Flex>
  </>
)
;

export default ContentHeader;