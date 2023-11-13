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
    fontSize: 'var(--pf-v5-global--icon--FontSize--md)',
    textAlign: 'left',
    backgroundColor: 'white',
    borderStyle: 'solid',
    borderColor: 'var(--pf-v5-global--BackgroundColor--dark-300)',
    overflowWrap: 'break-word',
    padding: 'var(--pf-v5-global--spacer--sm)'
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
