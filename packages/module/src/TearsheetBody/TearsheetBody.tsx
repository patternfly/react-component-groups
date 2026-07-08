import type { FunctionComponent } from 'react';
import { css } from '@patternfly/react-styles';
import styles from '@patternfly/react-styles/css/components/Tearsheet/tearsheet';
import { ModalBody, type ModalBodyProps } from '@patternfly/react-core';

export interface TearsheetBodyProps extends ModalBodyProps {
  className: string;
}

const TearsheetBody: FunctionComponent<TearsheetBodyProps> = ({ className, ...props }: TearsheetBodyProps) => (
  <ModalBody className={css(styles.tearsheetBody, className)} tabIndex={0} {...props} />
);
TearsheetBody.displayName = 'TearsheetBody';

export default TearsheetBody;