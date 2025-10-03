import { FunctionComponent, useState } from 'react';
import { Button, ButtonVariant } from '@patternfly/react-core';
import { Table, Tbody, Td, Th, Tr, Thead } from '@patternfly/react-table';
import { ColumnsIcon } from '@patternfly/react-icons';
import ColumnManagementModal, {
  ColumnManagementModalColumn
} from '@patternfly/react-component-groups/dist/dynamic/ColumnManagementModal';

const DEFAULT_COLUMNS: ColumnManagementModalColumn[] = [
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
  },
  {
    title: 'CVSS Vector',
    key: 'cvssVector',
    isShownByDefault: false,
    isShown: false
  },
  {
    title: 'Severity',
    key: 'severity',
    isShownByDefault: true,
    isShown: true
  }
];

const ROWS = [
  {
    id: 'CVE-2024-1546',
    publishDate: '20 Feb 2024',
    impact: 'Important',
    score: '7.5',
    cvssVector: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:N/A:N',
    severity: 'High'
  },
  {
    id: 'CVE-2024-1547',
    publishDate: '20 Feb 2024',
    impact: 'Important',
    score: '7.5',
    cvssVector: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:N/A:N',
    severity: 'High'
  },
  {
    id: 'CVE-2024-1548',
    publishDate: '20 Feb 2024',
    impact: 'Moderate',
    score: '6.1',
    cvssVector: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:C/C:L/I:L/A:N',
    severity: 'Medium'
  },
  {
    id: 'CVE-2024-1549',
    publishDate: '20 Feb 2024',
    impact: 'Moderate',
    score: '6.1',
    cvssVector: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:C/C:L/I:L/A:N',
    severity: 'Medium'
  }
];

export const ColumnManagementModalDragDropExample: FunctionComponent = () => {
  const [ columns, setColumns ] = useState(DEFAULT_COLUMNS);
  const [ isOpen, setOpen ] = useState(false);

  return (
    <>
      <ColumnManagementModal
        appliedColumns={columns}
        applyColumns={(newColumns) => setColumns(newColumns)}
        isOpen={isOpen}
        onClose={() => setOpen(false)}
        enableDragDrop={true}
        title="Manage and reorder columns"
        description="Selected categories will be displayed in the table. Drag and drop to reorder columns."
      />
      <Button
        className="pf-v6-u-mb-sm"
        onClick={() => setOpen(true)}
        variant={ButtonVariant.secondary}
        icon={<ColumnsIcon />}
      >
        Manage columns
      </Button>
      <Table aria-label="Simple table with reorderable columns" variant="compact">
        <Thead>
          <Tr>
            {columns
              .filter((column) => column.isShown)
              .map((column) => (
                <Th key={column.key}>{column.title}</Th>
              ))}
          </Tr>
        </Thead>
        <Tbody>
          {ROWS.map((row, rowIndex) => (
            <Tr key={rowIndex}>
              {columns
                .filter((column) => column.isShown)
                .map((column, columnIndex) => (
                  <Td key={columnIndex}>{row[column.key]}</Td>
                ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  );
};