import type { FunctionComponent } from 'react';
import {
  Tbody,
  Td,
  Tr,
  RowSelectVariant
} from '@patternfly/react-table';
import { Skeleton } from '@patternfly/react-core';

export interface SkeletonTableBodyProps {
  /** Number of columns in the table */
  columnsCount: number;
  /** Number of rows in the table */
  rowsCount?: number;
  /** Custom OUIA ID */
  ouiaId?: string | number;
  /** Flag indicating if the table is selectable */
  isSelectable?: boolean;
  /** Flag indicating if the table is expandable */
  isExpandable?: boolean;
  /** Determines if the row selection variant (radio/checkbox) */
  selectVariant?: RowSelectVariant;
}

const SkeletonTableBody: FunctionComponent<SkeletonTableBodyProps> = ({
  rowsCount = 5,
  ouiaId = 'SkeletonTableBody',
  isSelectable,
  isExpandable,
  selectVariant = RowSelectVariant.checkbox,
  columnsCount,
}: SkeletonTableBodyProps) => {
  const bodyRows = [ ...Array(rowsCount) ].map((_, rowIndex) => (
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
      {[ ...Array(columnsCount) ].map((_, colIndex) => (
        <Td key={colIndex} data-ouia-component-id={`${ouiaId}-td-${rowIndex}-${colIndex}`}>
          <Skeleton />
        </Td>
      ))}
    </Tr>
  ));

  return (
    <Tbody data-ouia-component-id={`${ouiaId}-tbody`}>{bodyRows}</Tbody>
  );
};

export default SkeletonTableBody;
