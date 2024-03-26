import * as React from 'react';
import { Icon } from '@patternfly/react-core';
import { ArrowCircleUpIcon } from '@patternfly/react-icons/dist/esm/icons/arrow-circle-up-icon';
import { ResourcesAlmostFullIcon } from '@patternfly/react-icons/dist/esm/icons/resources-almost-full-icon';
import { ResourcesFullIcon } from '@patternfly/react-icons/dist/esm/icons/resources-full-icon';
import { SyncAltIcon } from '@patternfly/react-icons/dist/esm/icons/sync-alt-icon';
import { UnknownIcon } from '@patternfly/react-icons/dist/esm/icons/unknown-icon';


export interface ColoredIconProps {
  className?: string;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
};

/**
 * Component for displaying a green check mark circle icon
 * @param {string} [className] - (optional) additional class name for the component
 * @param {string} [title] - (optional) icon title
 * @param {string} [size] - (optional) icon size: ('sm', 'md', 'lg', 'xl')
 * @example
 * ```tsx
 * <GreenCheckCircleIcon title="Healthy" />
 * ```
 */
export declare const GreenCheckCircleIcon: React.FC<ColoredIconProps>;
/**
 * Component for displaying a red exclamation mark circle icon
 * @param {string} [className] - (optional) additional class name for the component
 * @param {string} [title] - (optional) icon title
 * @param {string} [size] - (optional) icon size: ('sm', 'md', 'lg', 'xl')
 * @example
 * ```tsx
 * <RedExclamationCircleIcon title="Failed" />
 * ```
 */
export declare const RedExclamationCircleIcon: React.FC<ColoredIconProps>;
/**
 * Component for displaying a yellow triangle exclamation icon
 * @param {string} [className] - (optional) additional class name for the component
 * @param {string} [title] - (optional) icon title
 * @param {string} [size] - (optional) icon size: ('sm', 'md', 'lg', 'xl')
 * @example
 * ```tsx
 * <YellowExclamationTriangleIcon title="Warning" />
 * ```
 */
export declare const YellowExclamationTriangleIcon: React.FC<ColoredIconProps>;
/**
 * Component for displaying a blue info circle icon
 * @param {string} [className] - (optional) additional class name for the component
 * @param {string} [title] - (optional) icon title
 * @param {string} [size] - (optional) icon size: ('sm', 'md', 'lg', 'xl')
 * @example
 * ```tsx
 * <BlueInfoCircleIcon title="Info" />
 * ```
 */
export declare const BlueInfoCircleIcon: React.FC<ColoredIconProps>;


export const GrayUnknownIcon: React.FC<ColoredIconProps> = ({ className, title, size }) => (
  <Icon size={size}>
    <UnknownIcon className={className} title={title} />
  </Icon>
);

export const BlueSyncIcon: React.FC<ColoredIconProps> = ({ className, title, size }) => (
  <Icon status="info" size={size}>
    <SyncAltIcon className={className} title={title} />
  </Icon>
);

export const RedResourcesFullIcon: React.FC<ColoredIconProps> = ({ className, title, size }) => (
  <Icon status="danger" size={size}>
    <ResourcesFullIcon className={className} title={title} />
  </Icon>
);

export const YellowResourcesAlmostFullIcon: React.FC<ColoredIconProps> = ({
  className,
  title,
  size,
}) => (
  <Icon status="warning" size={size}>
    <ResourcesAlmostFullIcon className={className} title={title} />
  </Icon>
);

export const BlueArrowCircleUpIcon: React.FC<ColoredIconProps> = ({ className, title, size }) => (
  <Icon status="info" size={size}>
    <ArrowCircleUpIcon className={className} title={title} />
  </Icon>
);
