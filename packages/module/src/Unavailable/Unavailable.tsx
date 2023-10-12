import React from 'react';
import { EmptyState, EmptyStateBody, EmptyStateHeader, EmptyStateIcon, EmptyStateVariant } from '@patternfly/react-core';
import { ExclamationCircleIcon } from '@patternfly/react-icons';
import { createUseStyles } from 'react-jss';
import clsx from 'clsx';

const useStyles = createUseStyles({
  emptyStateUnavailable: {
    color: 'var(--pf-global--danger-color--100)',
    '& svg': { color: 'var(--pf-global--danger-color--100)' }
  }
});

export interface UnavailableProps {
  /** Page to open when user clicks on status page link */
  statusPageUrl?: string;
}

const Unavailable: React.FunctionComponent<UnavailableProps> = ({ statusPageUrl = '' }: UnavailableProps) => {
  const classes = useStyles();
  return (
    <EmptyState variant={EmptyStateVariant.lg} className={clsx(classes.emptyStateUnavailable)}>
      <EmptyStateHeader title="This page is temporarily unavailable" icon={<EmptyStateIcon icon={ExclamationCircleIcon} />} />
      <EmptyStateBody>
        Try refreshing the page. If the problem persists, contact your organization administrator or visit our{' '}
        <a href={statusPageUrl} target="_blank" rel="noopener noreferrer">
          status page
        </a>{' '}
        for known outages.
      </EmptyStateBody>
    </EmptyState>
  );
};

export default Unavailable;
