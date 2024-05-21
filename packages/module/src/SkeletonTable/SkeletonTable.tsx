import React from 'react';
import {
  Caption,
  Table,
  TableProps,
  TableVariant,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  RowSelectVariant
} from '@patternfly/react-table';
import { Skeleton } from '@patternfly/react-core';

export interface SkeletonTableProps extends Omit<TableProps, 'ref'> {
  /** Indicates the table variant */
  variant?: TableVariant;
  /** Flag indicating if the table should have borders */
  borders?: boolean;
  /** The number of rows the skeleton table should contain */
  rows?: number;
  /** Any captions that should be added to the table */
  caption?: React.ReactNode;
  /** Custom OUIA ID */
  ouiaId?: string | number;
  /** Flag indicating if the table is selectable */
  isSelectable?: boolean;
  /** Flag indicating if the table is expandable */
  isExpandable?: boolean;
  /** Determines if the row selection variant (radio/checkbox) */
  selectVariant?: RowSelectVariant;
  /** Custom columns for the table */
  columns?: string[] | React.ReactElement<typeof Th>[];
  /** Number of columns in the table */
  numberOfColumns?: number;
}

const SkeletonTable: React.FunctionComponent<SkeletonTableProps> = ({
  variant,
  borders = true,
  rows = 5,
  caption,
  ouiaId = 'SkeletonTable',
  isSelectable,
  isExpandable,
  selectVariant = RowSelectVariant.checkbox,
  columns,
  numberOfColumns,
  ...rest
}: SkeletonTableProps) => {
  const hasCustomColumns = Array.isArray(columns);
  const rowCells = hasCustomColumns ? columns?.length ?? 0 : numberOfColumns;
  const rowArray = [ ...new Array(rowCells) ];

  const bodyRows = [ ...new Array(rows) ].map((_, rowIndex) => (
    <Tr key={rowIndex} ouiaId={`${ouiaId}-tr-${rowIndex}`}>
      {isExpandable && (
        <Td
          data-ouia-component-id={`${ouiaId}-td-expand-${rowIndex}`}
          expand={{
            rowIndex,
            isExpanded: false
          }}
        />
      )}
      {isSelectable && (
        <Td
          data-ouia-component-id={`${ouiaId}-td-select-${rowIndex}`}
          select={{
            rowIndex,
            isSelected: false,
            isDisabled: true,
            variant: selectVariant
          }}
        />
      )}
      {rowArray.map((_, colIndex) => (
        <Td key={colIndex} data-ouia-component-id={`${ouiaId}-td-${rowIndex}-${colIndex}`}>
          <Skeleton />
        </Td>
      ))}
    </Tr>
  ));

  return (
    <Table aria-label="Loading" variant={variant} borders={borders} ouiaId={ouiaId} {...rest}>
      {caption && <Caption>{caption}</Caption>}
      <Thead data-ouia-component-id={`${ouiaId}-thead`}>
        <Tr ouiaId={`${ouiaId}-tr-head`}>
          {isExpandable && <Th key="expand" />}
          {isSelectable && <Th key="select" />}
          {hasCustomColumns
            ? columns?.map((c, index) =>
              typeof c === 'string' ? (
                <Th key={index} data-ouia-component-id={`${ouiaId}-th-${index}`}>
                  {c}
                </Th>
              ) : (
                React.cloneElement(c, { key: index, 'data-ouia-component-id': `${ouiaId}-th-${index}` })
              )
            )
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
