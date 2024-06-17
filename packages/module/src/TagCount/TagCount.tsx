import React from 'react';
import clsx from 'clsx';
import { Button, ButtonProps, Icon } from '@patternfly/react-core';
import { TagIcon } from '@patternfly/react-icons';
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  buttonTagCount: {
    color: 'var(--pf-t--color--gray--50)',
    display: 'flex',
    alignItems: 'center'
  },

  tagText: {
    marginLeft: 'var(--pf-v5-global--spacer--sm)',
    fontSize: 'var(--pf-v5-global--FontSize--sm)'
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
        <TagIcon />
      </Icon>
      <span className={classes.tagText} data-ouia-component-id={`${ouiaId}-text`}>{count}</span>
    </Button>
  );
};

export default TagCount;
