import React from 'react';
import { Skeleton as PFSkeleton, SkeletonProps as PFSkeletonProps } from '@patternfly/react-core';
import clsx from 'clsx';
import { createUseStyles } from 'react-jss';

interface SkeletonSizeInterface {
  xs: 'xs';
  sm: 'sm';
  md: 'md';
  lg: 'lg';
}

const skeletonSizeXS = { width: '16% !important' };

const skeletonSizeSM = { width: '33% !important' };

const skeletonSizeMD = { width: '66% !important' };

const skeletonSizeLG = { width: '100% !important' };

const useStyles = createUseStyles({
  skeleton: {
    '&__xs': skeletonSizeXS,
    '&__sm': skeletonSizeSM,
    '&__md': skeletonSizeMD,
    '&__lg': skeletonSizeLG,
    '&.ins-m-dark': {
      '--pf-c-skeleton--BackgroundColor': 'var(--pf-global--palette--black-600)',
      '--pf-c-skeleton--after--LinearGradientColorStop1': 'var(--pf-global--palette--black-600)',
      '--pf-c-skeleton--after--LinearGradientColorStop2': 'var(--pf-global--palette--black-500)',
      '--pf-c-skeleton--after--LinearGradientColorStop3': 'var(--pf-global--palette--black-600)',
    },
  },
});
      
export const SkeletonSize: SkeletonSizeInterface = { xs: 'xs', sm: 'sm', md: 'md', lg: 'lg' };

export interface SkeletonProps extends Omit<PFSkeletonProps, 'size'> {
  size?: keyof SkeletonSizeInterface;
  isDark?: boolean;
}

const Skeleton: React.FunctionComponent<SkeletonProps> = ({ size = SkeletonSize.md, isDark = false, className, ...props }) => {
  const classes = useStyles();
  const skeletonClasses = clsx(classes.skeleton, `skeleton__${size}`, { [`ins-m-dark`]: isDark }, className)
  return <PFSkeleton className={skeletonClasses} {...props} />;
}

export default Skeleton;
