import { FunctionComponent, useState, useRef } from 'react';
import { Slider, SliderOnChangeEvent } from '@patternfly/react-core';
import { ResponsiveActions } from '@patternfly/react-component-groups/dist/dynamic/ResponsiveActions';
import { ResponsiveAction } from '@patternfly/react-component-groups/dist/dynamic/ResponsiveAction';

export const ResponsiveActionsBreakpointExample: FunctionComponent = () => {
  const [ containerWidth, setContainerWidth ] = useState(100);
  const containerRef = useRef<HTMLDivElement>(null);

  const onChange = (_event: SliderOnChangeEvent, value: number) => {
    setContainerWidth(value);
  };

  const containerStyles = {
    width: `${containerWidth}%`,
    padding: '1rem',
    borderWidth: '2px',
    borderStyle: 'dashed'
  };

  return (
    <>
      <div style={{ width: '100%', maxWidth: '400px' }}>
        <div>
          <span id="responsiveActions-hasBreakpointOnContainer-slider-label">Current container width</span>:{' '}
          {containerWidth}%
        </div>
        <Slider
          value={containerWidth}
          onChange={onChange}
          max={100}
          min={40}
          step={20}
          showTicks
          showBoundaries={false}
          aria-labelledby="responsiveActions-hasBreakpointOnContainer-slider-label"
        />
      </div>
      <div ref={containerRef} id="breakpoint-reference-container" style={containerStyles}>
        <ResponsiveActions breakpoint="sm" breakpointReference={containerRef}>
          <ResponsiveAction isPersistent>Persistent Action</ResponsiveAction>
          <ResponsiveAction isPinned variant="secondary">
            Pinned Action 1
          </ResponsiveAction>
          <ResponsiveAction isPinned variant="secondary">
            Pinned Action 2
          </ResponsiveAction>
          <ResponsiveAction>Overflow Action</ResponsiveAction>
        </ResponsiveActions>
      </div>
    </>
  );
};
