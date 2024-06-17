import React, { useState } from 'react';
import { BulkSelect, BulkSelectValue } from '@patternfly/react-component-groups/dist/dynamic/BulkSelect';

const allData = [ "Item 1", "Item 2" , "Item 3", "Item4", "Item 5" ];
const pageData = [ "Item 1", "Item 2" ];

export const BasicExample: React.FunctionComponent = () => { 
  const [ selected, setSelected ] = useState<string[]>([]);

  const handleBulkSelect = (value: BulkSelectValue) => {
    value === BulkSelectValue.none && setSelected([]);
    value === BulkSelectValue.all && setSelected(allData);
    value === BulkSelectValue.nonePage && setSelected(selected.filter(item => !pageData.includes(item)));
    value === BulkSelectValue.page && setSelected(pageData);
  };

  return (
    <BulkSelect
      selectedCount={selected.length}
      pageCount={pageData.length}
      onSelect={handleBulkSelect}
      pageSelected={pageData.every(item => selected.includes(item))}
      pagePartiallySelected={pageData.some(item => selected.includes(item)) && !pageData.every(item => selected.includes(item))}
    />
  );
}