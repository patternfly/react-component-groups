import * as React from 'react';
import { CodeBlock, CodeBlockCode, Flex, FlexItem, } from '@patternfly/react-core';

import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  logSnippet: {
    borderLeft: '2px solid var(--pf-v5-global--danger-color--100)',
    marginLeft: 'var(--pf-v5-global--spacer--sm)',
    padding: 'var(--pf-v5-global--spacer--sm) 0 var(--pf-v5-global--spacer--sm) var(--pf-v5-global--spacer--sm)',
    backgroundColor: 'white'
  },
  statusMessage: {
    marginBottom: '10px',
  },
});

export interface LogSnippetProps {
  /** log snippet or code you would like to display */
  logSnippet?: string;
  /** message to appear above the log snippet */
  message: string;
}

export const LogSnippet: React.FunctionComponent<LogSnippetProps> = ({ logSnippet, message }) => {
  const classes = useStyles();

  return (
    <Flex direction={{ default: 'column' }} className={classes.logSnippet}>
      <FlexItem> <p className={classes.statusMessage}>{message}</p></FlexItem>
      { logSnippet && <FlexItem>
        <CodeBlock>
          <CodeBlockCode id="code-content">{logSnippet}</CodeBlockCode>
        </CodeBlock> 
      </FlexItem> }
    </Flex>
  )
};

export default LogSnippet;