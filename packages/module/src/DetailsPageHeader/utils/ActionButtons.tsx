import { Flex, FlexItem } from '@patternfly/react-core';
import React from 'react';
import ActionButton, { ActionButtonProps } from './ActionButton';

export interface ActionButtonsProps {
  /** Array of action buttons */
  actionButtons: ActionButtonProps[];
};

export const ActionButtons: React.FunctionComponent<ActionButtonsProps> = ({
  actionButtons
}: ActionButtonsProps) => (
  <Flex>
    {actionButtons.map((actionButton, i) => (
      <FlexItem key={actionButton?.id ?? i}>
        <ActionButton
          onClick={actionButton.onClick}
          variant={actionButton?.variant}
          isDisabled={actionButton?.isDisabled}
          tooltip={actionButton?.tooltip}
          className="pf-v5-u-mb-sm"
        >
          {actionButton.children}
        </ActionButton>
      </FlexItem>
    ))}
  </Flex>
);

export default ActionButtons;
