import React from 'react'
import { Button } from '@patternfly/react-core';
import { Table, Tbody, Td, Th, Tr, Thead } from '@patternfly/react-table';
import ColumnManagementModal, { ColumnManagementModalColumn } from '@patternfly/react-component-groups/dist/dynamic/ColumnManagementModal';

const DEFAULT_COLUMNS: ColumnManagementModalColumn[] = [
  {
    title: 'CVE ID',
    key: 'synopsis',
    isShownByDefault: true,
    isShown: true,
    isAlwaysShown: true
  },
  {
    title: 'Publish date',
    key: 'publish_date',
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
    title: 'CVSS base score',
    key: 'cvss_score',
    isShownByDefault: false,
    isShown: false
  }
];

/* eslint-disable camelcase */
const ROWS = [
  {
    synopsis: 'CVE-2024-1546',
    publish_date: '20 Feb 2024',
    impact: 'Important',
    cvss_score: '7.5'
  },
  {
    synopsis: 'CVE-2024-1547',
    publish_date: '20 Feb 2024',
    impact: 'Important',
    cvss_score: '7.5'
  },
  {
    synopsis: 'CVE-2024-1548',
    publish_date: '20 Feb 2024',
    impact: 'Moderate',
    cvss_score: '6.1'
  },
  {
    synopsis: 'CVE-2024-1549',
    publish_date: '20 Feb 2024',
    impact: 'Moderate',
    cvss_score: '6.1'
  }
]
/* eslint-enable camelcase */

export const ColumnManagementModalExample: React.FunctionComponent = () => {
  const [ columns, setColumns ] = React.useState(DEFAULT_COLUMNS);
  const [ isModalOpen, setModalOpen ] = React.useState(false);
  
  return (
    <>
      <ColumnManagementModal
        appliedColumns={columns}
        applyColumns={newColumns => setColumns(newColumns)}
        isModalOpen={isModalOpen}
        setModalOpen={setModalOpen}
        key="column-mgmt-modal"
      />
      <Button onClick={() => setModalOpen(true)}>Manage columns</Button>
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
