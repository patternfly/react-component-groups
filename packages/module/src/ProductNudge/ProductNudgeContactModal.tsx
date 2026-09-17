import React, { FunctionComponent, useState } from 'react';

import {
  ActionGroup,
  Alert,
  Button,
  Content,
  Flex,
  FlexItem,
  Form,
  FormAlert,
  FormGroup,
  HelperText,
  HelperTextItem,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalVariant,
  TextArea,
  TextInput,
} from '@patternfly/react-core';

import { interpolateMessageTemplate } from './interpolateMessageTemplate';
import { ContactFormValues, ProductNudgeContactModalProps } from './ProductNudge.types';

type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

const isValidEmail = (value: string) => /\S+@\S+\.\S+/.test(value);

/**
 * A contact form modal for product nudge CTAs. Handles idle/submitting/success/error
 * states. Transport is injected via `onSubmit` — the modal is transport-agnostic.
 * Pass `footerContent` to render partner logos or other branding in the footer;
 * images in footerContent should use `style={{ maxHeight: '1.5rem', maxWidth: '5rem' }}`.
 */
export const ProductNudgeContactModal: FunctionComponent<ProductNudgeContactModalProps> = ({
  isOpen,
  onClose,
  content,
  metrics = [],
  prefillName = '',
  prefillEmail = '',
  onSubmit,
  footerContent,
  className,
}) => {
  const [name, setName] = useState(prefillName);
  const [email, setEmail] = useState(prefillEmail);
  const [contactPerson, setContactPerson] = useState('');
  const [message, setMessage] = useState(() =>
    interpolateMessageTemplate(content.messageTemplate, metrics),
  );
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [touchedEmail, setTouchedEmail] = useState(false);

  const emailIsValid = !touchedEmail || isValidEmail(email);

  const resetForm = () => {
    setName(prefillName);
    setEmail(prefillEmail);
    setContactPerson('');
    setMessage(interpolateMessageTemplate(content.messageTemplate, metrics));
    setSubmitState('idle');
    setTouchedEmail(false);
  };

  const handleClose = () => {
    onClose();
    resetForm();
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!name || !isValidEmail(email) || !message) {
      setTouchedEmail(true);
      return;
    }

    const values: ContactFormValues = { name, email, contactPerson, message };
    setSubmitState('submitting');
    try {
      await onSubmit(values);
      setSubmitState('success');
    } catch {
      setSubmitState('error');
    }
  };

  const renderBody = () => {
    if (submitState === 'success') {
      return (
        <Alert
          variant="success"
          isInline
          isPlain
          title={content.successMessage}
          data-testid="contact-modal-success"
        />
      );
    }

    return (
      <Form onSubmit={handleSubmit}>
        <Content component="p">{content.intro}</Content>
        {submitState === 'error' && (
          <FormAlert>
            <Alert
              variant="danger"
              isInline
              title="We couldn't send your request"
              data-testid="contact-modal-error"
            >
              Try again, or contact your account team directly.
            </Alert>
          </FormAlert>
        )}
        <FormGroup label="Name" isRequired fieldId="product-nudge-contact-name">
          <TextInput
            isRequired
            id="product-nudge-contact-name"
            value={name}
            onChange={(_event, value) => setName(value)}
          />
        </FormGroup>
        <FormGroup label="Work email" isRequired fieldId="product-nudge-contact-email">
          <TextInput
            isRequired
            type="email"
            id="product-nudge-contact-email"
            value={email}
            validated={emailIsValid ? 'default' : 'error'}
            onBlur={() => setTouchedEmail(true)}
            onChange={(_event, value) => setEmail(value)}
          />
          {!emailIsValid && (
            <HelperText>
              <HelperTextItem variant="error">Enter a valid work email address.</HelperTextItem>
            </HelperText>
          )}
        </FormGroup>
        <FormGroup label="TAM or sales representative" fieldId="product-nudge-contact-person">
          <TextInput
            id="product-nudge-contact-person"
            value={contactPerson}
            onChange={(_event, value) => setContactPerson(value)}
          />
        </FormGroup>
        <FormGroup label="Message" isRequired fieldId="product-nudge-contact-message">
          <TextArea
            isRequired
            id="product-nudge-contact-message"
            value={message}
            onChange={(_event, value) => setMessage(value)}
            rows={5}
          />
        </FormGroup>
        <Content component="small">{content.consent}</Content>
        <ActionGroup>
          <Button
            variant="primary"
            type="submit"
            isLoading={submitState === 'submitting'}
            isDisabled={submitState === 'submitting'}
          >
            Submit
          </Button>
        </ActionGroup>
      </Form>
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      variant={ModalVariant.small}
      aria-labelledby="product-nudge-contact-modal-title"
      className={className}
    >
      <ModalHeader title={content.title} labelId="product-nudge-contact-modal-title" />
      <ModalBody>{renderBody()}</ModalBody>
      {footerContent && (
        <ModalFooter>
          <Flex alignItems={{ default: 'alignItemsCenter' }} spaceItems={{ default: 'spaceItemsSm' }}>
            <FlexItem>{footerContent}</FlexItem>
          </Flex>
        </ModalFooter>
      )}
    </Modal>
  );
};

export default ProductNudgeContactModal;
