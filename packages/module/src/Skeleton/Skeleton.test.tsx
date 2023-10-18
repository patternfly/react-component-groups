import React from 'react';
import Skeleton, { SkeletonSize } from './Skeleton';
import { render } from '@testing-library/react';

describe('Skeleton component', () => {
  Object.values(SkeletonSize).forEach((size) => {
    it(`should render correctly - ${size}`, () => {
      expect(render(<Skeleton size={size} />)).toMatchSnapshot();
    });
  });

  it('should render correctly without size', () => {
    expect(render(<Skeleton />)).toMatchSnapshot();
  });

  it('should render correctly as dark', () => {
    expect(render(<Skeleton isDark />)).toMatchSnapshot();
  });
});
