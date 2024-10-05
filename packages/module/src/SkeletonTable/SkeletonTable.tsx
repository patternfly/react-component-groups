import React, { ReactNode } from 'react';
import {
  Caption,
  Table,
  TableProps,
  TableVariant,
  RowSelectVariant,
  ThProps
} from '@patternfly/react-table';
import SkeletonTableBody, { SkeletonTableBodyProps } from '../SkeletonTableBody';
import SkeletonTableHead, { SkeletonTableHeadProps } from '../SkeletonTableHead';

export interface SkeletonTableProps extends Omit<TableProps, 'ref'>, Omit<SkeletonTableBodyProps, 'columnsCount'>, SkeletonTableHeadProps {
  /** Indicates the table variant */
  variant?: TableVariant;
  /** Flag indicating if the table should have borders */
  borders?: boolean;
  /** The number of rows the skeleton table should contain */
  rowsCount?: number;
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
  columns?: (ReactNode | { cell: ReactNode; props?: ThProps })[];
  /** Number of columns in the table */
  columnsCount?: number;
}

const SkeletonTable: React.FunctionComponent<SkeletonTableProps> = ({
  variant,
  borders = true,
  rowsCount = 5,
  caption,
  ouiaId = 'SkeletonTable',
  isSelectable,
  isExpandable,
  selectVariant = RowSelectVariant.checkbox,
  columns,
  columnsCount,
  isTreeTable,
  ...rest
}: SkeletonTableProps) => {
  const rowCellsCount = Array.isArray(columns) ? columns.length : columnsCount;

  return (
    <Table aria-label="Loading" variant={variant} borders={borders} ouiaId={ouiaId} {...rest}>
      {caption && <Caption>{caption}</Caption>}
      <SkeletonTableHead 
        ouiaId={ouiaId}
        isSelectable={isSelectable}
        isExpandable={isExpandable}
        columnsCount={columnsCount}
        columns={columns}
        isTreeTable={isTreeTable}
      />
      <SkeletonTableBody 
        columnsCount={rowCellsCount ?? 0}
        rowsCount={rowsCount}
        isSelectable={isSelectable}
        isExpandable={isExpandable}
        selectVariant={selectVariant}
        ouiaId={ouiaId}
      />
    </Table>
  );
};

export default SkeletonTable;
