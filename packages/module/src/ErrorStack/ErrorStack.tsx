import * as React from 'react';
import clsx from 'clsx';
import { Content } from '@patternfly/react-core';
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
      <Content className={clsx(classes.errorStack, className)} {...props} >
        {error.stack.split('\n').map((line) => (
          <div key={line}>{line}</div>
        ))}
      </Content>
    );
  }

  if (error.name && error.message) {
    return (
      <>
        <Content component="h6">{error.name}</Content>
        <Content className={clsx(classes.errorStack, className)} component="blockquote" {...props}>
          {error.message}
        </Content>
      </>
    );
  }

  return (
    <Content className={classes.errorStack} component="blockquote">
      {error.toString()}
    </Content>
  );
};

export default ErrorStack;
