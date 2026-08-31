import type { FunctionComponent, ReactNode } from 'react';
import { css } from '@patternfly/react-styles';
import { createUseStyles } from 'react-jss';
import { ModalFooter, type ModalFooterProps } from '@patternfly/react-core';

const useStyles = createUseStyles({
  tearsheetFooter: {
  },
});

export interface TearsheetFooterProps extends ModalFooterProps {
  /** Content rendered inside the tearsheet footer. */
  children?: ReactNode;
  /** Additional classes applied to the tearsheet footer. */
  className?: string;
}

export const TearsheetFooter: FunctionComponent<TearsheetFooterProps> = ({
  className,
  ...props
}: TearsheetFooterProps) => {
  const classes = useStyles();
  return <ModalFooter className={css(classes.tearsheetFooter, className)} {...props} />;
};
TearsheetFooter.displayName = 'TearsheetFooter';

export default TearsheetFooter;
