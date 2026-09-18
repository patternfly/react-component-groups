import React, { FunctionComponent, useState } from 'react';
import {
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
  ModalVariant,
  TextInput,
} from '@patternfly/react-core';
import { createUseStyles } from 'react-jss';
import { ContactFormValues, ProductNudgeContactModalProps } from './ProductNudge.types';

type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

const isValidEmail = (value: string) => /\S+@\S+\.\S+/.test(value);

const useStyles = createUseStyles({
  modalBg: {
    backgroundColor: '#e5e0df',
    backgroundImage: 'var(--lightwell-contact-bg)',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right center',
    '.pf-v6-theme-dark &': {
      backgroundColor: 'var(--pf-t--color--black)',
      backgroundImage: 'var(--lightwell-contact-bg-dark)',
    },
  },
  modalContainer: {
    display: 'flex',
  },
  leftPanel: {
    flex: '0 0 45%',
    padding: 'calc(2 * var(--pf-t--global--spacer--lg))',
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--pf-t--global--spacer--lg)',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    insetBlockStart: 'var(--pf-t--global--spacer--md)',
    insetInlineEnd: 'var(--pf-t--global--spacer--md)',
  },
  headerLogoImg: {
    width: '10rem',
    marginInlineStart: '-1rem',
  },
  logoWordmark: {
    fontWeight: 'bold',
    fontSize: 'var(--pf-t--global--font--size--lg)',
  },
  footer: {
    marginBlockStart: 'auto',
  },
  lightModeOnly: {
    '.pf-v6-theme-dark &': { display: 'none' },
  },
  darkModeOnly: {
    display: 'none',
    '.pf-v6-theme-dark &': { display: 'block' },
  },
});

/**
 * A branded contact form modal for product nudge CTAs. Two-column layout with
 * a decorative image panel on the right. Transport is injected via `onSubmit`.
 */
