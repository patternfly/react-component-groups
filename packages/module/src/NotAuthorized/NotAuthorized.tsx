import React from 'react';
import { Button, EmptyState, EmptyStateBody, EmptyStateIcon, EmptyStateProps, EmptyStateVariant, Title } from '@patternfly/react-core';
import { LockIcon } from '@patternfly/react-icons';
import { createUseStyles } from 'react-jss';

export interface NotAuthorizedProps extends Omit<EmptyStateProps, 'children' | 'title'> {
  /** Service name displayed in the title */
  serviceName?: string;
  /** Icon displayed above the title */
  icon?: React.ComponentType;
  /** Custom description */
  description?: React.ReactNode;
  /** Shows link to the previous page */
  showReturnButton?: boolean;
  /** Custom previous page button text */
  prevPageButtonText?: React.ReactNode;
  /** Custom className */
  className?: string;
  /** Custom title */
  title?: React.ReactNode;
  /** Custom state actions */
  actions?: React.ReactNode;
  /** Custom landing page button text */
  toLandingPageText?: React.ReactNode;
  /** Custom landing page button URL */
  toLandingPageUrl?: string;
}

const useStyles = createUseStyles({
  title: {
    maxWidth: '540px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
})

export const NotAuthorized: React.FunctionComponent<NotAuthorizedProps> = ({
  prevPageButtonText = 'Return to previous page',
  toLandingPageText = 'Go to landing page',
  toLandingPageUrl = ".",
  actions = null,
  serviceName,
  title = `You do not have access to ${serviceName}`,
  icon: Icon = LockIcon,
  description = 'Contact your system administrator(s) for more information.',
  showReturnButton = true,
  className,
  ...props
}: NotAuthorizedProps) => {
  const classes = useStyles();

  return (
    <EmptyState variant={EmptyStateVariant.full} className={className} {...props}>
      <EmptyStateIcon icon={Icon} />
      <Title className={classes.title} headingLevel="h5" size="lg">
        {title}
      </Title>
      <EmptyStateBody>{description}</EmptyStateBody>
      {actions}
      {showReturnButton &&
        (document.referrer ? (
          <Button variant="primary" onClick={() => history.back()}>
            {prevPageButtonText}
          </Button>
        ) : (
          <Button variant="primary" component="a" href={toLandingPageUrl}>
            {toLandingPageText}
          </Button>
        ))}
    </EmptyState>
  );
};

export default NotAuthorized;
