import React from 'react';
import { ExclamationCircleIcon, ExclamationTriangleIcon } from '@patternfly/react-icons';
import { Button, Icon, Tooltip, TooltipProps } from '@patternfly/react-core';
import clsx from 'clsx';
import { createUseStyles } from 'react-jss';

type Render = (config: { msg: string }) => React.ReactElement<any, any> | null;
type CullingDate = string | number | Date;

interface StaleDataInfo {
  isWarn?: boolean;
  isError?: boolean;
  msg: string;
}

const seconds = 1000;
const minutes: number = seconds * 60;
const hours: number = minutes * 60;
const days: number = hours * 24;

type CalculateTooltip = (culled: CullingDate, warning: CullingDate, currDate: CullingDate) => StaleDataInfo;

const useStyles = createUseStyles({
  inventoryCullingWarning: {
    color: 'var(--pf-t--global--icon--color--status--warning--default)',
  },
  inventoryCullingDanger: {
    color: 'var(--pf-t--global--icon--color--status--danger--default)',
  },
  iconMargin: {
    marginRight: 'var(--pf-t--global--spacer--sm)'
  },
  messageFont: {
    fontWeight: 'var(--pf-t--global--font--weight--body--bold)',
  },
});

/** extends TooltipProps */
export interface StaleDataWarningProps extends Omit<TooltipProps, 'content'> {
  /** Option to add custom css classes */
  className?: string;
  /** Warning date for when object becomes stale */
  staleWarning: CullingDate;
  /** Date when object becomes culled */
  culled: CullingDate;
  /** Date when object becomes stale */
  stale: CullingDate;
  /** Current date */
  currDate: CullingDate;
  /** Optional prop to add custom children */
  children?: React.ReactElement<any, string | React.JSXElementConstructor<any>> | undefined;
  /** Option to add custom message ReactElement */
  render?: Render;
  /** Optional custom warning message */
  message?: string;
  /** Accessible label for the icon */
  "aria-label"?: string;
}

const StaleDataWarning: React.FunctionComponent<StaleDataWarningProps> = ({
  culled = new Date(0),
  className,
  staleWarning = new Date(0),
  stale = new Date(0),
  currDate = new Date(0),
  children,
  render,
  message,
  "aria-label": ariaLabel,
  ...props
}) => {
  const classes = useStyles();

  const calculateTooltip: CalculateTooltip = (culled, warning, currDate) => {
    const culledDate: Date = new Date(culled);
    const warningDate: Date = new Date(warning);
    const diffTime: number = new Date(currDate).valueOf() - warningDate.valueOf();
    const removeIn: number = Math.ceil((culledDate.valueOf() - new Date(currDate).valueOf()) / days);
    const msg = message ? message : `System scheduled for inventory removal in ${removeIn} days`;
    if (diffTime >= 0) {
      return {
        isError: true,
        msg,
      };
    }
  
    return {
      isWarn: true,
      msg,
    };
  };

  if (new Date(currDate).valueOf() - new Date(stale).valueOf() < 0) {
    return render
      ? render({
        msg: '',
      })
      : children || null;
  }

  const { isWarn, isError, msg }: StaleDataInfo = calculateTooltip(culled, staleWarning, currDate);
  if (render) {
    return (
      <span
        className={clsx({ [classes.inventoryCullingWarning]: isWarn, [classes.inventoryCullingDanger]: isError }, className)}
      >
        {isWarn &&
          <Icon status="warning"><ExclamationTriangleIcon className={clsx( classes.iconMargin )} aria-label={ariaLabel || "Warning"}/></Icon>   
        }
        {isError &&
          <Icon status="danger"><ExclamationCircleIcon  className={clsx( classes.iconMargin )} aria-label={ariaLabel || "Danger"}/></Icon>   
        }
        <span className={clsx( classes.messageFont )}>
          {render({ msg })}
        </span>
      </span>
    );
  }

  return (
    <>
      {isError && <Tooltip {...props} content={<div>{msg}</div>}><Button variant="plain" icon={<Icon status="warning"><ExclamationTriangleIcon/></Icon>} aria-label={ariaLabel || "Warning"} /></Tooltip>}
      {isWarn && <Tooltip {...props} content={<div>{msg}</div>}><Button variant="plain" icon={<Icon status="danger"><ExclamationCircleIcon/></Icon>} aria-label={ariaLabel || "Danger"} /></Tooltip>}
      {children}
    </>
  );
};

export default StaleDataWarning;

