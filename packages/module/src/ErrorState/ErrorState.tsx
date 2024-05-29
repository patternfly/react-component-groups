import { ExclamationCircleIcon } from '@patternfly/react-icons/';
import {
  Button,
  EmptyState,
  EmptyStateBody,
  EmptyStateFooter,
  EmptyStateProps,
  EmptyStateVariant,
  Stack,
  StackItem, 
} from '@patternfly/react-core';
import { createUseStyles } from 'react-jss'
import React from 'react';

const useStyles = createUseStyles({
  errorIcon: {
    fill: 'var(--pf-v5-global--danger-color--100)',
  },
  errorDescription: {
    margin: 'auto'
  }
})

export interface ErrorStateProps extends Omit<EmptyStateProps, 'children' | 'titleText' | 'bodyText'> {
  /** Title of the error. */
  titleText?: string;
  /** A description of the error, if no body text is provided then it will be set to the defaultBodyText. */
  bodyText?: React.ReactNode;
  /** A default description of the error used if no errorDescription is provided. */
  defaultBodyText?: React.ReactNode;
  /** Custom footer content */
  customFooter?: React.ReactNode;
  /** ErrorState OUIA ID */
  ouiaId?: string | number;
}

const ErrorState: React.FunctionComponent<ErrorStateProps> = ({ titleText = 'Something went wrong', bodyText, defaultBodyText, customFooter, ouiaId = "ErrorState", ...props }: ErrorStateProps) => { 
  const classes = useStyles();
  return (
    <EmptyState headingLevel="h4" icon={ExclamationCircleIcon} variant={EmptyStateVariant.lg} {...props} titleText={titleText}>
      {/* <Icon className={classes.errorIcon} icon={ExclamationCircleIcon} data-ouia-component-id={`${ouiaId}-icon`} /> */}
      <EmptyStateBody data-ouia-component-id={`${ouiaId}-body`}>
        <Stack>
          {bodyText ? <StackItem className={classes.errorDescription}>{bodyText}</StackItem> : defaultBodyText}
        </Stack>
      </EmptyStateBody>
      <EmptyStateFooter data-ouia-component-id={`${ouiaId}-footer`}>
        { customFooter ||
          (document.referrer ? (
            <Button variant="primary" onClick={() => history.back()} ouiaId={`${ouiaId}-back-button`}>
              Return to last page
            </Button>
          ) : (
            <Button variant="primary" component="a" href="." target="_blank" rel="noopener noreferrer" ouiaId={`${ouiaId}-home-button`}>
              Go to home page
            </Button>
          ))}
      </EmptyStateFooter>
    </EmptyState>
  );
}

export default ErrorState;
