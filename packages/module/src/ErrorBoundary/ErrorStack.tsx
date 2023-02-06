import * as React from 'react';
import { Text } from '@patternfly/react-core';
import { createUseStyles } from 'react-jss';
import { global_BackgroundColor_dark_300 as backgroundDark } from '@patternfly/react-tokens/dist/js/global_BackgroundColor_dark_300';
import { global_icon_FontSize_md as iconMd } from '@patternfly/react-tokens/dist/js/global_icon_FontSize_md';
import { global_spacer_sm as spacerSm } from '@patternfly/react-tokens/dist/js/global_spacer_sm';

interface ErrorStackProps {
  error: Error;
}

const useStyles = createUseStyles({
  errorStack: {
    fontFamily: 'monospace',
    fontSize: iconMd.value,
    textAlign: 'left',
    backgroundColor: 'white',
    borderStyle: 'solid',
    borderColor: backgroundDark.value,
    overflowWrap: 'break-word',
    padding: spacerSm.value
  },
})

const ErrorStack: React.FunctionComponent<ErrorStackProps> = ({ error }) => {
  const classes = useStyles();
  if (error.stack) {
    return (
      <Text className={classes.errorStack}>
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
        <Text className={classes.errorStack} component="blockquote">
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
