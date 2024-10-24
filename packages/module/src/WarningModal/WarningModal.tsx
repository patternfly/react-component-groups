import React, { useState } from 'react';
import { Button, ButtonVariant, Checkbox } from '@patternfly/react-core';
import { ModalProps, Modal, ModalVariant } from '@patternfly/react-core/deprecated';

/** extends ModalProps */
export interface WarningModalProps extends Omit<ModalProps, 'ref'> {
  /** Callback for the confirm action button. */
  onConfirm?: () => void;
  /** Custom label for the confirm action button */
  confirmButtonLabel?: string;
  /** Custom label for the cancel action button */
  cancelButtonLabel?: string;
  /** Whether modal requires a checkbox before confirming */
  withCheckbox?: boolean;
  /** Custom checkbox label */
  checkboxLabel?: string;
  /** Visual variant of the confirm button */
  confirmButtonVariant?: ButtonVariant;
  /** Custom OUIA ID */
  ouiaId?: string | number;
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
  withCheckbox = false,
  checkboxLabel='I understand that this action cannot be undone',
  confirmButtonVariant = ButtonVariant.primary,
  ouiaId = 'WarningModal',
  ...props
}: WarningModalProps) => {
  const [ checked, setChecked ] = useState(false);

  return (
    <Modal
      variant={variant}
      isOpen={isOpen}
      onClose={onClose}
      onEscapePress={onClose}
      titleIconVariant={titleIconVariant}
      actions={[
        <Button
          ouiaId={`${ouiaId}-confirm-button`}
          key="confirm"
          variant={confirmButtonVariant}
          onClick={() => {
            onConfirm?.();
            setChecked(false);
          }}
          isDisabled={withCheckbox && !checked}
        >
          {confirmButtonLabel}
        </Button>,
        <Button
          ouiaId={`${ouiaId}-cancel-button`}
          key="cancel"
          variant={ButtonVariant.link}
          onClick={onClose}
        >
          {cancelButtonLabel}
        </Button>,
      ]}
      ouiaId={ouiaId}
      {...props}
    >
      {children}
      {withCheckbox ? (
        <Checkbox
          isChecked={checked}
          onChange={(_event, value) => setChecked(value)}
          label={checkboxLabel}
          id="warning-modal-check"
          className="pf-v6-u-mt-lg"
          ouiaId={`${ouiaId}-confirm-checkbox`}
        />
      ) : null}
    </Modal>
  )

};


export default WarningModal;
