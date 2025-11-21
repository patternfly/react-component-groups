import type { FunctionComponent, ReactNode } from 'react';
import { Modal, ModalBody, ModalProps } from '@patternfly/react-core';

export interface ModalDeckProps {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Deck component to display in the modal */
  children: ReactNode;
  /** Additional Modal props */
  modalProps?: Omit<ModalProps, 'isOpen' | 'children' | 'ref'>;
}

export const ModalDeck: FunctionComponent<ModalDeckProps> = ({
  isOpen,
  children,
  modalProps
}: ModalDeckProps) => (
  <Modal
    isOpen={isOpen}
    variant="small"
    {...modalProps}
  >
    <ModalBody>
      {children}
    </ModalBody>
  </Modal>
);

export default ModalDeck;

