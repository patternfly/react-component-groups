import React, { useState } from 'react';
import { Button } from '@patternfly/react-core';
import { ProductNudgeMatchAnalysisModal } from '@patternfly/react-component-groups/dist/dynamic/ProductNudge';

export const ProductNudgeMatchAnalysisModalExample: React.FunctionComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button variant="primary" onClick={() => setIsOpen(true)}>
        Open match analysis modal
      </Button>
      <ProductNudgeMatchAnalysisModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};
