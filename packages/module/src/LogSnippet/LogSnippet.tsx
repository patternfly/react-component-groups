import * as React from 'react';
import { CodeBlock, CodeBlockCode, Flex, FlexItem, FlexProps, Text, TextVariants } from '@patternfly/react-core';
import clsx from 'clsx';
import { createUseStyles } from 'react-jss'

export type BorderVariant = 'red' | 'green' | 'blue' | 'cyan' | 'gold' | 'orange' | 'purple'

export interface LogSnippetProps extends FlexProps {
  /** Log snippet or code to be displayed */
  logSnippet?: string;
  /** Message to appear above the log snippet */
  message: string | React.ReactNode;
  /** Custom color for left border */
  leftBorderVariant?: BorderVariant
}

const useStyles = createUseStyles({
  logSnippet: {
    marginLeft: 'var(--pf-v5-global--spacer--sm)',
    padding: 'var(--pf-v5-global--spacer--sm) 0 var(--pf-v5-global--spacer--sm) var(--pf-v5-global--spacer--sm)',
    backgroundColor: 'var(--pf-v5-global--palette--black-100)'
  },
  redBorder: {
    borderLeft: 'var(--pf-v5-global--BorderWidth--md) solid var(--pf-v5-global--danger-color--100)',
  },
  variantBorderColor: {
    borderLeft: (props) => `var(--pf-v5-global--BorderWidth--md) solid var(--pf-v5-global--palette--${props.leftBorderVariant}-100)`,
  },
  statusMessage: {
    marginBottom:'var(--pf-v5-global--spacer--sm)',
  },
});



export const LogSnippet: React.FunctionComponent<LogSnippetProps> = ({ logSnippet, message, leftBorderVariant, ...props }) => {
  const classes = useStyles(props);

  const displayMessage = () => {
    if(typeof message === 'string') {
      return (
        <Text component={TextVariants.p} className={classes.statusMessage}>
          {message}
        </Text>
      )
    } else {
      return message
    }
  }

  return (
    <Flex direction={{ default: 'column' }} className={clsx(classes.logSnippet, { [classes.redBorder]: leftBorderVariant }, { [classes.redBorder]: !props.leftBorderVariant })} {...props}>
      <FlexItem>
        { displayMessage() }
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