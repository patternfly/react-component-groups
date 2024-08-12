import React from 'react';
import { Badge, Button, ButtonVariant, Chip, ChipGroup, ChipGroupProps, ChipProps } from '@patternfly/react-core';
import { createUseStyles } from 'react-jss';
import clsx from 'clsx';

export interface FilterLabel extends Omit<ChipProps, 'children'> {
  /** The text of the filter label that will be displayed */
  text: string;
  /** Optional count associated with the filter label */
  count?: number;
}

export interface FilterLabelGroup extends Omit<ChipGroupProps, 'children' | 'ref'> {
  /** An array of filter labels that belong to the category */
  labels: FilterLabel[];
}

export type FilterLabelsFilter = FilterLabel | FilterLabelGroup;

export interface FilterLabelsProps {
  /** Additional class names to be applied to the FilterLabels component */
  className?: string;
  /** Array of filters that can be either individual labels or label groups */
  filters: FilterLabelsFilter[];
  /** Callback function invoked when one or multiple filters are removed */
  onDelete: (event: React.MouseEvent<Element, MouseEvent>, filters: FilterLabelsFilter | FilterLabelsFilter[]) => void;
  /** Custom title for the delete all button */
  deleteAllButtonTitle?: React.ReactNode;
  /** Determines whether to show the delete all button */
  showDeleteAllButton?: boolean;
  /** Determines whether to show the delete group button */
  showDeleteGroupButton?: boolean;
  /** FilterLabels OUIA ID */
  ouiaId?: string | number;
}

// Filter label group type guard
export const isFilterLabelGroup = (group: FilterLabelsFilter): group is FilterLabelGroup => Object.prototype.hasOwnProperty.call(group, 'categoryName');

// Plain filter label type guard
export const isFilterLabel = (group: FilterLabelsFilter): group is FilterLabel => !isFilterLabelGroup(group);

const useStyles = createUseStyles({
  chipFilters: {
    '& .pf-v5-c-chip-group:not(:last-child)': {
      marginRight: 'var(--pf-v5-global--spacer--sm)',
    },
    '& .pf-v5-c-chip .pf-v5-c-badge': {
      marginLeft: 'var(--pf-v5-global--spacer--xs)',
    },
  },
});

export const FilterLabels: React.FunctionComponent<FilterLabelsProps> = ({
  className,
  filters,
  onDelete,
  deleteAllButtonTitle = 'Clear filters',
  showDeleteAllButton = true,
  showDeleteGroupButton = false,
  ouiaId = 'FilterLabels'
}: FilterLabelsProps) => {
  const classes = useStyles();
  const groups: FilterLabelGroup[] = filters.filter(isFilterLabelGroup);

  const groupedFilters = groups.map(({ labels, ...group }) => (
    <ChipGroup
      ouiaId={`${ouiaId}-group-${group.categoryName}`}
      key={`group-${group.categoryName}`}
      {...group}
      {...(showDeleteGroupButton && labels.length > 1 && {
        isClosable: true,
        onClick: (event) => {
          event.stopPropagation();
          onDelete(
            event,
            { ...group, labels } 
          );
        },
      })}
    >
      {labels.map((label: FilterLabel) => (
        <Chip
          ouiaId={`${ouiaId}-label-${group.categoryName}-${label.text}`}
          key={label.text}
          onClick={(event) => {
            event.stopPropagation();
            onDelete(event, { ...group, labels: [ label ] });
          }}
        >
          {label.text}
          {label.count && (
            <Badge
              key={`badge-${label.text}`}
              data-ouia-component-id={`${ouiaId}-label-${group.categoryName}-${label.text}-badge`} isRead={label.isReadOnly}
            >
              {label.count}
            </Badge>
          )}
          {label.badge}
        </Chip>
      ))}
    </ChipGroup>
  ));

  const plainFilters = filters.filter(isFilterLabel);

  return (
    <span className={clsx(className, classes.chipFilters)}>
      {groupedFilters}
      {plainFilters?.map((label) => (
        <ChipGroup key={`plain-label-${label.text}`} ouiaId={`${ouiaId}-group-${label.text}`}>
          <Chip
            ouiaId={`${ouiaId}-label-${label.text}`}
            onClick={(event) => {
              event.stopPropagation();
              onDelete(event, [ label ]);
            }}
          >
            {label.text}
            {label.count && (
              <Badge key={`label-badge-${label.text}`} data-ouia-component-id={`${ouiaId}-label-${label.text}-badge`} isRead={label.isReadOnly}>
                {label.count}
              </Badge>
            )}
            {label.badge}
          </Chip>
        </ChipGroup>
      ))}
      {(showDeleteAllButton && filters.length > 0) && (
        <Button variant={ButtonVariant.link} ouiaId={`${ouiaId}-delete-all-button`} onClick={(event) => onDelete(event, filters)}>
          {deleteAllButtonTitle}
        </Button>
      )}
    </span>
  );
};

export default FilterLabels;