export const ProductNudgeContactModal: FunctionComponent<ProductNudgeContactModalProps> = ({
  isOpen,
  onClose,
  content,
  prefillName = '',
  prefillEmail = '',
  onSubmit,
  headerLogo,
  headerLogoDark,
  backgroundImage,
  backgroundImageDark,
  partnerLogos,
  partnerLogosDark,
  isNameRequired = true,
  isEmailRequired = true,
  isPhoneRequired = false,
  className,
}) => {
  const classes = useStyles();
  const [name, setName] = useState(prefillName);
  const [email, setEmail] = useState(prefillEmail);
  const [phone, setPhone] = useState('');
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [touchedName, setTouchedName] = useState(false);
  const [touchedEmail, setTouchedEmail] = useState(false);

  const nameIsValid = !touchedName || !isNameRequired || name.length > 0;
  const emailIsValid = !touchedEmail || !isEmailRequired || isValidEmail(email);

  const resetForm = () => {
    setName(prefillName);
    setEmail(prefillEmail);
    setPhone('');
    setSubmitState('idle');
    setTouchedName(false);
    setTouchedEmail(false);
  };

  const handleClose = () => {
    onClose();
    resetForm();
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const nameInvalid = isNameRequired && !name;
    const emailInvalid = isEmailRequired && !isValidEmail(email);
    const phoneInvalid = isPhoneRequired && !phone;
    if (nameInvalid || emailInvalid || phoneInvalid) {
      setTouchedName(true);
      setTouchedEmail(true);
      return;
    }

    const values: ContactFormValues = { name, email, ...(phone && { phone }) };
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
        <FormGroup label="Name" isRequired={isNameRequired} fieldId="product-nudge-contact-name">
          <TextInput
            isRequired={isNameRequired}
            id="product-nudge-contact-name"
            value={name}
            placeholder="Enter your name"
            validated={nameIsValid ? 'default' : 'error'}
            onBlur={() => setTouchedName(true)}
            onChange={(_event, value) => setName(value)}
          />
          {!nameIsValid && (
            <HelperText>
              <HelperTextItem variant="error">Enter your name.</HelperTextItem>
            </HelperText>
          )}
        </FormGroup>
        <FormGroup label="Email" isRequired={isEmailRequired} fieldId="product-nudge-contact-email">
          <TextInput
            isRequired={isEmailRequired}
            type="email"
            id="product-nudge-contact-email"
            value={email}
            placeholder="Enter your email address"
            validated={emailIsValid ? 'default' : 'error'}
            onBlur={() => setTouchedEmail(true)}
            onChange={(_event, value) => setEmail(value)}
          />
          {!emailIsValid && (
            <HelperText>
              <HelperTextItem variant="error">Enter a valid email address.</HelperTextItem>
            </HelperText>
          )}
        </FormGroup>
        <FormGroup
          label="Phone number"
          isRequired={isPhoneRequired}
          fieldId="product-nudge-contact-phone"
        >
          <TextInput
            isRequired={isPhoneRequired}
            type="tel"
            id="product-nudge-contact-phone"
            value={phone}
            onChange={(_event, value) => setPhone(value)}
          />
        </FormGroup>
      </Form>
    );
  };

  const submitStyle = {
    '--pf-v6-c-button--BackgroundColor': 'var(--pf-t--color--red--50)',
    '--pf-v6-c-button--hover--BackgroundColor': 'var(--pf-t--color--red--60)',
    '--pf-v6-c-button--m-clicked--BackgroundColor': 'var(--pf-t--color--red--60)',
  } as React.CSSProperties;

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      variant={ModalVariant.large}
      aria-labelledby="product-nudge-contact-modal-title"
      className={`${classes.modalBg}${className ? ` ${className}` : ''}`}
      style={{
        '--lightwell-contact-bg': backgroundImage ? `url(${backgroundImage})` : 'none',
        '--lightwell-contact-bg-dark': backgroundImageDark ? `url(${backgroundImageDark})` : 'none',
      } as React.CSSProperties}
    >
      <ModalBody style={{
        '--pf-v6-c-modal-box__body--PaddingBlockStart': '0',
        '--pf-v6-c-modal-box__body--PaddingInlineStart': '0',
        '--pf-v6-c-modal-box__body--PaddingInlineEnd': '0',
        '--pf-v6-c-modal-box__body--last-child--PaddingBlockEnd': '0',
      } as React.CSSProperties}>
        <div className={classes.modalContainer}>
          <div className={classes.leftPanel}>
            {headerLogo && (
              <>
                <img
                  src={headerLogo.src}
                  alt={headerLogo.alt}
                  className={`${classes.headerLogoImg}${headerLogoDark ? ` ${classes.lightModeOnly}` : ''}`}
                />
                {headerLogoDark && (
                  <img
                    src={headerLogoDark.src}
                    alt={headerLogoDark.alt}
                    className={`${classes.headerLogoImg} ${classes.darkModeOnly}`}
                  />
                )}
              </>
            )}

            {renderBody()}

            <Flex
              alignItems={{ default: 'alignItemsCenter' }}
              spaceItems={{ default: 'spaceItemsMd' }}
              className={classes.footer}
            >
              <FlexItem>
                <Button
                  variant="primary"
                  size="lg"
                  type="submit"
                  isLoading={submitState === 'submitting'}
                  isDisabled={submitState === 'submitting' || submitState === 'success'}
                  onClick={handleSubmit}
                  style={submitStyle}
                >
                  Submit
                </Button>
              </FlexItem>
              {partnerLogos && (
                <FlexItem>
                  <span className={partnerLogosDark ? classes.lightModeOnly : undefined}>{partnerLogos}</span>
                  {partnerLogosDark && <span className={classes.darkModeOnly}>{partnerLogosDark}</span>}
                </FlexItem>
              )}
            </Flex>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default ProductNudgeContactModal;
