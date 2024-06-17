import React from 'react';
import { Button, EmptyState, EmptyStateBody, EmptyStateProps, EmptyStateStatus, EmptyStateVariant } from '@patternfly/react-core';
import { ExclamationCircleIcon } from '@patternfly/react-icons';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  emptyStateLinkButton: {
    padding: '0',
  }
});

export interface UnavailableContentProps extends Omit<EmptyStateProps, 'children' | 'titleText' | 'bodyText'> {
  /** The URL that the status page link points to */
  statusPageUrl?: string;
  /** The text label for the link that points to the status page */
  statusPageLinkText?: string;
  /** The title for the unavailable content message */
  titleText?: string;
  /** The body text for the unavailable content message that appears before the status page link */
  preLinkBodyText?: string;
  /** The body text for the unavailable content message that appears after the status page link */
  postLinkBodyText?: string;
  /** Custom OUIA ID */
  ouiaId?: string | number;
}

const UnavailableContent: React.FunctionComponent<UnavailableContentProps> = ({ 
  statusPageUrl = '',
  statusPageLinkText = 'status page',
  titleText = 'This page is temporarily unavailable',
  preLinkBodyText = 'Try refreshing the page. If the problem persists, contact your organization administrator or visit our',
  postLinkBodyText = 'for known outages.',
  ouiaId = 'UnavailableContent',
  ...props 
}: UnavailableContentProps) => {
  const classes = useStyles();
  return (
    <EmptyState headingLevel="h5" status={EmptyStateStatus.danger} icon={ExclamationCircleIcon}  titleText={titleText} variant={EmptyStateVariant.lg} data-ouia-component-id={ouiaId} {...props}>
      <EmptyStateBody data-ouia-component-id={`${ouiaId}-body`}>
        {preLinkBodyText}{' '}
        <Button component='a' className={classes.emptyStateLinkButton} variant='link' href={statusPageUrl} target="_blank" rel="noopener noreferrer" ouiaId={`${ouiaId}-link-button`}>
          {statusPageLinkText}
        </Button>{' '}
        {postLinkBodyText}
      </EmptyStateBody>
    </EmptyState>
  );
};

export default UnavailableContent;
