import React from 'react';
import { ExclamationCircleIcon, ExclamationTriangleIcon } from '@patternfly/react-icons';
import { Button, Tooltip, TooltipProps } from '@patternfly/react-core';
import clsx from 'clsx';
import { createUseStyles } from 'react-jss';

type Render = (config: { msg: string }) => React.ReactElement<any, any> | null;
type CullingDate = string | number | Date;

interface CullingInfo {
  isWarn?: boolean;
  isError?: boolean;
  msg: string;
}

const seconds = 1000;
const minutes: number = seconds * 60;
const hours: number = minutes * 60;
const days: number = hours * 24;

type CalculateTooltip = (culled: CullingDate, warning: CullingDate, currDate: CullingDate) => CullingInfo;

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
export interface CullingInformation extends Omit<TooltipProps, 'content'> {
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
}

const CullingInformation: React.FunctionComponent<CullingInformation> = ({
  culled = new Date(0),
  className,
  staleWarning = new Date(0),
  stale = new Date(0),
  currDate = new Date(0),
  children,
  render,
  message,
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

  const { isWarn, isError, msg }: CullingInfo = calculateTooltip(culled, staleWarning, currDate);
  if (render) {
    return (
      <span
        className={clsx({ [classes.inventoryCullingWarning]: isWarn, [classes.inventoryCullingDanger]: isError }, className)}
      >
        {isWarn &&
          <Button variant="plain" aria-label="Action" role="tooltip" icon={<ExclamationTriangleIcon className={clsx( classes.iconMargin, classes.inventoryCullingWarning )}/>} />   
        }
        {isError &&
          <Button variant="plain" aria-label="Action" role="tooltip" icon={<ExclamationCircleIcon  className={clsx( classes.iconMargin, classes.inventoryCullingDanger )}/>} />   
        }
        <span className={clsx( classes.messageFont )}>
          {render({ msg })}
        </span>
        
      </span>
    );
  }

  return (
    <React.Fragment>
      <Tooltip {...props} content={msg} position="bottom">
        <span
          className={clsx({ [classes.inventoryCullingWarning]: isWarn, [classes.inventoryCullingDanger]: isError }, className)}
        >
          {isError && <Button variant="plain" aria-label="Action" role="tooltip" icon={<ExclamationTriangleIcon className={clsx( classes.inventoryCullingWarning )}/>} />}
          {isWarn && <Button variant="plain" aria-label="Action" role="tooltip" icon={<ExclamationCircleIcon  className={clsx( classes.iconMargin, classes.inventoryCullingDanger )}/>} />}
          {children}
        </span>
      </Tooltip>
    </React.Fragment>
  );
};

export default CullingInformation;

