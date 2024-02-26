import * as React from 'react';
import { CodeBlock, CodeBlockCode, Flex, FlexItem, FlexProps, Text, TextVariants } from '@patternfly/react-core';
import clsx from 'clsx';
import { createUseStyles } from 'react-jss'

export type LogSnippetBorderVariant = 'danger' | 'success' | 'info' | 'warning';

export interface LogSnippetProps extends FlexProps {
  /** Log snippet or code to be displayed */
  logSnippet?: string;
  /** Message to appear above the log snippet */
  message: string | React.ReactNode;
  /** Custom color for left border */
  leftBorderVariant?: LogSnippetBorderVariant;
}

const useStyles = createUseStyles({
  logSnippet: {
    marginLeft: 'var(--pf-v5-global--spacer--sm)',
    padding: 'var(--pf-v5-global--spacer--sm) 0 var(--pf-v5-global--spacer--sm) var(--pf-v5-global--spacer--sm)',
    backgroundColor: 'var(--pf-v5-global--BackgroundColor--100)',
  },
  variantBorderColor: (leftBorderVariant: string) => ({
    borderLeft: `var(--pf-v5-global--BorderWidth--md) solid var(--pf-v5-global--${leftBorderVariant}-color--100)`,
  }),
  statusMessage: {
    marginBottom:'var(--pf-v5-global--spacer--sm)',
  },
});



export const LogSnippet: React.FunctionComponent<LogSnippetProps> = ({ logSnippet, message, leftBorderVariant = 'danger', ...props }: LogSnippetProps) => {
  const classes = useStyles(leftBorderVariant);

  return (
    <Flex direction={{ default: 'column' }} className={clsx(classes.logSnippet, classes.variantBorderColor)} {...props}>
      <FlexItem>
        { typeof message === 'string' ? <Text component={TextVariants.p} className={classes.statusMessage}>{message}</Text> : message }
      </FlexItem>
      { logSnippet && <FlexItem>
        <CodeBlock>
          <CodeBlockCode id="code-content">{logSnippet}</CodeBlockCode>
        </CodeBlock> 
      </FlexItem> }
    </Flex>
  )
};

export default LogSnippet;