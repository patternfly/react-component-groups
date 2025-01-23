import React from 'react';
import { ExclamationCircleIcon, ExclamationTriangleIcon } from '@patternfly/react-icons';
import { Tooltip, TooltipProps } from '@patternfly/react-core';
import clsx from 'clsx';
import { createUseStyles } from 'react-jss';
import { CullingDate, CullingInfo, calculateTooltip } from './CullingInfoUtils';

export type Render = (config: { msg: string }) => React.ReactElement<any, any> | null;

const useStyles = createUseStyles({
  inventoryCullingWarning: {
    color: 'var(--pf-v6-global--warning-color--200)',
    fontWeight: 'var(--pf-v6-global--FontWeight--bold)',
    svg: {
      marginRight: 'var(--pf-v5-global--spacer--sm)'
    }
  },
  inventoryCullingDanger: {
    color: 'var(--pf-v6-global--warning-color--200)',
    fontWeight: 'var(--pf-v6-global--FontWeight--bold)',
    svg: {
      marginRight: 'var(--pf-v6-global--spacer--sm)'
    }
  }
});

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
}

const CullingInformation: React.FunctionComponent<CullingInformation> = ({
  culled = new Date(0),
  className,
  staleWarning = new Date(0),
  stale = new Date(0),
  currDate = new Date(0),
  children,
  render,
  ...props
}) => {
  const classes = useStyles();

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
        {isWarn && <ExclamationTriangleIcon className={classes.inventoryCullingWarning}/>}
        {isError && <ExclamationCircleIcon />}
        {render({ msg })}
      </span>
    );
  }

  return (
    <React.Fragment>
      <Tooltip {...props} content={msg} position="bottom">
        <span
          className={clsx({ [classes.inventoryCullingWarning]: isWarn, [classes.inventoryCullingDanger]: isError }, className)}
        >
          {isError && <ExclamationCircleIcon />}
          {isWarn && <ExclamationTriangleIcon />}
          {children}
        </span>
      </Tooltip>
    </React.Fragment>
  );
};

export default CullingInformation;

