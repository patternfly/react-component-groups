import * as React from 'react';
import { MouseIcon } from '@patternfly/react-icons';
import { Label } from '@patternfly/react-core';
import { createUseStyles } from 'react-jss';
import clsx from 'clsx';

export interface ShortcutProps {
  /** Array of shortcut keys */
  keys: string[];
  /** Shortcut description */
  description?: React.ReactNode;
  /** Indicates whether symbols should be displayed for certain keys */
  showSymbols?: boolean;
  /** Show hover in the shortcut */
  hover?: boolean;
  /** Show click in the shortcut */
  click?: boolean;
  /** Show right click in the shortcut */
  rightClick?: boolean;
  /** Show drag in the shortcut */
  drag?: boolean;
  /** Show drag and drop in the shortcut */
  dragAndDrop?: boolean;
  /** Shortcut className */
  className?: string;
  /** Custom OUIA ID */
  ouiaId?: string | number;
}

const symbols = {
  'shift': '⇧',
  'opt': '⌥',
  'cmd': '⌘',
  'enter': '↵',
  'ctrl': '^',
  'caps lock': '⇪',
  'tab': '↹',
  'win': '⊞',
  'backspace': '⌫'
}

const useStyles = createUseStyles({
  shortcut: {
    marginRight: 'var(--pf-t--global--spacer--400)'
  }
})

const Shortcut: React.FunctionComponent<ShortcutProps> = ({
  keys = [],
  description = null,
  showSymbols = true,
  hover,
  click,
  drag, 
  rightClick, 
  dragAndDrop,
  className,
  ouiaId = 'Shortcut',
  ...props
}: ShortcutProps) => {
  const classes = useStyles();
  const badges = [
    ...(hover ? [ 
      <Label variant="outline" key="hover" data-test-id="hover">
        <MouseIcon /> Hover
      </Label>
    ] : []),
    ...keys.map((key) => {
      const trimmedKey = key.trim().toLowerCase();
      return(
        <Label variant="outline" key={key} data-test-id={`${key}-key`}>
          {showSymbols && symbols[trimmedKey] ? `${symbols[trimmedKey]} ` : '' }
          {key.length === 1 ? key.toUpperCase() : key[0].toUpperCase() + key.slice(1).toLowerCase()}
        </Label>
      )}),
    ...(click ? [ 
      <Label variant="outline" key="click" data-test-id="click">
        <MouseIcon /> Click
      </Label>
    ] : []),
    ...(rightClick ? [ 
      <Label variant="outline" key="right-click" data-test-id="right-click">
        <MouseIcon /> Right click
      </Label>
    ] : []),
    ...(drag ? [ 
      <Label variant="outline" key="drag" data-test-id="drag">
        <MouseIcon /> Drag
      </Label>
    ] : []),
    ...(dragAndDrop ? [ 
      <Label variant="outline" key="drag-and-drop" data-test-id="drag-and-drop">
        <MouseIcon /> Drag + Drop
      </Label>
    ] : [])
  ]

  return (
    <>
      <span className={clsx({ [classes.shortcut]: description, className })} data-ouia-component-id={ouiaId} {...props}>
        {badges.length > 0 && badges.reduce((prev, curr, idx) => (
          <div key={idx}>{[ prev, ' + ', curr ]}</div>
        ))}
      </span>
      {description}
    </>
  );}

export default Shortcut;