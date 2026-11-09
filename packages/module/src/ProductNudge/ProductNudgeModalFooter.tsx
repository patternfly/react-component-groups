import { FunctionComponent, ReactNode } from 'react';
import { Content, ContentVariants, Flex, FlexItem, ModalFooter, Stack } from '@patternfly/react-core';

import { ProductNudgeImage } from './ProductNudge.types';
import { ProductNudgeBrandLogo } from './ProductNudgeBrandLogo';

export interface ProductNudgeModalFooterProps {
  /** Action buttons/links rendered alongside the partner logo. */
  actions?: ReactNode;
  /** Supporting copy rendered above the actions row. */
  footerText?: ReactNode;
  /** Partner logo shown in light mode (and in dark mode when `partnerLogoDark` is not provided). */
  partnerLogo?: ProductNudgeImage;
  /** Partner logo shown in dark mode; falls back to `partnerLogo` when not provided. */
  partnerLogoDark?: ProductNudgeImage;
  /** Additional CSS class forwarded to the footer. */
  className?: string;
  /** Centers the actions/logo row instead of the default space-between layout. */
  isCentered?: boolean;
}

/** Shared modal footer for actions, optional supporting copy, and brand logo. */
export const ProductNudgeModalFooter: FunctionComponent<ProductNudgeModalFooterProps> = ({
  actions,
  footerText,
  partnerLogo,
  partnerLogoDark,
  className,
  isCentered = false,
}) => {
  if (!actions && !footerText && !partnerLogo && !partnerLogoDark) {
    return null;
  }

  return (
    <ModalFooter className={className}>
      <Stack hasGutter style={{ minWidth: 0, width: '100%' }}>
        {footerText && <Content component={ContentVariants.small}>{footerText}</Content>}
        <Flex
          alignItems={{ default: 'alignItemsCenter' }}
          justifyContent={isCentered ? { default: 'justifyContentCenter' } : undefined}
          spaceItems={{ default: 'spaceItemsMd' }}
        >
          {actions}
          {(partnerLogo || partnerLogoDark) && (
            <FlexItem>
              <ProductNudgeBrandLogo light={partnerLogo} dark={partnerLogoDark} />
            </FlexItem>
          )}
        </Flex>
      </Stack>
    </ModalFooter>
  );
};

export default ProductNudgeModalFooter;
