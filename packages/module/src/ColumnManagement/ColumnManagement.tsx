import type { FunctionComponent } from 'react';
import { useState, useEffect } from 'react';
import {
  DataList,
  DataListItemRow,
  DataListCheck,
  DataListCell,
  DataListItemCells,
  Button,
  ButtonVariant,
  Title
} from '@patternfly/react-core';
import { DragDropSort, Droppable } from '@patternfly/react-drag-drop';
import BulkSelect, { BulkSelectValue } from '../BulkSelect';

export interface Column {
  /** Internal identifier of a column by which table displayed columns are filtered. */
  key: string;
  /** The actual display name of the column possibly with a tooltip or icon. */
  title: React.ReactNode;
  /** If user changes checkboxes, the component will send back column array with this property altered. */
  isShown?: boolean;
  /** Set to false if the column should be hidden initially */
  isShownByDefault: boolean;
  /** The checkbox will be disabled, this is applicable to columns which should not be toggleable by user */
  isUntoggleable?: boolean;
}

export interface ColumnProps {
  /** Current column state */
  columns: Column[];
  /* Column description text */
  description?: string;
  /* Column title text */
  title?: string;
  /** Custom OUIA ID */
  ouiaId?: string | number;
  /** Callback when a column is selected or deselected */
  onSelect?: (column: Column) => void;
  /** Callback when all columns are selected or deselected */
  onSelectAll?: (columns: Column[]) => void;
  /** Callback when the column order changes */
  onOrderChange?: (columns: Column[]) => void;
  /** Callback to save the column state */
  onSave?: (columns: Column[]) => void;
  /** Callback to close the modal */
  onCancel?: () => void;
}

const ColumnManagement: FunctionComponent<ColumnProps> = (
  { columns,
    description,
    title,
    ouiaId = 'Column',
    onSelect,
    onSelectAll,
    onOrderChange,
    onSave,
    onCancel }: ColumnProps) => {

  const [ currentColumns, setCurrentColumns ] = useState(
    () => columns.map(column => ({ ...column, isShown: column.isShown ?? column.isShownByDefault, id: column.key }))
  );

  useEffect(() => {
    setCurrentColumns(columns.map(column => ({ ...column, isShown: column.isShown ?? column.isShownByDefault, id: column.key })));
  }, [ columns ]);

  const handleChange = index => {
    const newColumns = [ ...currentColumns ];
    const changedColumn = { ...newColumns[index] };

    changedColumn.isShown = !changedColumn.isShown;
    newColumns[index] = changedColumn;

    setCurrentColumns(newColumns);
    onSelect?.(changedColumn);
  };

  const onDrag = (_event, newOrder) => {
    const newColumns = newOrder.map(item => currentColumns.find(c => c.key === item.id));
    setCurrentColumns(newColumns);
    onOrderChange?.(newColumns);
  };

  const handleSave = () => {
    onSave?.(currentColumns);
  }

  const handleBulkSelect = (value: BulkSelectValue) => {
    const allSelected = value === 'all' || value === 'page';
    handleSelectAll(allSelected);
  };

  const handleSelectAll = (select = true) => {
    const newColumns = currentColumns.map(c => ({ ...c, isShown: c.isUntoggleable ? c.isShown : select }));
    setCurrentColumns(newColumns);
    onSelectAll?.(newColumns);
  }

  return (
    <>
      <Title headingLevel="h3">{title}</Title>
      {description && <div style={{ paddingBottom: '1rem' }}><p>{description}</p></div>}
      <div style={{ paddingBottom: '1rem' }}>
        <BulkSelect
          canSelectAll
          isDataPaginated={false}
          selectedCount={currentColumns.filter(({ isShown }) => isShown).length}
          totalCount={currentColumns.length}
          onSelect={handleBulkSelect}
          pageSelected={currentColumns.every((item) => item.isShown)}
          pagePartiallySelected={
            currentColumns.some((item) => item.isShown) && !currentColumns.every((item) => item.isShown)
          }
        />
      </div>
      <DragDropSort
        variant="DataList"
        items={currentColumns.map((column, index) => ({ id: column.key, content: 
            <DataListItemRow>
              <DataListCheck
                data-testid={`column-check-${column.key}`}
                isChecked={column.isShown}
                onChange={() => handleChange(index)}
                isDisabled={column.isUntoggleable}
                aria-labelledby={`${ouiaId}-column-${index}-label`}
                ouiaId={`${ouiaId}-column-${index}-checkbox`}
                id={`${ouiaId}-column-${index}-checkbox`}
              />
              <DataListItemCells
                dataListCells={[
                  <DataListCell key={column.key} data-ouia-component-id={`${ouiaId}-column-${index}-label`}>
                    <label htmlFor={`${ouiaId}-column-${index}-checkbox`} id={`${ouiaId}-column-${index}-label`}>
                      {column.title}
                    </label>
                  </DataListCell>
                ]}
              />
            </DataListItemRow>
        }))}
        onDrop={onDrag}
        overlayProps={{ isCompact: true }}
      >
        <Droppable 
          items={currentColumns.map((column) => 
            // eslint-disable-next-line no-console
            ({ id: column.key, content: column.title })
          )} 
          wrapper={<DataList aria-label="Selected columns" isCompact data-ouia-component-id={`${ouiaId}-column-list`}/>}
        />
      </DragDropSort>      <div style={{ display: 'flex', justifyContent: 'normal', paddingTop: '1rem' }}>
        <Button key="save" variant={ButtonVariant.primary} onClick={handleSave} ouiaId={`${ouiaId}-save-button`}>
          Save
        </Button>
        <Button key="cancel" variant={ButtonVariant.link} onClick={onCancel} ouiaId={`${ouiaId}-cancel-button`}>
          Cancel
        </Button>
      </div>
    </>
  );
}

export default ColumnManagement;
