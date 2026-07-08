import type { ReactNode, HTMLProps, FunctionComponent, MouseEvent } from 'react';
import { css } from '@patternfly/react-styles';
import styles from '@patternfly/react-styles/css/components/Tearsheet/tearsheet';
import { Modal, ModalVariant } from '@patternfly/react-core';

export interface TearsheetProps extends HTMLProps<HTMLDivElement> {
  /** Content rendered inside the tearsheet. Should be TearsheetHeader, TearsheetBody, and/or TearsheetFooter. */
  children: ReactNode;
  /** Additional classes added to the tearsheet. */
  className?: string;
  /** Flag to show the tearsheet. */
  isOpen?: boolean;
  /** Visual stack level of the tearsheet. Managed automatically by TearsheetGroup.
   * When used standalone: 0 (back), 1 (middle), 2 (front).
   * TearsheetGroup may also assign -1 (hidden behind the stack). */
  stackLevel?: number;
  /** A callback for when the close button is clicked. This prop needs to be passed to render the close button. */
  onClose?: (event: KeyboardEvent | MouseEvent) => void;
  /** A callback for when the tearsheet is closed via the escape key. */
  onEscapePress?: (event: KeyboardEvent) => void;
  /** The parent container to append the tearsheet to. Defaults to document.body. */
  appendTo?: HTMLElement | (() => HTMLElement);
  /** Accessible label for the tearsheet. */
  'aria-label'?: string;
  /** ID of the element that labels the tearsheet. */
  'aria-labelledby'?: string;
  /** ID of the element that describes the tearsheet. */
  'aria-describedby'?: string;
  /** Flag to disable focus trap. */
  disableFocusTrap?: boolean;
}

const Tearsheet: FunctionComponent<TearsheetProps> = ({
  children,
  className,
  isOpen = false,
  stackLevel: stackLevelProp,
  onClose,
  onEscapePress,
  appendTo,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  'aria-describedby': ariaDescribedBy,
  disableFocusTrap,
  ...props
}: TearsheetProps) => {
  const stackLevel = stackLevelProp ?? 0;
  const stackLevelClassname = stackLevel < 0 ? 'pf-m-stack-hidden' : `pf-m-stack-level-${stackLevel}`;

  return (
    <Modal
      animated
      className={css(styles.tearsheet, stackLevelClassname)}
      isOpen={isOpen}
      variant={ModalVariant.large}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      aria-describedby={ariaDescribedBy}
      onClose={onClose}
      onEscapePress={onEscapePress}
      appendTo={appendTo}
      disableFocusTrap={disableFocusTrap}
    >
      <div className={css(styles.tearsheetInner, className)} {...props}>
        {children}
      </div>
    </Modal>
  );
};
Tearsheet.displayName = 'Tearsheet';

export default Tearsheet;
