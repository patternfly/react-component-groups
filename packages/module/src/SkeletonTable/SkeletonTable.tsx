import React, { ReactNode } from 'react';
import { Caption, Table, TableProps, TableVariant, Tbody, Td, Th, Thead, Tr } from '@patternfly/react-table';
import { Skeleton } from '@patternfly/react-core';

export type SkeletonTableProps = Omit<TableProps, 'ref'> & {
  /** Indicates the table variant */
  variant?: TableVariant;
  /** The number of rows the skeleton table should contain */
  rows?: number;
  /** Any captions that should be added to the table */
  caption?: ReactNode;
  /** Custom OUIA ID */
  ouiaId?: string | number;
} & (
    | {
        columns: ReactNode[];
      }
    | {
        numberOfColumns: number;
      }
  );


function hasCustomColumns(props: Record<string, any>): props is SkeletonTableProps & {
  columns: ReactNode[];
} {
  return Array.isArray(props.columns);
}

const SkeletonTable: React.FunctionComponent<SkeletonTableProps> = (props: SkeletonTableProps) => {
  const { variant, rows = 5, caption, ouiaId = 'SkeletonTable', ...rest } = props;
  const rowCells = hasCustomColumns(props) ? props.columns.length : props.numberOfColumns;
  const rowArray = [ ...new Array(rowCells) ];
  const bodyRows = [ ...new Array(rows) ].map((_, rowIndex) => (
    <Tr key={rowIndex} ouiaId={`${ouiaId}-tr-${rowIndex}`}>
      {rowArray.map((_, colIndex) => (
        <Td key={colIndex} data-ouia-component-id={`${ouiaId}-td-${rowIndex}-${colIndex}`}>
          <Skeleton />
        </Td>
      ))}
    </Tr>
  ));

  return (
    <Table aria-label="Loading" variant={variant} ouiaId={ouiaId} {...rest}>
      {caption && <Caption>{caption}</Caption>}
      <Thead data-ouia-component-id={`${ouiaId}-thead`}>
        <Tr ouiaId={`${ouiaId}-tr-head`}>
          {hasCustomColumns(props)
            ? props.columns.map((c, index) => <Th key={index} data-ouia-component-id={`${ouiaId}-th-${index}`}>{c}</Th>)
            : rowArray.map((_, index) => (
              <Th key={index} data-ouia-component-id={`${ouiaId}-th-${index}`}>
                <Skeleton />
              </Th>
            ))}
        </Tr>
      </Thead>
      <Tbody data-ouia-component-id={`${ouiaId}-tbody`}>{bodyRows}</Tbody>
    </Table>
  );
};

export default SkeletonTable;
