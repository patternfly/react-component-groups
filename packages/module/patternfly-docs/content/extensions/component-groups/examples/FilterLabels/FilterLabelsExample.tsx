import React, { useState } from 'react';
import { Button, Flex, FlexItem, Text } from '@patternfly/react-core';
import { FilterLabel, FilterLabelGroup, FilterLabels, FilterLabelsFilter, isFilterLabel } from '@patternfly/react-component-groups/dist/dynamic/FilterLabels';

const initialFilters: FilterLabelsFilter[] = [
  { text: 'Users', count: 3 },
  {
    categoryName: 'Status',
    labels: [
      { text: 'Inactive' },
    ],
  },
  {
    categoryName: 'Application',
    labels: [
      { text: 'Settings' },
      { text: 'Subscriptions' },
    ],
  },
];

export const BasicExample: React.FunctionComponent = () => {
  const [ filters, setFilters ] = useState<FilterLabelsFilter[]>(initialFilters);

  const onDelete = (_event: React.MouseEvent<Element, MouseEvent>, toDelete: FilterLabelsFilter | FilterLabelsFilter[]) => {
    setFilters((prevFilters) => {
      const filtersToDelete = Array.isArray(toDelete) ? toDelete : [ toDelete ];
  
      return prevFilters
        .map((prevFilter) => {
          const matchingGroup = filtersToDelete.find((filter) => (filter as FilterLabelGroup)?.categoryName === (prevFilter as FilterLabelGroup)?.categoryName);
          // if matching group to delete is found, remove necessary labels inside, or keep filter as it was
          return matchingGroup ?
            {
              ...prevFilter,
              labels: (prevFilter as FilterLabelGroup)?.labels?.filter(
                (prevLabel: FilterLabel) => !(matchingGroup as FilterLabelGroup).labels.some((label: FilterLabel) => (label as FilterLabel).text === prevLabel.text)
              )
            } : prevFilter;
        })
        .filter((prevFilter) => (isFilterLabel(prevFilter) ? 
          !filtersToDelete.some((filter) => (filter as FilterLabel)?.text === prevFilter?.text)  // remove selected plain labels
          : (prevFilter as FilterLabelGroup).labels.length > 0) // remove empty label groups
        );
    });
  };

  return (
    <Flex direction={{ default: 'column' }}>
      <FlexItem>
        <Button title='Click to reset the filters to the initial values' className="pf-v5-u-mb-md" onClick={() => setFilters(initialFilters)}>Reset filters</Button>
      </FlexItem>
      <FlexItem>
        {filters.length === 0 ? (
          <Text component="p">Click the button to reset the filters to the initial values.</Text> 
        ) : (
          <FilterLabels
            filters={filters}
            onDelete={onDelete}
          />
        )}         
      </FlexItem>
    </Flex>
  );
};
