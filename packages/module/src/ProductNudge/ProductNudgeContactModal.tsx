import { useEffect, useRef, useState, type ComponentType, type CSSProperties, type FormEvent, type FunctionComponent, type ReactNode } from 'react';
import {
  Button,
  Alert,
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
import {
  type ContactFormValues,
  type ProductNudgeBrand,
  type ProductNudgeContactFormField,
  type ProductNudgeCtaColorScheme,
  type ProductNudgeImage,
} from './ProductNudge.types';
import { createSquareImageSizeStyle, lightwellCtaStyle, nudgeModeStyles } from './nudgeStyles';
import { lightwellBrandAssets, LightwellLogomark, LightwellLogomarkDark } from './productNudgeDefaults';
import { ProductNudgeModalFooter } from './ProductNudgeModalFooter';

export interface ProductNudgeContactModalProps {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Callback to close the modal */
  onClose: () => void;
  /** Modal title */
  titleText: ReactNode;
  /** Optional icon or component shown beside the modal title */
  titleIcon?: ComponentType;
  /** Optional icon node shown beside the modal title; takes precedence over titleIcon. */
  headerIcon?: ReactNode;
  /** Optional description shown below the modal title */
  descriptionText?: ReactNode;
  /** Submit button label */
  submitText: ReactNode;
  /** Placeholder for the name field */
  namePlaceholder?: string;
  /** Placeholder for the email field */
  emailPlaceholder?: string;
  /** Placeholder for the phone field */
  phonePlaceholder?: string;
  /** Configurable fields. Defaults to the legacy name, email, and phone fields. */
  fields?: ProductNudgeContactFormField[];
  /** Optional message displayed after a successful submission. */
  successMessage?: ReactNode;
  /** Receives values keyed by each configured field's name. */
  onSubmit: (values: ContactFormValues) => Promise<void>;
  /** Applies a named brand preset; copy remains entirely caller-supplied. */
  brand?: ProductNudgeBrand;
  /** Footer partner logo override. */
  partnerLogo?: ProductNudgeImage;
  /** Dark-mode footer partner logo override. */
  partnerLogoDark?: ProductNudgeImage;
  /** Override the primary CTA visual scheme. */
  ctaColorScheme?: ProductNudgeCtaColorScheme;
  /** CTA inline style applied when `ctaColorScheme="custom"`. */
  ctaStyle?: CSSProperties;
  /** Width/height of the title icon container; defaults to '1.5rem'. */
  titleIconSize?: string;
  /** Error alert title shown after a failed submission. */
  errorTitle?: ReactNode;
  /** Error alert message shown after a failed submission. */
  errorMessage?: ReactNode;
  /** aria-label applied to the scrollable modal body region. */
  contentAriaLabel?: string;
  /** Prefix for generated form and accessibility IDs. */
  id?: string;
}

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
    '& img': {
      width: '100%',
      height: '100%'
    }
  },
  ...nudgeModeStyles
});

let contactModalInstance = 0;

const createLightwellContactTitleIcon = (titleIconSize: string): FunctionComponent => () => {
  const classes = useStyles();

  return (
    <div className={classes.titleIcon} style={createSquareImageSizeStyle(titleIconSize)}>
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
  partnerLogo,
  partnerLogoDark,
  ctaColorScheme,
  ctaStyle: customCtaStyle,
  titleIconSize = '1.5rem',
  errorTitle = 'Unable to submit request',
  errorMessage = 'Please try again. If the problem continues, contact support.',
  contentAriaLabel = 'Contact request details',
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
  const [ isSubmitting, setIsSubmitting ] = useState(false);
  const [ hasSubmitError, setHasSubmitError ] = useState(false);
  const resolvedLogo = partnerLogo ?? (brand === 'lightwell' ? lightwellBrandAssets.partnerLogo : undefined);
  const resolvedLogoDark = partnerLogoDark ?? (brand === 'lightwell' && !partnerLogo ? lightwellBrandAssets.partnerLogoDark : undefined);
  const resolvedCtaColorScheme = ctaColorScheme ?? (brand === 'lightwell' ? 'lightwell' : 'default');
  const ctaStyleByScheme: Record<ProductNudgeCtaColorScheme, CSSProperties | undefined> = {
    lightwell: lightwellCtaStyle,
    custom: customCtaStyle,
    default: undefined,
  };
  const ctaStyle = ctaStyleByScheme[resolvedCtaColorScheme];

  const titleIconComponent = headerIcon
    ? () => <>{headerIcon}</>
    : titleIcon ?? (brand === 'lightwell' ? createLightwellContactTitleIcon(titleIconSize) : undefined);

  useEffect(() => {
    if (isOpen) {
      setValues({});
      setIsSubmitted(false);
      setHasSubmitError(false);
    }
  }, [ isOpen ]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setHasSubmitError(false);
    try {
      await onSubmit(values);
      if (successMessage) {
        setIsSubmitted(true);
      }
    } catch {
      setHasSubmitError(true);
    } finally {
      setIsSubmitting(false);
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
      <ModalBody className={classes.modalBody} aria-label={contentAriaLabel} role="region" tabIndex={0}>
        {isSubmitted ? successMessage : (
          <Form id={`${idPrefix}-form`} onSubmit={handleSubmit}>
            {hasSubmitError && (
              <Alert variant="danger" title={errorTitle} isInline>
                {errorMessage}
              </Alert>
            )}
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
                    onChange={(_event, value) => {
                      setHasSubmitError(false);
                      setValues((current) => ({ ...current, [field.name]: value }));
                    }}
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
        partnerLogo={resolvedLogo}
        partnerLogoDark={resolvedLogoDark}
        actions={!isSubmitted && (
          <FlexItem>
            <Button
              key="create"
              variant="primary"
              size="lg"
              type="submit"
              form={`${idPrefix}-form`}
              isLoading={isSubmitting}
              isDisabled={isSubmitting}
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
