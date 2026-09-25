import { useState, type FormEvent, type FunctionComponent } from 'react';
import {
  Button,
  Form,
  FormGroup,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalVariant,
  TextInput
} from '@patternfly/react-core';
import { createUseStyles } from 'react-jss';
import { type ContactFormValues, type ProductNudgeContactModalProps } from './ProductNudge.types';
import LightwellLogomark from './assets/lightwell-logomark-light.svg';
import LightwellLogomarkDark from './assets/lightwell-logomark-dark.svg';
import { lightwellCtaStyle, nudgeModeStyles } from './nudgeStyles';

const useStyles = createUseStyles({
  titleIcon: {
    width: '1.5rem',
    height: '1.5rem',
    '& img': {
      width: '100%',
      height: '100%'
    }
  },
  ...nudgeModeStyles
});

const LightwellContactTitleIcon: FunctionComponent = () => {
  const classes = useStyles();

  return (
    <div className={classes.titleIcon}>
      <img src={LightwellLogomark} alt="" className={classes.lightModeOnly} />
      <img src={LightwellLogomarkDark} alt="" className={classes.darkModeOnly} />
    </div>
  );
};

export const ProductNudgeContactModal = ({
  isOpen,
  namePlaceholder = '',
  emailPlaceholder = '',
  phonePlaceholder = '',
  onClose,
  onSubmit,
  titleText,
  titleIcon = LightwellContactTitleIcon,
  descriptionText,
  submitText
}: ProductNudgeContactModalProps) => {
  const [ nameValue, setNameValue ] = useState('');
  const [ emailValue, setEmailValue ] = useState('');
  const [ phoneValue, setPhoneValue ] = useState('');

  const handleNameInputChange = (_event, value: string) => {
    setNameValue(value);
  };

  const handleEmailInputChange = (_event, value: string) => {
    setEmailValue(value);
  };
  const handlePhoneInputChange = (_event, value: string) => {
    setPhoneValue(value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const values: ContactFormValues = {
      name: nameValue,
      email: emailValue,
      ...(phoneValue ? { phone: phoneValue } : {})
    };

    await onSubmit(values);
  };

  return (
    <Modal
      variant={ModalVariant.small}
      isOpen={isOpen}
      onClose={onClose}
      aria-labelledby="form-modal-title"
      aria-describedby="modal-box-description-form"
    >
      <ModalHeader
        title={titleText}
        description={descriptionText}
        descriptorId="modal-box-description-form"
        labelId="form-modal-title"
        titleIconVariant={titleIcon}
      />
      <ModalBody>
        <Form id="modal-with-form-form" onSubmit={handleSubmit}>
          <FormGroup
            label="Name"
            isRequired
            fieldId="modal-with-form-form-name"
          >
            <TextInput
              isRequired
              type="text"
              id="modal-with-form-form-name"
              name="modal-with-form-form-name"
              value={nameValue}
              onChange={handleNameInputChange}
              placeholder={namePlaceholder}
            />
          </FormGroup>
          <FormGroup
            label="E-mail"
            isRequired
            fieldId="modal-with-form-form-email"
          >
            <TextInput
              isRequired
              type="email"
              id="modal-with-form-form-email"
              name="modal-with-form-form-email"
              value={emailValue}
              onChange={handleEmailInputChange}
              placeholder={emailPlaceholder}
            />
          </FormGroup>
          <FormGroup
            label="Phone"
            isRequired
            fieldId="modal-with-form-form-phone"
          >
            <TextInput
              type="tel"
              id="modal-with-form-form-phone"
              name="modal-with-form-form-phone"
              value={phoneValue}
              onChange={handlePhoneInputChange}
              placeholder={phonePlaceholder}
            />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button
          key="create"
          variant="primary"
          size="lg"
          type="submit"
          form="modal-with-form-form"
          style={lightwellCtaStyle}
        >
          {submitText}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ProductNudgeContactModal;
