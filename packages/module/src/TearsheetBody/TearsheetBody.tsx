import type { FunctionComponent } from 'react';
import { css } from '@patternfly/react-styles';
import { createUseStyles } from 'react-jss';
import { ModalBody, type ModalBodyProps } from '@patternfly/react-core';

const useStyles = createUseStyles({
  tearsheetBody: {
    caretColor: 'red',
  },
});

export interface TearsheetBodyProps extends ModalBodyProps {
  className: string;
}

const TearsheetBody: FunctionComponent<TearsheetBodyProps> = ({ className, ...props }: TearsheetBodyProps) => {
  const classes = useStyles();
  return <ModalBody className={css(classes.tearsheetBody, className)} tabIndex={0} {...props} />;
};
TearsheetBody.displayName = 'TearsheetBody';

export default TearsheetBody;