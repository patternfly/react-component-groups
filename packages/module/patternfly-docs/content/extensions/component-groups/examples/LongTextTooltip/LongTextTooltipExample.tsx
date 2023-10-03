import React from 'react';
import { TooltipPosition } from '@patternfly/react-core';
import LongTextTooltip from "@patternfly/react-component-groups/dist/dynamic/LongTextTooltip";

export const LongTextTooltipExample: React.FunctionComponent = () => (
  <LongTextTooltip
    content="This is a very long tooltip that will be truncated to fit the screen. It will also have a max width of 400px."
    maxLength={40}
    tooltipPosition={TooltipPosition.bottom}/>
)
