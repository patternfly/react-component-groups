import type { FunctionComponent, ReactNode } from 'react';
import { ModalHeader, type ModalHeaderProps } from '@patternfly/react-core';

export interface TearsheetHeaderProps extends ModalHeaderProps {
  /** Content rendered inside the tearsheet header. */
  children?: ReactNode;
  /** Additional classes applied to the tearsheet header. */
  className?: string;
}

const TearsheetHeader: FunctionComponent<TearsheetHeaderProps> = ({
  className,
  ...props
}: TearsheetHeaderProps) => <ModalHeader className={className} {...props} />;
TearsheetHeader.displayName = 'TearsheetHeader';

export default TearsheetHeader;
