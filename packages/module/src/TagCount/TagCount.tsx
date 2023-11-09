import React from 'react';
import clsx from 'clsx';
import { BaseSizes, Button, ButtonProps, Icon, IconComponentProps, IconProps } from '@patternfly/react-core';
import { TagIcon } from '@patternfly/react-icons';
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  buttonTagCount: {
    color: 'var(--pf-v5-global--icon--Color--light)',
    display: 'flex',
    alignItems: 'center'
  },

  tagText: {
    marginLeft: 10
  }
});

export interface TagCountProps extends ButtonProps {
  /** Count to display in tag count component */
  count?: number;
  /** Additional classes added to the tag count component */
  className?: string;
  /** Icon size */
  iconSize?: 'sm' | 'md' | 'lg' | 'xl';
}

const TagCount: React.FunctionComponent<TagCountProps> = (
  { count, 
    className,
    iconSize= 'md',
    ...props }: TagCountProps) => {
  const classes = useStyles();
  const tagClasses = clsx(classes.buttonTagCount, className);
  return (
    <Button aria-label="Tag count" {...props} variant="plain" isDisabled={!count} className={tagClasses}>
      <Icon iconSize={iconSize} >
        <TagIcon/>
      </Icon>
      <span className={classes.tagText}>{count}</span>
    </Button>
  );
};

export default TagCount;
