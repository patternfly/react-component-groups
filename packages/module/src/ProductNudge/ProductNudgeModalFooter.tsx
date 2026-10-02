import { FunctionComponent, ReactNode } from 'react';
import { Content, ContentVariants, Flex, FlexItem, ModalFooter, Stack } from '@patternfly/react-core';

import { ProductNudgeImage } from './ProductNudge.types';
import { ProductNudgeBrandLogo } from './ProductNudgeBrandLogo';

export interface ProductNudgeModalFooterProps {
  actions?: ReactNode;
  footerText?: ReactNode;
  partnerLogo?: ProductNudgeImage;
  partnerLogoDark?: ProductNudgeImage;
  className?: string;
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
