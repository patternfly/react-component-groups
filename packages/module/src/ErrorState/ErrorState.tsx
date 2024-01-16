import { ExclamationCircleIcon } from '@patternfly/react-icons/';
import {
  Button,
  EmptyState,
  EmptyStateBody,
  EmptyStateFooter,
  EmptyStateHeader,
  EmptyStateIcon,
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
})

export interface ErrorStateProps extends Omit<EmptyStateProps, 'children'> {
  /** Title of the error. */
  errorTitle?: string;
  /** A description of the error, if no description is provided then it will be set to the defaultErrorDescription. */
  errorDescription?: React.ReactNode;
  /** A default description of the error used if no errorDescription is provided. */
  defaultErrorDescription?: React.ReactNode;
  /** Custom footer content */
  customFooter?: React.ReactNode;
}

const ErrorState: React.FunctionComponent<ErrorStateProps> = ({ errorTitle = 'Something went wrong', errorDescription, defaultErrorDescription, customFooter, ...props }: ErrorStateProps) => { 
  const classes = useStyles();
  return (
    <EmptyState variant={EmptyStateVariant.lg} {...props}>
      <EmptyStateHeader titleText={<>{errorTitle}</>} icon={<EmptyStateIcon className={classes.errorIcon} icon={ExclamationCircleIcon} />} headingLevel="h4" />
      <EmptyStateBody>
        <Stack>
          {errorDescription ? <StackItem>{errorDescription}</StackItem> : defaultErrorDescription}
        </Stack>
      </EmptyStateBody>
      <EmptyStateFooter>
        { customFooter ||
          (document.referrer ? (
            <Button variant="primary" onClick={() => history.back()}>
            Return to last page
            </Button>
          ) : (
            <Button variant="primary" component="a" href="." target="_blank" rel="noopener noreferrer">
            Go to home page
            </Button>
          ))}
      </EmptyStateFooter>
    </EmptyState>
  );
}

export default ErrorState;
