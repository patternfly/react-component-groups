import React from 'react';
import LongTextTooltip from './LongTextTooltip';
import { render } from '@testing-library/react';
import { TooltipPosition } from '@patternfly/react-core';

describe('LongTextTooltip component', () => {
  it('should render', () => {
    expect(render(<LongTextTooltip />)).toMatchSnapshot();
  });

  it('should render content', () => {
    expect(render(<LongTextTooltip content="Lorem Impsum" />)).toMatchSnapshot();
  });

  it('should render content with maxLength', () => {
    expect(
      render(<LongTextTooltip content="Lorem Impsum" maxLength={50} />)).toMatchSnapshot();
  });

  it('should render content with maxLength shorter than content', () => {
    expect(render(<LongTextTooltip content="Lorem Impsum" maxLength={1} />)).toMatchSnapshot();
  });

  it('should render tooltip in a different spot', () => {
    expect(render(<LongTextTooltip content="Lorem Impsum" tooltipPosition={TooltipPosition.bottom}/>)).toMatchSnapshot();
  });

  it('should render tooltip in a different spot', () => {
    expect(render(<LongTextTooltip content="Lorem Impsum" tooltipPosition={TooltipPosition.left} />)).toMatchSnapshot();
  });

  it('should render tooltip in a different spot', () => {
    expect(render(<LongTextTooltip content="Lorem Impsum" tooltipPosition={TooltipPosition.right} />)).toMatchSnapshot();
  });

  it('should render content tooltip in a different spot with different width', () => {
    expect(render(<LongTextTooltip content="Lorem Impsum" tooltipPosition={TooltipPosition.left} tooltipMaxWidth="10vw" />)).toMatchSnapshot();
  });
});
