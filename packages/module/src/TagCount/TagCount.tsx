import React from 'react';
import clsx from 'clsx';
import { Button, ButtonProps, Icon } from '@patternfly/react-core';
import { TagIcon } from '@patternfly/react-icons';
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  buttonTagCount: {
    display: 'flex',
    alignItems: 'center',
    padding: 'var(--pf-t--global--spacer--200) var(--pf-t--global--spacer--300)'
  },

  tagIcon: {
    color: 'var(--pf-t--global--icon--color--100)',
  },

  tagText: {
    marginLeft: 'var(--pf-t--global--spacer--200)',
    fontSize: 'var(--pf-t--global--font--size--200)'
  }
});

export interface TagCountProps extends ButtonProps {
  /** Count to display in tag count component */
  count?: number;
  /** Additional classes added to the tag count component */
  className?: string;
  /** Icon size */
  iconSize?: 'sm' | 'md' | 'lg' | 'xl';
  /** Custom OUIA ID */
  ouiaId?: string | number;
}

const TagCount: React.FunctionComponent<TagCountProps> = ({
  count, 
  className,
  iconSize= 'md',
  ouiaId = 'TagCount',
  ...props 
}: TagCountProps) => {
  const classes = useStyles();
  const tagClasses = clsx(classes.buttonTagCount, className);
  return (
    <Button aria-label="Tag count" {...props} variant="plain" isDisabled={!count} className={tagClasses} ouiaId={ouiaId} {...props}>
      <Icon iconSize={iconSize} data-ouia-component-id={`${ouiaId}-icon`}>
        <TagIcon className={classes.tagIcon} />
      </Icon>
      <span className={classes.tagText} data-ouia-component-id={`${ouiaId}-text`}>{count}</span>
    </Button>
  );
};

export default TagCount;
