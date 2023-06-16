import React from 'react';
import { ExclamationCircleIcon } from '@patternfly/react-icons/';
import {
  Button,
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  EmptyStateProps,
  EmptyStateVariant,
  Stack,
  StackItem,
  Title,
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
  /** A description of the error, if no description is provided then it will be set to the defaulErrorDescription. */
  errorDescription?: React.ReactNode;
  /** A default description of the error used if no errorDescription is provided. */
  defaulErrorDescription?: React.ReactNode;
}

const ErrorState: React.FunctionComponent<ErrorStateProps> = ({ errorTitle = 'Something went wrong', errorDescription, defaulErrorDescription, ...props }: ErrorStateProps) => { 
  const classes = useStyles();
  return (
    <EmptyState variant={EmptyStateVariant.large} {...props}>
      <EmptyStateIcon  className={classes.errorIcon} icon={ExclamationCircleIcon} />
      <Title headingLevel="h4" size="lg">
        {errorTitle}
      </Title>
      <EmptyStateBody>
        <Stack>
          {errorDescription ? <StackItem>{errorDescription}</StackItem> : defaulErrorDescription}
        </Stack>
      </EmptyStateBody>
      {document.referrer ? (
        <Button variant="primary" onClick={() => history.back()}>
          Return to last page
        </Button>
      ) : (
        <Button variant="primary" component="a" href="." target="_blank" rel="noopener noreferrer">
          Go to home page
        </Button>
      )}
    </EmptyState>
  );
}

export default ErrorState;
