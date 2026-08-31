import type { FunctionComponent, ReactNode } from 'react';
import { css } from '@patternfly/react-styles';
import { createUseStyles } from 'react-jss';
import { ModalHeader, type ModalHeaderProps } from '@patternfly/react-core';

const useStyles = createUseStyles({
  tearsheetHeader: {
    flexShrink: 0,
  },
});

export interface TearsheetHeaderProps extends ModalHeaderProps {
  /** Content rendered inside the tearsheet header. */
  children?: ReactNode;
  /** Additional classes applied to the tearsheet header. */
  className?: string;
}

const TearsheetHeader: FunctionComponent<TearsheetHeaderProps> = ({
  className,
  ...props
}: TearsheetHeaderProps) => {
  const classes = useStyles();
  return <ModalHeader className={css(classes.tearsheetHeader, className)} {...props} />;
};
TearsheetHeader.displayName = 'TearsheetHeader';

export default TearsheetHeader;
