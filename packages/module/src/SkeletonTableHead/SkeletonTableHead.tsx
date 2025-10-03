import type { FunctionComponent, ReactElement } from 'react';
import { ReactNode, useMemo, isValidElement } from 'react';
import {
  Th,
  ThProps,
  Thead,
  Tr
} from '@patternfly/react-table';
import { Skeleton } from '@patternfly/react-core';

export const isThObject = (value: ReactNode | { cell: ReactNode; props?: ThProps }): value is { cell: ReactNode; props?: ThProps } => value != null && typeof value === 'object' && 'cell' in value;

export const isReactElement = (value: ReactNode): value is ReactElement => isValidElement(value);

export interface SkeletonTableHeadProps {
  /** Custom columns for the table */
  columns?: (ReactNode | { cell: ReactNode; props?: ThProps })[];
  /** Number of columns in the table */
  columnsCount?: number;
  /** Custom OUIA ID */
  ouiaId?: string | number;
  /** Flag indicating if the table is selectable */
  isSelectable?: boolean;
  /** Flag indicating if the table is expandable */
  isExpandable?: boolean;
  /** Flag indicating if the table is a tree table */
  isTreeTable?: boolean;
}

export const SkeletonTableHead: FunctionComponent<SkeletonTableHeadProps> = ({
  ouiaId = 'SkeletonTableHeader',
  isSelectable,
  isExpandable,
  columnsCount,
  columns,
  isTreeTable,
  ...rest
}: SkeletonTableHeadProps) => {
  const hasCustomColumns = Array.isArray(columns);
  const rowCellsCount = hasCustomColumns ? columns.length : columnsCount;

  const cells = useMemo(() => [
    ...(isExpandable ? [ <Th key="row-expand" screenReaderText='Data expansion table header cell' /> ] : []),
    ...(isSelectable && !isTreeTable ? [ <Th key="row-select" screenReaderText='Data selection table header cell' /> ] : []),
    ...(hasCustomColumns ? (
      columns.map((column, index) => {
        // If the column is an object with cell and props, wrap in Th
        if (isThObject(column)) {
          return (
            <Th key={index} {...column.props} data-ouia-component-id={`${ouiaId}-th-${index}`}>
              {column.cell}
            </Th>
          );
        }
        // If the column is already a React element (like <Th>), render it directly
        if (isReactElement(column)) {
          return column;
        }
        // Otherwise, wrap the content in Th
        return (
          <Th key={index} data-ouia-component-id={`${ouiaId}-th-${index}`}>
            {column}
          </Th>
        );
      })
    ) : (
      [ ...Array(rowCellsCount) ].map((_, index) => (
        <Th key={index} data-ouia-component-id={`${ouiaId}-th-${index}`}>
          <Skeleton />
        </Th>
      ))
    ))
  ]
  , [ hasCustomColumns, isExpandable, isSelectable, isTreeTable, columns, rowCellsCount, ouiaId ]);
  

  return (
    <Thead data-ouia-component-id={`${ouiaId}-thead`} {...rest}>
      <Tr ouiaId={`${ouiaId}-tr-head`}>
        {cells}
      </Tr>
    </Thead>
  );
};

export default SkeletonTableHead;
