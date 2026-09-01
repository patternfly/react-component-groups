import type { FunctionComponent, ReactNode } from 'react';
import { ModalBody, type ModalBodyProps } from '@patternfly/react-core';

export interface TearsheetBodyProps extends ModalBodyProps {
  /** Content rendered inside the tearsheet body. */
  children?: ReactNode;
  /** Additional classes applied to the tearsheet body. */
  className?: string;
}

const TearsheetBody: FunctionComponent<TearsheetBodyProps> = ({ className, ...props }: TearsheetBodyProps) => <ModalBody className={className} tabIndex={0} {...props} />;
TearsheetBody.displayName = 'TearsheetBody';

export default TearsheetBody;