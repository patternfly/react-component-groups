import * as React from 'react';
import { BanIcon } from '@patternfly/react-icons/dist/esm/icons/ban-icon';
import { ClipboardListIcon } from '@patternfly/react-icons/dist/esm/icons/clipboard-list-icon';
import { HourglassHalfIcon } from '@patternfly/react-icons/dist/esm/icons/hourglass-half-icon';
import { HourglassStartIcon } from '@patternfly/react-icons/dist/esm/icons/hourglass-start-icon';
import { NotStartedIcon } from '@patternfly/react-icons/dist/esm/icons/not-started-icon';
import { SyncAltIcon } from '@patternfly/react-icons/dist/esm/icons/sync-alt-icon';
import { UnknownIcon } from '@patternfly/react-icons/dist/esm/icons/unknown-icon';
import { YellowExclamationTriangleIcon } from './icons';
import { ErrorStatus, InfoStatus, ProgressStatus, SuccessStatus } from './statuses';
import clsx from 'clsx';

const DASH = '-';
const MEMO = {};

interface StatusComponentProps {
  title?: string;
  iconOnly?: boolean;
  noTooltip?: boolean;
  className?: string;
  popoverTitle?: string;
}

const CamelCaseWrap: React.FC<CamelCaseWrapProps> = ({ value, dataTest }) => {
  if (!value) {
    return '-';
  }

  if (MEMO[value]) {
    return MEMO[value];
  }

  // Add word break points before capital letters (but keep consecutive capital letters together).
  const words = value.match(/[A-Z]+[^A-Z]*|[^A-Z]+/g);
  const rendered = (
    <span data-test={dataTest}>
      {words!.map((word, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <React.Fragment key={i}>
          {word}
          {i !== words!.length - 1 && <wbr />}
        </React.Fragment>
      ))}
    </span>
  );
  MEMO[value] = rendered;
  return rendered;
};

interface CamelCaseWrapProps {
  value: string;
  dataTest?: string;
}

export interface StatusProps extends StatusComponentProps {
  status?: string;
  icon?: React.ReactElement;
  spin?: boolean;
  children?: React.ReactNode;
}

interface StatusIconAndTextProps extends StatusComponentProps {
    icon?: React.ReactElement;
    spin?: boolean;
  };

/**
 * Component for displaying a status icon and text
 * @param {string} [title] - (optional) status text
 * @param {boolean} [iconOnly] - (optional) if true, only displays icon
 * @param {boolean} [noTooltip] - (optional) if true, tooltip won't be displayed
 * @param {string} [className] - (optional) additional class name for the component
 * @param {React.ReactElement} [icon] - (optional) icon to be displayed
 * @param {boolean} [spin] - (optional) if true, icon rotates
 * @example
 * ```tsx
 * <StatusIconAndText title={title} icon={renderIcon} />
 * ```
 */
const StatusIconAndText: React.FC<StatusIconAndTextProps> = ({ icon, title, spin, iconOnly, noTooltip, className }) => {
  if (!title) {
    return <>{DASH}</>;
  }

  return (
    <span className={clsx('co-icon-and-text', className)} title={iconOnly && !noTooltip ? title : undefined}>
      {icon &&
        React.cloneElement(icon, {
          className: clsx(
            spin && 'fa-spin',
            icon.props.className,
            !iconOnly && 'co-icon-and-text__icon co-icon-flex-child'
          )
        })}
      {!iconOnly && <CamelCaseWrap value={title} dataTest="status-text" />}
    </span>
  );
};

interface StatusComponentProps {
  title?: string;
  iconOnly?: boolean;
  noTooltip?: boolean;
  className?: string;
  popoverTitle?: string;
}

/**
 * Component for displaying a status message
 * @param {string} status - type of status to be displayed
 * @param {string} [title] - (optional) status text
 * @param {boolean} [iconOnly] - (optional) if true, only displays icon
 * @param {boolean} [noTooltip] - (optional) if true, tooltip won't be displayed
 * @param {string} [className] - (optional) additional class name for the component
 * @param {string} [popoverTitle] - (optional) title for popover
 * @param {ReactNode} [children] - (optional) children for the component
 * @example
 * ```tsx
 * <Status status='Warning' />
 * ```
 */
export const Status: React.FC<StatusProps> = ({ status, title, children, iconOnly, noTooltip, className }) => {
  const statusProps = { title: title || status, iconOnly, noTooltip, className };
  switch (status) {
  case 'New':
    return <StatusIconAndText {...statusProps} icon={<HourglassStartIcon />} />;

  case 'Pending':
    return <StatusIconAndText {...statusProps} icon={<HourglassHalfIcon />} />;

  case 'Planning':
    return <StatusIconAndText {...statusProps} icon={<ClipboardListIcon />} />;

  case 'ContainerCreating':
  case 'UpgradePending':
  case 'PendingUpgrade':
  case 'PendingRollback':
    return <ProgressStatus {...statusProps} />;

  case 'In Progress':
  case 'Installing':
  case 'InstallReady':
  case 'Replacing':
  case 'Running':
  case 'Updating':
  case 'Upgrading':
  case 'PendingInstall':
    return <StatusIconAndText {...statusProps} icon={<SyncAltIcon />} />;

  case 'Cancelled':
  case 'Deleting':
  case 'Expired':
  case 'Not Ready':
  case 'Cancelling':
  case 'Terminating':
  case 'Superseded':
  case 'Uninstalling':
    return <StatusIconAndText {...statusProps} icon={<BanIcon />} />;

  case 'Warning':
  case 'RequiresApproval':
    return <StatusIconAndText {...statusProps} icon={<YellowExclamationTriangleIcon />} />;

  case 'ContainerCannotRun':
  case 'CrashLoopBackOff':
  case 'Critical':
  case 'ErrImagePull':
  case 'Error':
  case 'Failed':
  case 'Failure':
  case 'ImagePullBackOff':
  case 'InstallCheckFailed':
  case 'Lost':
  case 'Rejected':
  case 'UpgradeFailed':
    return <ErrorStatus {...statusProps}>{children}</ErrorStatus>;

  case 'Accepted':
  case 'Active':
  case 'Bound':
  case 'Complete':
  case 'Completed':
  case 'Created':
  case 'Enabled':
  case 'Succeeded':
  case 'Ready':
  case 'Up to date':
  case 'Loaded':
  case 'Provisioned as node':
  case 'Preferred':
  case 'Connected':
  case 'Deployed':
    return <SuccessStatus {...statusProps} />;

  case 'Info':
    return <InfoStatus {...statusProps}>{children}</InfoStatus>;

  case 'Unknown':
    return <StatusIconAndText {...statusProps} icon={<UnknownIcon />} />;

  case 'PipelineNotStarted':
    return <StatusIconAndText {...statusProps} icon={<NotStartedIcon />} />;

  default:
    return status ? <StatusIconAndText {...statusProps} /> : <>{DASH}</>;
  }
};

export default Status;
