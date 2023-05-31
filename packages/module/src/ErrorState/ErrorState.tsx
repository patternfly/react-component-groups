import React from 'react';
import { ExclamationCircleIcon } from '@patternfly/react-icons/';
import DefaultErrorMessage from './DefaultErrorMessage';
import {
  Button,
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  EmptyStateProps,
  EmptyStateVariant,
  Stack,
  StackItem, EmptyStateHeader, EmptyStateFooter,
  } from '@patternfly/react-core';
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  errorIcon: {
    fill: 'var(--pf-global--danger-color--100)',
  },
})

export interface ErrorStateProps extends Omit<EmptyStateProps, 'children'> {
  /** Title of the error. */
  errorTitle?: string;
  /** A description of the error, if no description is provided then it will be set to the default message. */
  errorDescription?: React.ReactNode;
}

const ErrorState: React.FunctionComponent<ErrorStateProps> = ({ errorTitle = 'Something went wrong', errorDescription, ...props }) => {
  const classes = useStyles();
  return (
    <EmptyState variant={EmptyStateVariant.lg} {...props}>
      <EmptyStateHeader titleText={<>{errorTitle}</>} icon={<EmptyStateIcon  className={classes.errorIcon} icon={ExclamationCircleIcon} />} headingLevel="h4" />
      <EmptyStateBody>
        <Stack>
          {!errorDescription && <StackItem>There was a problem processing the request. Please try again.</StackItem>}
          <StackItem>{errorDescription || <DefaultErrorMessage />}</StackItem>
        </Stack>
      </EmptyStateBody><EmptyStateFooter>
      {document.referrer ? (
        <Button variant="primary" onClick={() => history.back()}>
          Return to last page
        </Button>
      ) : (
        <Button variant="primary" component="a" href="." target="_blank" rel="noopener noreferrer">
          Go to home page
        </Button>
      )}
    </EmptyStateFooter></EmptyState>
  );
}

export default ErrorState;
