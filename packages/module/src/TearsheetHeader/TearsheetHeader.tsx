import type { FunctionComponent } from 'react';
import { css } from '@patternfly/react-styles';
import styles from '@patternfly/react-styles/css/components/Tearsheet/tearsheet';
import { ModalHeader, type ModalHeaderProps } from '@patternfly/react-core';

export interface TearsheetHeaderProps extends ModalHeaderProps {
  className: string;
}

const TearsheetHeader: FunctionComponent<TearsheetHeaderProps> = ({
  className,
  ...props
}: TearsheetHeaderProps) => <ModalHeader className={css(styles.tearsheetHeader, className)} {...props} />;
TearsheetHeader.displayName = 'TearsheetHeader';

export default TearsheetHeader;
