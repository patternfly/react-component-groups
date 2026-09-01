import type { FunctionComponent, ReactNode } from 'react';
import { ModalFooter, type ModalFooterProps } from '@patternfly/react-core';

export interface TearsheetFooterProps extends ModalFooterProps {
  /** Content rendered inside the tearsheet footer. */
  children?: ReactNode;
  /** Additional classes applied to the tearsheet footer. */
  className?: string;
}

export const TearsheetFooter: FunctionComponent<TearsheetFooterProps> = ({
  className,
  ...props
}: TearsheetFooterProps) => <ModalFooter className={className} {...props} />;
TearsheetFooter.displayName = 'TearsheetFooter';

export default TearsheetFooter;
