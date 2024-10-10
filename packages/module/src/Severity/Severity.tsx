import React, { useMemo } from 'react';
import clsx from 'clsx';
import {
  SeverityCriticalIcon,
  SeverityImportantIcon,
  SeverityMinorIcon,
  SeverityModerateIcon,
  SeverityNoneIcon,
  SeverityUndefinedIcon
} from '@patternfly/react-icons';
import { createUseStyles } from 'react-jss';

const severityCritical = {
  '& svg': {
    '& path': { fill: 'var(--pf-t--global--color--status--danger--default)' }
  }
};

const severityImportant = {
  '& svg': {
    '& path': { fill: 'var(--pf-t--global--icon--color--severity--important--default)' }
  }
};

const severityModerate = {
  '& svg': {
    '& path': { fill: 'var(-pf-t--global--icon--color--severity--moderate--default)' }
  }
};

const severityMinor = {
  '& svg': {
    '& path': { fill: 'var(--pf-t--global--icon--color--severity--minor--default)' }
  }
};

const severityNone = {
  '& svg': {
    '& path': { fill: 'var(--pf-t--global--icon--color--severity--none--default)' }
  }
};

const severityUndefined = {
  '& svg': {
    '& path': { stroke: 'var(--pf-t--global--icon--color--severity--undefined--default)' }
  }
};

const useStyles = createUseStyles({
  battery: {
    display: 'inline-block',
    'line-height': 0,
    '& svg': {
      position: 'relative',
      top: 'var(--pf-t--global--spacer--sm)',
      height: '1.75rem'
    }
  },

  severityNone,
  severityMinor,
  severityModerate,
  severityImportant,
  severityCritical,
  severityUndefined
});

const batteryLevels = (severity: SeverityType, classMode?: boolean) => {
  switch (severity) {
  case 'critical':
    return classMode ? 'severityCritical' : <SeverityCriticalIcon />;
  case 'important':
    return classMode ? 'severityImportant' : <SeverityImportantIcon />;
  case 'minor':
    return classMode ? 'severityMinor' : <SeverityMinorIcon />;
  case 'moderate':
    return classMode ? 'severityModerate' : <SeverityModerateIcon />;
  case 'none':
    return classMode ? 'severityMinor' : <SeverityNoneIcon />;
  default:
    return classMode ? 'severityNone' : <SeverityUndefinedIcon />;
  }
};

export const SeverityType = {
  critical: 'critical',
  important: 'important',
  minor: 'minor',
  moderate: 'moderate',
  none: 'none',
  undefined: 'undefined',  
} as const;

export type SeverityType = (typeof SeverityType)[keyof typeof SeverityType];

export interface SeverityProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
  /** Determines a variant of displayed battery */
  severity: SeverityType;
  /** Label displayed next to the battery */
  label: string;
  /** Option to hide the label */
  labelHidden?: boolean;
  /** Custom className */
  className?: string;
  /** Custom OUIA ID */
  ouiaId?: string | number;
}

export const Severity: React.FunctionComponent<SeverityProps> = ({
  severity,
  label,
  labelHidden,
  className,
  ouiaId = 'Severity-icon',
  ...props
}: SeverityProps) => {
  const classes = useStyles();
  const batteryClasses = clsx(classes.battery, classes[String(batteryLevels(severity, true))], className);

  const title = { title: `${severity} ${label}` };

  const batteryVariant = useMemo(() => batteryLevels(severity), [ severity ]);

  return (
    <React.Fragment>
      {/* eslint-disable-next-line react/no-unknown-property */}
      <i className={batteryClasses} {...title} {...props} widget-type="Severity" widget-id={label} data-ouia-component-id={ouiaId}>
        {batteryVariant}
      </i>
      {!labelHidden && <span> {label} </span>}
    </React.Fragment>
  );
};

export default Severity;
