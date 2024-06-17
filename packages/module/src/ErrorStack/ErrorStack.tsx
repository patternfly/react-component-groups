import * as React from 'react';
import clsx from 'clsx';
import { Text } from '@patternfly/react-core';
import { createUseStyles } from 'react-jss';

export interface ErrorStackProps {
  /** Error object to be displayed in the stack */
  error: Error;
  /** Custom className */
  className?: string;
}

const useStyles = createUseStyles({
  errorStack: {
    fontFamily: 'monospace',
    fontSize: 'var(--pf-t--global--font--size--300)',
    textAlign: 'left',
    backgroundColor: 'white',
    borderStyle: 'solid',
    borderColor: 'var(--pf-t--color--gray--90)',
    overflowWrap: 'break-word',
    padding: 'var(--pf-t--global--spacer--200)'
  },
})

export const ErrorStack: React.FunctionComponent<ErrorStackProps> = ({ error, className, ...props }) => {
  const classes = useStyles();

  if (error.stack) {
    return (
      <Text className={clsx(classes.errorStack, className)} {...props} >
        {error.stack.split('\n').map((line) => (
          <div key={line}>{line}</div>
        ))}
      </Text>
    );
  }

  if (error.name && error.message) {
    return (
      <>
        <Text component="h6">{error.name}</Text>
        <Text className={clsx(classes.errorStack, className)} component="blockquote" {...props}>
          {error.message}
        </Text>
      </>
    );
  }

  return (
    <Text className={classes.errorStack} component="blockquote">
      {error.toString()}
    </Text>
  );
};

export default ErrorStack;
