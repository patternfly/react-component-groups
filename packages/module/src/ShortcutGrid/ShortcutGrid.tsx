import * as React from 'react';
import { createUseStyles } from 'react-jss';
import Shortcut, { ShortcutProps } from '../Shortcut/Shortcut';
import { Grid, GridItem, GridItemProps, GridProps } from '@patternfly/react-core';

export interface ShortcutGridProps extends GridProps {
  /** Array of shortcuts to be displayed in the grid */
  shortcuts: ShortcutProps[];
  /** Shortcut GridItem props */
  gridItemProps?: GridItemProps;
  /** Custom OUIA ID */
  ouiaId?: string | number;
}

const useStyles = createUseStyles({
  shortcutGridItem: {
    textAlign: 'right',
    marginRight: 'var(--pf-v5-global--spacer--sm)'
  }
})

const ShortcutGrid: React.FunctionComponent<ShortcutGridProps> = ({ shortcuts, gridItemProps, ouiaId = 'ShortcutGrid', ...props }: ShortcutGridProps) => {
  const classes = useStyles();
  return (
    <Grid span={6} hasGutter key="grid" data-ouia-component-id={ouiaId} {...props}>
      {shortcuts.map((shortcut, index) => {
        const { description, ...props } = shortcut;
        return(
          <React.Fragment key={index}>
            <GridItem className={classes.shortcutGridItem} data-ouia-component-id={`${ouiaId}-item-${index}`} {...gridItemProps}>
              <Shortcut {...props}/>
            </GridItem>
            <GridItem data-ouia-component-id={`${ouiaId}-item-description-${index}`}>{description}</GridItem>
          </React.Fragment>
        )})}
    </Grid>)
}

export default ShortcutGrid;