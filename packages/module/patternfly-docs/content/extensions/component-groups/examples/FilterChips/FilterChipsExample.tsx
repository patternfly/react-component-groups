import React, { useState } from 'react';
import { Button } from '@patternfly/react-core';
import { FilterChips, FilterChipsFilter } from '@patternfly/react-component-groups/dist/dynamic/FilterChips';

const initialFilters: FilterChipsFilter[] = [
  { name: 'Filter 1', count: 3 },
  { name: 'Filter 2', count: 5 },
  {
    category: 'Category 1',
    chips: [
      { name: 'SubFilter 1', count: 2 },
      { name: 'SubFilter 2', count: 4 },
    ],
  },
];

// Helper function to determine if a filter is a plain FilterChip
// function isPlainFilterChip(group: FilterChipsFilter): group is FilterChip {
//   return !(group as FilterChipGroup).category;
// }

export const BasicExample: React.FunctionComponent = () => {
  const [ filters, setFilters ] = useState<FilterChipsFilter[]>(initialFilters);

  // const handleDelete = (event: React.MouseEvent<Element, MouseEvent>, filtersToDelete: FilterChipsFilter[], deleteAll?: boolean) => {
  //   if (deleteAll) {
  //     setFilters([]);
  //   } 
  //   else {
  //     setFilters((prevFilters) =>
  //       prevFilters
  //         .map((filter) => {
  //           if (filtersToDelete.some((f) => f.category === (filter as FilterChipGroup).category)) {
  //             return {
  //               ...filter,
  //               chips: (filter as FilterChipGroup).chips.filter(
  //                 (chip) => !filtersToDelete.some((f) => f.name === chip.name)
  //               ),
  //             };
  //           }
  //           return filter;
  //         })
  //         .filter((filter) => (isPlainFilterChip(filter) ? !filtersToDelete.some((f) => f.name === filter.name) : (filter as FilterChipGroup).chips.length > 0))
  //     );
  //   }
  // };

  // const handleDeleteGroup = (event: React.MouseEvent<Element, MouseEvent>, groupToDelete: FilterChipsFilter[]) => {
  //   setFilters((prevFilters) => prevFilters.filter((filter) => filter !== groupToDelete[0]));
  // };

  return (
    <>
      <Button className="pf-v5-u-mb-lg" onClick={() => setFilters(filters)}>Reset filters</Button>
      <div>
        <FilterChips
          filters={filters}
          onDelete={() => setFilters([])}
          onDeleteGroup={() => null}
        />
      </div>
    </>
  );
};
