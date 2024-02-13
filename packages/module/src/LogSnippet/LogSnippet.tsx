import * as React from 'react';
import { CodeBlock, CodeBlockCode, Flex, FlexItem, Text, TextVariants } from '@patternfly/react-core';

import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  logSnippet: {
    borderLeft: '2px solid var(--pf-v5-global--danger-color--100)',
    marginLeft: 'var(--pf-v5-global--spacer--sm)',
    padding: 'var(--pf-v5-global--spacer--sm) 0 var(--pf-v5-global--spacer--sm) var(--pf-v5-global--spacer--sm)',
    backgroundColor: 'var(--pf-v5-global--palette--black-100)'
  },
  statusMessage: {
    marginBottom:'var(--pf-v5-global--spacer--sm)',
  },
});

export interface LogSnippetProps {
  /** Log snippet or code to be displayed */
  logSnippet?: string;
  /** Message to appear above the log snippet */
  message: string;
}

export const LogSnippet: React.FunctionComponent<LogSnippetProps> = ({ logSnippet, message }) => {
  const classes = useStyles();

  return (
    <Flex direction={{ default: 'column' }} className={classes.logSnippet}>
      <FlexItem>
        <Text component={TextVariants.p} className={classes.statusMessage}>
          {message}
        </Text>
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