import type { ReactNode, HTMLProps, FunctionComponent, MouseEvent } from 'react';
import { css } from '@patternfly/react-styles';
import { createUseStyles } from 'react-jss';
import { Modal, ModalVariant, type ModalProps } from '@patternfly/react-core';

const useStyles = createUseStyles({
  tearsheet: {
    width: 'calc(100% - 4rem) !important',
    maxWidth: 'calc(100% - 4rem) !important',
    height: 'calc(100% - 4rem) !important',
    maxHeight: 'calc(100% - 4rem) !important',
    insetBlockStart: '2rem !important',
    borderBottomLeftRadius: '0',
    borderBottomRightRadius: '0',
    '&.pf-v6-c-modal-animated': {
      '--pf-v6-c-modal-animated--Transition':
        'width 300ms ease, max-width 300ms ease, height 300ms ease, max-height 300ms ease, top 300ms ease, opacity 240ms cubic-bezier(0.4, 0.14, 1, 1), transform 240ms cubic-bezier(0.4, 0.14, 1, 1), visibility 0ms linear 240ms',
    },
    '&.pf-v6-c-modal-animated-open': {
      '--pf-v6-c-modal-animated--Transition':
        'width 300ms ease, max-width 300ms ease, height 300ms ease, max-height 300ms ease, top 300ms ease, transform 240ms cubic-bezier(0, 0, 0.2, 1), visibility 0ms linear 0ms',
    },
    '&.pf-m-stack-level-1': {
      width: 'calc(100% - 2rem) !important',
      maxWidth: 'calc(100% - 2rem) !important',
      height: 'calc(100% - 6rem) !important',
      maxHeight: 'calc(100% - 6rem) !important',
      insetBlockStart: '3rem !important',
    },
    '&.pf-m-stack-level-2': {
      width: 'calc(100% - 0rem) !important',
      maxWidth: 'calc(100% - 0rem) !important',
      height: 'calc(100% - 8rem) !important',
      maxHeight: 'calc(100% - 8rem) !important',
      insetBlockStart: '4rem !important',
    },
    '&.pf-m-stack-hidden': {
      width: 'calc(100% - 4rem) !important',
      maxWidth: 'calc(100% - 4rem) !important',
      height: 'calc(100% - 4rem) !important',
      maxHeight: 'calc(100% - 4rem) !important',
      insetBlockStart: '3rem !important',
      opacity: '0 !important',
      pointerEvents: 'none !important',
    },
  },
  tearsheetInner: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    flex: '1 1 auto',
    minHeight: 0,
    marginInlineEnd: 0,
  },
});

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
  /** Accessible name for the tearsheet as a human readable string. */
  'aria-label'?: string;
  /** Space separated list of ID's of the elements that label the tearsheet. */
  'aria-labelledby'?: string;
  /** ISpace separated list of ID's of the elements that describe the tearsheet. */
  'aria-describedby'?: string;
  /** Additional props spread to the underlying PatternFly Modal. */
  modalProps?: Omit<ModalProps, 'isOpen' | 'children' | 'ref' | 'className' | 'variant' | 'aria-label' | 'aria-labelledby' | 'aria-describedby' | 'onClose' | 'onEscapePress' | 'appendTo'>;
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
  modalProps,
  ...props
}: TearsheetProps) => {
  const classes = useStyles();
  const stackLevel = stackLevelProp ?? 0;
  const stackLevelClassname = stackLevel < 0 ? 'pf-m-stack-hidden' : `pf-m-stack-level-${stackLevel}`;

  return (
    <Modal
      className={css(classes.tearsheet, stackLevelClassname)}
      isOpen={isOpen}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      aria-describedby={ariaDescribedBy}
      onClose={onClose}
      onEscapePress={onEscapePress}
      appendTo={appendTo}
      {...modalProps}
    >
      <div className={css(classes.tearsheetInner, className)} {...props}>
        {children}
      </div>
    </Modal>
  );
};
Tearsheet.displayName = 'Tearsheet';

export default Tearsheet;
