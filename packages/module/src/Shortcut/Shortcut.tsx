import * as React from 'react';
import { MouseIcon } from '@patternfly/react-icons';
import { Chip } from '@patternfly/react-core';
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
    marginRight: 'var(--pf-v5-global--spacer--lg)'
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
  className
}: ShortcutProps) => {
  const classes = useStyles();
  const badges = [
    ...(hover ? [ 
      <Chip key="hover" isReadOnly data-test-id="hover">
        <MouseIcon /> Hover
      </Chip>
    ] : []),
    ...keys.map((key) => {
      const trimmedKey = key.trim().toLowerCase();
      return(
        <Chip key={key} isReadOnly data-test-id={`${key}-key`}>
          {showSymbols && symbols[trimmedKey] ? `${symbols[trimmedKey]} ` : '' }
          {key.length === 1 ? key.toUpperCase() : key[0].toUpperCase() + key.slice(1).toLowerCase()}
        </Chip>
      )}),
    ...(click ? [ 
      <Chip key="click" isReadOnly data-test-id="click">
        <MouseIcon /> Click
      </Chip>
    ] : []),
    ...(rightClick ? [ 
      <Chip key="right-click" isReadOnly data-test-id="right-click">
        <MouseIcon /> Right click
      </Chip>
    ] : []),
    ...(drag ? [ 
      <Chip key="drag" isReadOnly data-test-id="drag">
        <MouseIcon /> Drag
      </Chip>
    ] : []),
    ...(dragAndDrop ? [ 
      <Chip key="drag-and-drop" isReadOnly data-test-id="drag-and-drop">
        <MouseIcon /> Drag + Drop
      </Chip>
    ] : [])
  ]

  return (
    <>
      <span className={clsx({ [classes.shortcut]: description, className })}>
        {badges.length > 0 && badges.reduce((prev, curr) => (
          <>{[ prev, ' + ', curr ]}</>
        ))}
      </span>
      {description}
    </>
  );}

export default Shortcut;