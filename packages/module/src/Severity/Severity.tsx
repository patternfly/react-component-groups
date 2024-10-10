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
  severity: {
    display: 'inline-block',
    'line-height': 0,
    '& svg': {
      position: 'relative',
      top: 'var(--pf-t--global--spacer--sm)',
      height: 'calc(var(--pf-t--global--spacer--md) * 1.75)',
    },
  },
  severityLabel: {
    'margin-left': 'var(--pf-t--global--spacer--xs)'
  },
  severityNone,
  severityMinor,
  severityModerate,
  severityImportant,
  severityCritical,
  severityUndefined
});

const severityLevels = (severity: SeverityType, classMode?: boolean) => {
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
  /** Determines a variant of displayed severity */
  severity: SeverityType;
  /** Label displayed next to the severity */
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
  const severityClasses = clsx(classes.severity, classes[String(severityLevels(severity, true))], className);

  const title = { title: `${severity} ${label}` };

  const severityVariant = useMemo(() => severityLevels(severity), [ severity ]);

  return (
    <React.Fragment>
      {/* eslint-disable-next-line react/no-unknown-property */}
      <i className={severityClasses} {...title} {...props} widget-type="Severity" widget-id={label} data-ouia-component-id={ouiaId}>
        {severityVariant}
      </i>
      {!labelHidden && <span className={clsx(classes.severityLabel)}> {label} </span>}
    </React.Fragment>
  );
};

export default Severity;
