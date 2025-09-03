import type { FunctionComponent } from 'react';
import { useState } from 'react';
import {
  DataList,
  DataListItemRow,
  DataListCheck,
  DataListCell,
  DataListItemCells,
  Button,
  ButtonVariant,
  ActionList,
  ActionListItem,
  ActionListGroup,
} from '@patternfly/react-core';
import { DragDropSort, Droppable } from '@patternfly/react-drag-drop';
import BulkSelect, { BulkSelectValue } from '../BulkSelect';

export interface ListManagerItem {
  /** Internal identifier of a column by which table displayed columns are filtered. */
  key: string;
  /** The actual display name of the column possibly with a tooltip or icon. */
  title: React.ReactNode;
  /** If user changes checkboxes, the component will send back column array with this property altered. */
  isSelected?: boolean;
  /** Set to false if the column should be hidden initially */
  isShownByDefault: boolean;
  /** The checkbox will be disabled, this is applicable to columns which should not be toggleable by user */
  isUntoggleable?: boolean;
}

export interface ListManagerProps {
  /** Current column state */
  columns: ListManagerItem[];
  /** Custom OUIA ID */
  ouiaId?: string | number;
  /** Callback when a column is selected or deselected */
  onSelect?: (column: ListManagerItem) => void;
  /** Callback when all columns are selected or deselected */
  onSelectAll?: (columns: ListManagerItem[]) => void;
  /** Callback when the column order changes */
  onOrderChange?: (columns: ListManagerItem[]) => void;
  /** Callback to save the column state */
  onSave?: (columns: ListManagerItem[]) => void;
  /** Callback to close the modal */
  onCancel?: () => void;
}

const ListManager: FunctionComponent<ListManagerProps> = (
  { columns,
    ouiaId = 'Column',
    onSelect,
    onSelectAll,
    onOrderChange,
    onSave,
    onCancel }: ListManagerProps) => {

  const [ currentColumns, setCurrentColumns ] = useState(
    () => columns.map(column => ({ ...column, isSelected: column.isSelected ?? column.isShownByDefault, id: column.key }))
  );


  const handleChange = (columnKey: string) => {
    const newColumns = [ ...currentColumns ];
    const index = newColumns.findIndex(col => col.key === columnKey);
    if (index === -1) {return;}
    
    const changedColumn = { ...newColumns[index] };
    changedColumn.isSelected = !changedColumn.isSelected;
    newColumns[index] = changedColumn;

    setCurrentColumns(newColumns);
    onSelect?.(changedColumn);
  };

  const onDrag = (_event: unknown, newOrder: any[]) => {
    const newColumns = newOrder.map((item: any) => {
      const found = currentColumns.find(c => c.key === item.id);
      if (!found) {
        throw new Error(`Column with key ${item.id} not found`);
      }
      return found;
    });
    setCurrentColumns(newColumns);
    onOrderChange?.(newColumns);
  };

  const handleSave = () => {
    onSave?.(currentColumns);
  };

  const handleBulkSelect = (value: BulkSelectValue) => {
    const allSelected = value === 'all' || value === 'page';
    handleSelectAll(allSelected);
  };

  const handleSelectAll = (select = true) => {
    const newColumns = currentColumns.map(c => ({ ...c, isSelected: c.isUntoggleable ? c.isSelected : select }));
    setCurrentColumns(newColumns);
    onSelectAll?.(newColumns);
  };

  return (
    <>
      <div style={{ paddingBottom: '1rem' }}>
        <BulkSelect
          canSelectAll
          isDataPaginated={false}
          selectedCount={currentColumns.filter(({ isSelected }) => isSelected).length}
          totalCount={currentColumns.length}
          onSelect={handleBulkSelect}
          pageSelected={currentColumns.every((item) => item.isSelected)}
          pagePartiallySelected={
            currentColumns.some((item) => item.isSelected) && !currentColumns.every((item) => item.isSelected)
          }
        />
      </div>
      <DragDropSort
        variant="DataList"
        items={currentColumns.map((column, index) => ({ id: column.key, content: 
            <DataListItemRow>
              <DataListCheck
                data-testid={`column-check-${column.key}`}
                isChecked={column.isSelected}
                onChange={() => handleChange(column.key)}
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
      </DragDropSort>
      <ActionList style={{ paddingTop: '1rem' }}>
        <ActionListGroup>
          <ActionListItem>
            <Button key="save" variant={ButtonVariant.primary} onClick={handleSave} ouiaId={`${ouiaId}-save-button`}>
              Save
            </Button>
          </ActionListItem>
          <ActionListItem>
            <Button key="cancel" variant={ButtonVariant.link} onClick={onCancel} ouiaId={`${ouiaId}-cancel-button`}>
              Cancel
            </Button>
          </ActionListItem>
        </ActionListGroup>
      </ActionList>
    </>
  );
}

export default ListManager;
