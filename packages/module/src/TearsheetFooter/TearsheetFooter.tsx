import type { FunctionComponent } from 'react';
import { css } from '@patternfly/react-styles';
import { createUseStyles } from 'react-jss';
import { ModalFooter, type ModalFooterProps } from '@patternfly/react-core';

const useStyles = createUseStyles({
  tearsheetFooter: {
    flexShrink: 0,
  },
});

export interface TearsheetFooterProps extends ModalFooterProps {
  className: string;
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
