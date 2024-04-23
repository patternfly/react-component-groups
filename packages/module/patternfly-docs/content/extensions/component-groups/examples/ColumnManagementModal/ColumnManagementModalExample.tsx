import React from 'react'
import { Button } from '@patternfly/react-core';
import { Table, Tbody, Td, Th, Tr, Thead } from '@patternfly/react-table';
import ColumnManagementModal, { ColumnManagementModalColumn } from '@patternfly/react-component-groups/dist/dynamic/ColumnManagementModal';

const DEFAULT_COLUMNS: ColumnManagementModalColumn[] = [
  {
    title: 'ID',
    key: 'id',
    isShownByDefault: true,
    isShown: true,
    isAlwaysShown: true
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

const ROWS = [
  {
    id: 'CVE-2024-1546',
    publishDate: '20 Feb 2024',
    impact: 'Important',
    score: '7.5'
  },
  {
    id: 'CVE-2024-1547',
    publishDate: '20 Feb 2024',
    impact: 'Important',
    score: '7.5'
  },
  {
    id: 'CVE-2024-1548',
    publishDate: '20 Feb 2024',
    impact: 'Moderate',
    score: '6.1'
  },
  {
    id: 'CVE-2024-1549',
    publishDate: '20 Feb 2024',
    impact: 'Moderate',
    score: '6.1'
  }
]

export const ColumnManagementModalExample: React.FunctionComponent = () => {
  const [ columns, setColumns ] = React.useState(DEFAULT_COLUMNS);
  const [ isOpen, setOpen ] = React.useState(false);
  
  return (
    <>
      <ColumnManagementModal
        appliedColumns={columns}
        applyColumns={newColumns => setColumns(newColumns)}
        isOpen={isOpen}
        onClose={() => setOpen(false)}
      />
      <Button onClick={() => setOpen(true)}>Manage columns</Button>
      <Table
        aria-label="Simple table"
        variant="compact"
      >
        <Thead>
          <Tr>
            {columns.filter(column => column.isShown).map(column => <Th key={column.key}>{column.title}</Th>)}
          </Tr>
        </Thead>
        <Tbody>
          {ROWS.map((row, rowIndex) => 
            <Tr key={rowIndex}>
              {columns.filter(column => column.isShown).map((column, columnIndex) =>
                <Td key={columnIndex}>{row[column.key]}</Td>
              )}
            </Tr>  
          )}
        </Tbody>
      </Table>
    </>
  )
}
