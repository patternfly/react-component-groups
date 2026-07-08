import type { FunctionComponent } from 'react';
import { css } from '@patternfly/react-styles';
import styles from '@patternfly/react-styles/css/components/Tearsheet/tearsheet';
import { ModalFooter, type ModalFooterProps } from '@patternfly/react-core';

export interface TearsheetFooterProps extends ModalFooterProps {
  className: string;
}

export const TearsheetFooter: FunctionComponent<TearsheetFooterProps> = ({
  className,
  ...props
}: TearsheetFooterProps) => <ModalFooter className={css(styles.tearsheetFooter, className)} {...props} />;
TearsheetFooter.displayName = 'TearsheetFooter';

export default TearsheetFooter;
