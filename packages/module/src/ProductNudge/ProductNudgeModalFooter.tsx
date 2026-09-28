import { FunctionComponent, ReactNode } from 'react';
import { Content, ContentVariants, Flex, FlexItem, ModalFooter, Stack } from '@patternfly/react-core';

import { ProductNudgeImage } from './ProductNudge.types';
import { ProductNudgeBrandLockup } from './ProductNudgeBrandLockup';

interface ProductNudgeModalFooterProps {
  actions?: ReactNode;
  footerText?: ReactNode;
  partnerLockup?: ProductNudgeImage;
  partnerLockupDark?: ProductNudgeImage;
  className?: string;
  isCentered?: boolean;
}

/** Shared modal footer for actions, optional supporting copy, and brand lockup. */
export const ProductNudgeModalFooter: FunctionComponent<ProductNudgeModalFooterProps> = ({
  actions,
  footerText,
  partnerLockup,
  partnerLockupDark,
  className,
  isCentered = false,
}) => {
  if (!actions && !footerText && !partnerLockup && !partnerLockupDark) {
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
          {(partnerLockup || partnerLockupDark) && (
            <FlexItem>
              <ProductNudgeBrandLockup light={partnerLockup} dark={partnerLockupDark} />
            </FlexItem>
          )}
        </Flex>
      </Stack>
    </ModalFooter>
  );
};

export default ProductNudgeModalFooter;
