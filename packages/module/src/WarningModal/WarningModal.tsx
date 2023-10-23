import React from 'react';
import { Button, ModalProps, Modal, ModalVariant, ButtonVariant, variantIcons, } from '@patternfly/react-core';

export interface WarningModalProps extends Omit<ModalProps, 'ref'> {
  /** Callback for the confirm action button. */
  onConfirm?: () => void;
  /** Custom label for the confirm action button */
  confirmButtonLabel? : string;
  /** Custom label for the cancel action button */
  cancelButtonLabel? : string;
}

const WarningModal: React.FunctionComponent<WarningModalProps> = ({
  isOpen,
  onConfirm,
  onClose,
  children,
  confirmButtonLabel = 'Confirm',
  cancelButtonLabel = 'Cancel',
  variant = ModalVariant.small,
  titleIconVariant = 'warning',
  ...props
}: WarningModalProps) => (
  <Modal
    variant={variant}
    isOpen={isOpen}
    onClose={onClose}
    onEscapePress={onClose}
    titleIconVariant={titleIconVariant}
    actions={[
      <Button
        ouiaId="primary-confirm-button"
        key="confirm"
        variant={ButtonVariant.primary}
        onClick={onConfirm}
      >
        {confirmButtonLabel}
      </Button>,
      <Button
        ouiaId="secondary-cancel-button"
        key="cancel"
        variant={ButtonVariant.link}
        onClick={onClose}
      >
        {cancelButtonLabel}
      </Button>,
    ]}
    {...props}
  >
    {children}
  </Modal>
);


export default WarningModal;
