import { FunctionComponent, useState } from 'react';
import { Column, ColumnManagement } from '@patternfly/react-component-groups';

const DEFAULT_COLUMNS: Column[] = [
  {
    title: 'ID',
    key: 'id',
    isShownByDefault: true,
    isShown: true,
    isUntoggleable: true
  },
  {
    title: 'Publish date',
    key: 'publishDate',
    isShownByDefault: true,
    isShown: true
  },
  {
    title: 'Impact',
    key: 'impact',
    isShownByDefault: true,
    isShown: true
  },
  {
    title: 'Score',
    key: 'score',
    isShownByDefault: false,
    isShown: false
  }
];

export const ColumnExample: FunctionComponent = () => {
  const [ columns, setColumns ] = useState(DEFAULT_COLUMNS);

  return (
    <ColumnManagement
      title="Manage columns"
      description="Select the columns to display in the table."
      columns={columns}
      onOrderChange={setColumns}
      onSelect={(col) => {
          const newColumns = [...columns];
          const changedColumn = newColumns.find(c => c.key === col.key);
          if (changedColumn) {
              changedColumn.isShown = col.isShown;
          }
          setColumns(newColumns);
      }}
      onSelectAll={(newColumns) => setColumns(newColumns)}
      onSave={(newColumns) => {
          setColumns(newColumns);
          alert('Changes saved!');
      }}
      onCancel={() => alert('Changes cancelled!')}
    />
  );
};
