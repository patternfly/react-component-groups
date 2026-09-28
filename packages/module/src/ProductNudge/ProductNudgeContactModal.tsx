import { useEffect, useRef, useState, type FormEvent, type FunctionComponent } from 'react';
import {
  Button,
  FlexItem,
  Form,
  FormGroup,
  HelperText,
  HelperTextItem,
  Modal,
  ModalBody,
  ModalHeader,
  ModalVariant,
  TextInput
} from '@patternfly/react-core';
import { createUseStyles } from 'react-jss';
import { type ContactFormValues, type ProductNudgeContactFormField, type ProductNudgeContactModalProps } from './ProductNudge.types';
import LightwellLogomark from './assets/lightwell-logomark-light.svg';
import LightwellLogomarkDark from './assets/lightwell-logomark-dark.svg';
import { lightwellCtaStyle, nudgeModeStyles } from './nudgeStyles';
import { lightwellBrandAssets } from './productNudgeDefaults';
import { ProductNudgeModalFooter } from './ProductNudgeModalFooter';

const useStyles = createUseStyles({
  modal: {
    '--pf-v6-c-modal-box__header--PaddingBlockStart': 'var(--pf-t--global--spacer--xl)',
    '--pf-v6-c-modal-box__header--PaddingInlineStart': 'var(--pf-t--global--spacer--xl)',
    '--pf-v6-c-modal-box__header--PaddingInlineEnd': 'var(--pf-t--global--spacer--xl)',
    '--pf-v6-c-modal-box__body--PaddingInlineStart': 'var(--pf-t--global--spacer--xl)',
    '--pf-v6-c-modal-box__body--PaddingInlineEnd': 'var(--pf-t--global--spacer--xl)',
    '--pf-v6-c-modal-box__footer--PaddingBlockEnd': 'var(--pf-t--global--spacer--xl)',
    '--pf-v6-c-modal-box__footer--PaddingInlineStart': 'var(--pf-t--global--spacer--xl)',
    '--pf-v6-c-modal-box__footer--PaddingInlineEnd': 'var(--pf-t--global--spacer--xl)'
  },
  modalBody: {
    marginInlineEnd: 'var(--pf-v6-c-modal-box__close--sibling--MarginInlineEnd)'
  },
  modalFooter: {
    marginInlineEnd: 'var(--pf-v6-c-modal-box__close--sibling--MarginInlineEnd)'
  },
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

let contactModalInstance = 0;

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
  titleIcon,
  headerIcon,
  descriptionText,
  submitText,
  fields,
  successMessage,
  brand,
  partnerLockup,
  partnerLockupDark,
  ctaColorScheme,
  id,
}: ProductNudgeContactModalProps) => {
  const classes = useStyles();
  const idRef = useRef<string | undefined>(undefined);
  if (!idRef.current) {
    idRef.current = id ?? `product-nudge-contact-${++contactModalInstance}`;
  }
  const idPrefix = id ?? idRef.current;
  const resolvedFields: ProductNudgeContactFormField[] = fields ?? [
    { name: 'name', label: 'Name', type: 'text', placeholder: namePlaceholder, isRequired: true, autoComplete: 'name' },
    { name: 'email', label: 'E-mail', type: 'email', placeholder: emailPlaceholder, isRequired: true, autoComplete: 'email' },
    { name: 'phone', label: 'Phone', type: 'tel', placeholder: phonePlaceholder, autoComplete: 'tel' },
  ];
  const [ values, setValues ] = useState<ContactFormValues>({});
  const [ isSubmitted, setIsSubmitted ] = useState(false);
  const resolvedLockup = partnerLockup ?? (brand === 'lightwell' ? lightwellBrandAssets.partnerLockup : undefined);
  const resolvedLockupDark = partnerLockupDark ?? (brand === 'lightwell' && !partnerLockup ? lightwellBrandAssets.partnerLockupDark : undefined);
  const ctaStyle = (ctaColorScheme ?? (brand === 'lightwell' ? 'lightwell' : 'default')) === 'lightwell'
    ? lightwellCtaStyle
    : undefined;

  const titleIconComponent = headerIcon
    ? () => <>{headerIcon}</>
    : titleIcon ?? (brand === 'lightwell' ? LightwellContactTitleIcon : undefined);

  useEffect(() => {
    if (isOpen) {
      setValues({});
      setIsSubmitted(false);
    }
  }, [ isOpen ]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await onSubmit(values);
    if (successMessage) {
      setIsSubmitted(true);
    }
  };

  return (
    <Modal
      variant={ModalVariant.small}
      isOpen={isOpen}
      onClose={onClose}
      aria-labelledby={`${idPrefix}-title`}
      aria-describedby={descriptionText ? `${idPrefix}-description` : undefined}
      className={classes.modal}
    >
      <ModalHeader
        title={titleText}
        description={descriptionText}
        labelId={`${idPrefix}-title`}
        descriptorId={`${idPrefix}-description`}
        titleIconVariant={titleIconComponent}
      />
      <ModalBody className={classes.modalBody}>
        {isSubmitted ? successMessage : (
          <Form id={`${idPrefix}-form`} onSubmit={handleSubmit}>
            {resolvedFields.map((field) => {
              const fieldId = `${idPrefix}-${field.name.replace(/[^a-zA-Z0-9_-]/g, '-')}`;
              return (
                <FormGroup
                  key={field.name}
                  label={field.label}
                  isRequired={field.isRequired}
                  fieldId={fieldId}
                >
                  <TextInput
                    isRequired={field.isRequired}
                    type={field.type ?? 'text'}
                    id={fieldId}
                    name={field.name}
                    value={values[field.name] ?? ''}
                    onChange={(_event, value) => setValues((current) => ({ ...current, [field.name]: value }))}
                    placeholder={field.placeholder}
                    autoComplete={field.autoComplete}
                    aria-describedby={field.helpText ? `${fieldId}-help` : undefined}
                  />
                  {field.helpText && (
                    <HelperText>
                      <HelperTextItem id={`${fieldId}-help`}>{field.helpText}</HelperTextItem>
                    </HelperText>
                  )}
                </FormGroup>
              );
            })}
          </Form>
        )}
      </ModalBody>
      <ProductNudgeModalFooter
        className={classes.modalFooter}
        partnerLockup={resolvedLockup}
        partnerLockupDark={resolvedLockupDark}
        actions={!isSubmitted && (
          <FlexItem>
            <Button
              key="create"
              variant="primary"
              size="lg"
              type="submit"
              form={`${idPrefix}-form`}
              style={ctaStyle}
            >
              {submitText}
            </Button>
          </FlexItem>
        )}
      />
    </Modal>
  );
};

export default ProductNudgeContactModal;
