import React, { useState } from 'react';
import { Button, Checkbox, Modal, ModalProps, ModalVariant, Split, SplitItem, Stack, TextContent } from '@patternfly/react-core';
import { createUseStyles } from 'react-jss'


const useStyles = createUseStyles({
  rbacDeleteIcon: {
    marginRight: 'var(--pf-v5-global--spacer--xs)'
  },
})

export interface RemoveModalProps extends Omit<ModalProps, 'ref'|'children'> {
  /** Title for the Remove Modal. */
  title: string;
  /** Text inside the Remove Modal */
  text: string;
  /** Custom label for the cancel action button */
  confirmButtonLabel: string;
  /** Callback for the submit action button */
  onSubmit: () => void;
  /** Callback for the close action button */
  onClose: () => void;
  /** Whether Modal requires a checkbox before confirming */
  withCheckbox?: boolean,
  /** Custom message after confirmation */
  confirmCheckMessage: string,
}

const RemoveModal: React.FunctionComponent<RemoveModalProps> = ({
  title,
  text,
  onClose,
  onSubmit,
  isOpen,
  confirmButtonLabel,
  withCheckbox=false,
  confirmCheckMessage,
  ...props
}: RemoveModalProps) => {
  const classes = useStyles();
  const [ checked, setChecked ] = useState(false);

  return (
    <Modal
      className={classes.rbacDeleteIcon}
      title={title}
      titleIconVariant="warning"
      isOpen={isOpen}
      variant={ModalVariant.small}
      onClose={onClose}
      actions={[
        <Button key="confirm" ouiaId="primary-confirm-button" isDisabled={withCheckbox && !checked} variant="danger" onClick={onSubmit}>
          {confirmButtonLabel}
        </Button>,
        <Button key="cancel" ouiaId="secondary-cancel-button" variant="link" onClick={onClose}>
          Cancel
        </Button>,
      ]}
      {...props}
    >
      <Split hasGutter>
        <SplitItem isFilled>
          <Stack hasGutter>
            <TextContent>{text}</TextContent>
          </Stack>
        </SplitItem>
      </Split>
      {withCheckbox ? (
        <Checkbox
          isChecked={checked}
          onChange={() => setChecked(!checked)}
          label={confirmCheckMessage}
          id="remove-modal-check"
          className="pf-v5-u-mt-lg"
        />
      ) : null}
    </Modal>
  );
};

export default RemoveModal;

