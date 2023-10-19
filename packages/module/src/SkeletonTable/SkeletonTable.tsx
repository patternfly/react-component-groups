import React, { ReactNode } from 'react';
import { Caption, Table, TableProps, TableVariant, Tbody, Td, Th, Thead, Tr } from '@patternfly/react-table';
import { Skeleton } from '@patternfly/react-core';
import { createUseStyles } from 'react-jss';
import { clsx } from 'clsx';

export type SkeletonTableProps = TableProps & {
  /** Indicates the table variant */
  variant?: TableVariant;
  /** The number of rows the skeleton table should contain */
  rows?: number;
  /** Any captions that should be added to the table */
  caption?: ReactNode;
} & (
    | {
        columns: ReactNode[];
      }
    | {
        numberOfColumns: number;
      }
  );

const useStyles = createUseStyles({
  skeleton: {
    '&.ins-m-dark': {
      '--pf-c-skeleton--BackgroundColor': 'var(--pf-v5-global--palette--black-600)',
      '--pf-c-skeleton--after--LinearGradientColorStop1': 'var(--pf-v5-global--palette--black-600)',
      '--pf-c-skeleton--after--LinearGradientColorStop2': 'var(--pf-v5--global--palette--black-500)',
      '--pf-c-skeleton--after--LinearGradientColorStop3': 'var(--pf-v5-global--palette--black-600)',
    },
  },
});

function hasCustomColumns(props: Record<string, any>): props is SkeletonTableProps & {
  columns: ReactNode[];
} {
  return Array.isArray(props.columns);
}

const SkeletonTable: React.FunctionComponent<SkeletonTableProps> = (props: SkeletonTableProps) => {
  const { variant, rows = 5, caption } = props;
  const classes = useStyles();
  const rowCells = hasCustomColumns(props) ? props.columns.length : props.numberOfColumns;
  const rowArray = [ ...new Array(rowCells) ];
  const bodyRows = [ ...new Array(rows) ].map((_, index) => (
    <Tr key={index}>
      {rowArray.map((_, index) => (
        <Td key={index}>
          <Skeleton className={clsx(classes.skeleton)}/>
        </Td>
      ))}
    </Tr>
  ));

  return (
    <Table aria-label="Loading" variant={variant}>
      {caption && <Caption>{caption}</Caption>}
      <Thead>
        <Tr>
          {hasCustomColumns(props)
            ? props.columns.map((c, index) => <Th key={index}>{c}</Th>)
            : rowArray.map((_, index) => (
              <Th key={index}>
                <Skeleton className={clsx(classes.skeleton)}/>
              </Th>
            ))}
        </Tr>
      </Thead>
      <Tbody>{bodyRows}</Tbody>
    </Table>
  );
};

export default SkeletonTable;
