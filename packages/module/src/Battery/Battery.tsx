import React, { useMemo } from 'react';
import clsx from 'clsx';
import { createUseStyles } from 'react-jss'

const batteryDefault = {
  '& svg': {
    '& path': { fill: 'var(--pf-v5-global--disabled-color--200)' }
  }
};

const batteryLow = {
  '& svg': {
    '& path': { fill: 'var(--pf-v5-global--success-color--100)' }
  }
};

const batteryMedium = {
  '& svg': {
    '& path': { fill: 'var(--pf-v5-global--warning-color--100)' }
  }
};

const batteryHigh = {
  '& svg': {
    '& path': { fill: 'var(--pf-v5-global--palette--orange-300)' }
  }
};

const batteryCritical = {
  '& svg': {
    '& path': { fill: 'var(--pf-v5-global--danger-color--100)' }
  }
};

const useStyles = createUseStyles({
  battery: {
    display: 'inline-block',
    'line-height': 0,
    '& svg': {
      position: 'relative',
      top: 'var(--pf-v5-global--spacer--sm)',
      height: '1.75rem'
    }
  },

  batteryDefault,
  batteryLow,
  batteryMedium,
  batteryHigh,
  batteryCritical,
});

const batteryLevels = (severity: BatterySeverity, classMode?: boolean) => {
  switch (severity) {
  case 'critical':
  case 4:
    return classMode ? 'batteryCritical' : <path d="M 99.168858,143.38516 H 351.33914 c 5.33437,0 9.69886,-5.04 9.69886,-11.2 v -28 c 0,-6.16 -4.36449,-11.2 -9.69886,-11.2 H 99.168857 c -5.334371,0 -9.698857,5.04 -9.698857,11.2 v 28 c 0,6.16 4.364486,11.2 9.698858,11.2 z M 99.168857,235.25069 H 351.33914 c 5.33437,0 9.69886,-5.04 9.69886,-11.2 v -28 c 0,-6.16 -4.36449,-11.2 -9.69886,-11.2 H 99.168857 c -5.334371,0 -9.698857,5.04 -9.698857,11.2 v 28 c 0,6.16 4.364486,11.2 9.698857,11.2 z M 99.168857,327.14542 H 351.33914 c 5.33437,0 9.69886,-5.04 9.69886,-11.19999 v -28 c 0,-6.16001 -4.36449,-11.2 -9.69886,-11.2 H 99.168857 c -5.334371,0 -9.698857,5.04 -9.698857,11.2 v 28 c 0,6.16 4.364486,11.19999 9.698857,11.19999 z M 99.168993,419.0375 H 351.33927 c 5.33437,0 9.69886,-5.04 9.69886,-11.2 v -28 c 0,-6.16 -4.36449,-11.2 -9.69886,-11.2 H 99.168993 c -5.334371,0 -9.698857,5.04 -9.698857,11.2 v 28 c 0,6.16 4.364486,11.2 9.698857,11.2 z" />;
  case 'high':
  case 'error':
  case 3:
    return classMode ? 'batteryHigh' : <path d="M 99.168857,235.25069 H 351.33914 c 5.33437,0 9.69886,-5.04 9.69886,-11.2 v -28 c 0,-6.16 -4.36449,-11.2 -9.69886,-11.2 H 99.168857 c -5.334371,0 -9.698857,5.04 -9.698857,11.2 v 28 c 0,6.16 4.364486,11.2 9.698857,11.2 z M 99.168857,327.14542 H 351.33914 c 5.33437,0 9.69886,-5.04 9.69886,-11.19999 v -28 c 0,-6.16001 -4.36449,-11.2 -9.69886,-11.2 H 99.168857 c -5.334371,0 -9.698857,5.04 -9.698857,11.2 v 28 c 0,6.16 4.364486,11.19999 9.698857,11.19999 z M 99.168993,419.0375 H 351.33927 c 5.33437,0 9.69886,-5.04 9.69886,-11.2 v -28 c 0,-6.16 -4.36449,-11.2 -9.69886,-11.2 H 99.168993 c -5.334371,0 -9.698857,5.04 -9.698857,11.2 v 28 c 0,6.16 4.364486,11.2 9.698857,11.2 z" />;
  case 'medium':
  case 'warn':
  case 2:
    return classMode ? 'batteryMedium' : <path d="M 99.168857,327.14542 H 351.33914 c 5.33437,0 9.69886,-5.04 9.69886,-11.19999 v -28 c 0,-6.16001 -4.36449,-11.2 -9.69886,-11.2 H 99.168857 c -5.334371,0 -9.698857,5.04 -9.698857,11.2 v 28 c 0,6.16 4.364486,11.19999 9.698857,11.19999 z M 99.168993,419.0375 H 351.33927 c 5.33437,0 9.69886,-5.04 9.69886,-11.2 v -28 c 0,-6.16 -4.36449,-11.2 -9.69886,-11.2 H 99.168993 c -5.334371,0 -9.698857,5.04 -9.698857,11.2 v 28 c 0,6.16 4.364486,11.2 9.698857,11.2 z" />;
  case 'low':
  case 'info':
  case 1:
    return classMode ? 'batteryLow' : <path d="M 99.168993,419.0375 H 351.33927 c 5.33437,0 9.69886,-5.04 9.69886,-11.2 v -28 c 0,-6.16 -4.36449,-11.2 -9.69886,-11.2 H 99.168993 c -5.334371,0 -9.698857,5.04 -9.698857,11.2 v 28 c 0,6.16 4.364486,11.2 9.698857,11.2 z" />;
  default:
    // eslint-disable-next-line
      console.error('Warning: Unsupported value presented to battery component');
    return classMode ? 'batteryDefault' : <path d="M 99.168858,143.38516 H 351.33914 c 5.33437,0 9.69886,-5.04 9.69886,-11.2 v -28 c 0,-6.16 -4.36449,-11.2 -9.69886,-11.2 H 99.168857 c -5.334371,0 -9.698857,5.04 -9.698857,11.2 v 28 c 0,6.16 4.364486,11.2 9.698858,11.2 z M 99.168857,235.25069 H 351.33914 c 5.33437,0 9.69886,-5.04 9.69886,-11.2 v -28 c 0,-6.16 -4.36449,-11.2 -9.69886,-11.2 H 99.168857 c -5.334371,0 -9.698857,5.04 -9.698857,11.2 v 28 c 0,6.16 4.364486,11.2 9.698857,11.2 z M 99.168857,327.14542 H 351.33914 c 5.33437,0 9.69886,-5.04 9.69886,-11.19999 v -28 c 0,-6.16001 -4.36449,-11.2 -9.69886,-11.2 H 99.168857 c -5.334371,0 -9.698857,5.04 -9.698857,11.2 v 28 c 0,6.16 4.364486,11.19999 9.698857,11.19999 z M 99.168993,419.0375 H 351.33927 c 5.33437,0 9.69886,-5.04 9.69886,-11.2 v -28 c 0,-6.16 -4.36449,-11.2 -9.69886,-11.2 H 99.168993 c -5.334371,0 -9.698857,5.04 -9.698857,11.2 v 28 c 0,6.16 4.364486,11.2 9.698857,11.2 z" />;
  }
};

