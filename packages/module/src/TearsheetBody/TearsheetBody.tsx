import type { FunctionComponent, ReactNode } from 'react';
import { css } from '@patternfly/react-styles';
import { createUseStyles } from 'react-jss';
import { ModalBody, type ModalBodyProps } from '@patternfly/react-core';

const useStyles = createUseStyles({
  tearsheetBody: {
    flex: 1,
    minHeight: 0,
    overflow: 'auto',
  },
});

export interface TearsheetBodyProps extends ModalBodyProps {
  /** Content rendered inside the tearsheet body. */
  children?: ReactNode;
  /** Additional classes applied to the tearsheet body. */
  className?: string;
}

const TearsheetBody: FunctionComponent<TearsheetBodyProps> = ({ className, ...props }: TearsheetBodyProps) => {
  const classes = useStyles();
  return <ModalBody className={css(classes.tearsheetBody, className)} tabIndex={0} {...props} />;
};
TearsheetBody.displayName = 'TearsheetBody';

export default TearsheetBody;