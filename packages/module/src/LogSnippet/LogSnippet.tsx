import * as React from 'react';
import { CodeBlock, CodeBlockAction, CodeBlockCode, ClipboardCopyButton, Button, ClipboardCopy } from '@patternfly/react-core';

import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  logSnippet: {
    borderLeft: '2px solid var(--pf-v5-global--danger-color--100)',
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '6px',
    padding: '10px 0 10px 13px',
  },
  statusMessage: {
    marginBottom: '10px',
  },
});

interface LogSnippetProps {
  /** log snippet or code you would like to display */
  logSnippet?: string;
  /** message to appear above the log snippet */
  message: string;
}

const LogSnippet: React.FunctionComponent<LogSnippetProps> = ({ logSnippet, message }) => {
  const classes = useStyles();

  return (
    <div className={classes.logSnippet}>
      <p className={classes.statusMessage}>{message}</p>
      { logSnippet && <CodeBlock>
        <CodeBlockCode id="code-content">{logSnippet}</CodeBlockCode>
      </CodeBlock> }
    </div>
  )
};

export default LogSnippet;