export type BatterySeverity = 1 | 2 | 3 | 4 | 'info' | 'low' | 'warn' | 'medium' | 'error' | 'high' | 'critical';

export interface BatteryProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
  /** Determines a variant of displayed Battery component */
  severity: BatterySeverity;
  /** Label displayed next to the battery */
  label: string;
  /** Option to hide the label */
  labelHidden?: boolean;
  /** Custom className */
  className?: string;
}

const Battery: React.FunctionComponent<BatteryProps> = ({ severity, label, labelHidden, className, ...props }: BatteryProps) => {
  const classes = useStyles();
  const batteryClasses = clsx(classes.battery, classes[String(batteryLevels(severity, true))], className);

  const title = { ['title']: `${severity} ${label}` };


  const batteryVariant = useMemo(() => batteryLevels(severity) , [ severity ])

  return (
    <React.Fragment>
      {/* eslint-disable-next-line react/no-unknown-property */}
      <i className={batteryClasses} {...title} {...props} widget-type="Battery" widget-id={label}>
        <svg
          version="1.1"
          x="0px"
          y="0px"
          viewBox="0 0 448 512"
          style={{ enableBackground: 'new 0 0 448 512' } as React.CSSProperties}
          shapeRendering="geometricpresision"
        >
          <path
            style={{
              fill: 'none',
              fillOpacity: 1,
              stroke: '#969696',
              strokeWidth: 41.96378708,
              strokeLinejoin: 'round',
              strokeMiterlimit: 4,
              strokeDasharray: 'none',
              strokeDashoffset: 0,
              strokeOpacity: 1,
            }}
            d="m 144.16452,21.032222 h 159.67454 q 123.1748,0 123.1748,128.667868 v 212.64759 q 0,128.66788 -123.1748,128.66788 H 144.16452 q -123.174811,0 -123.174811,-128.66788 V 149.70009 q 0,-128.667868 123.174811,-128.667868 z"
          />
          {batteryVariant}
        </svg>
      </i>
      {!labelHidden && <span> {label} </span>}
    </React.Fragment>
  );
};

export default Battery;
