import type { FunctionComponent } from 'react';
import { useState, useEffect } from 'react';
import {
  DataListItem,
  DataList,
  DataListItemRow,
  DataListCheck,
  DataListCell,
  DataListItemCells,
  DataListControl,
  DataListDragButton,
  Button,
  ButtonVariant,
  Title,
  Checkbox,
  Dropdown,
  DropdownItem,
  DropdownList,
  MenuToggle
} from '@patternfly/react-core';
import {
  DragDrop,
  Droppable,
  Draggable
} from '@patternfly/react-core/deprecated';

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

  const [ isDropdownOpen, setIsDropdownOpen ] = useState(false);
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

  const onDrag = (source, dest) => {
    if (dest) {
      const newColumns = [ ...currentColumns ];
      const [ removed ] = newColumns.splice(source.index, 1);
      newColumns.splice(dest.index, 0, removed);
      setCurrentColumns(newColumns);
      onOrderChange?.(newColumns);
      return true;
    }
    return false;
  };

  const handleSave = () => {
    onSave?.(currentColumns);
  }

  const handleSelectAll = (select = true) => {
    const newColumns = currentColumns.map(c => ({ ...c, isShown: c.isUntoggleable ? c.isShown : select }));
    setCurrentColumns(newColumns);
    onSelectAll?.(newColumns);
  }

  const isAllSelected = () => currentColumns.every(c => c.isShown || c.isUntoggleable);
  const isSomeSelected = () => currentColumns.some(c => c.isShown);

  const dropdownItems = [
    <DropdownItem key="select-all" onClick={() => handleSelectAll(true)}>Select all</DropdownItem>,
    <DropdownItem key="deselect-all" onClick={() => handleSelectAll(false)}>Select none</DropdownItem>
  ];

  return (
    <>
      <Title headingLevel="h3">{title}</Title>
      {description && <div style={{ paddingBottom: '1rem' }}><p>{description}</p></div>}
      <div style={{ paddingBottom: '1rem' }}>
        <Dropdown
          onSelect={() => setIsDropdownOpen(false)}
          toggle={(toggleRef) => (
            <MenuToggle
              ref={toggleRef}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              isExpanded={isDropdownOpen}
            >
              <div>
                <Checkbox
                  aria-label="Select all"
                  tabIndex={-1}
                  isChecked={isAllSelected() ? true : isSomeSelected() ? null : false}
                  id={`${ouiaId}-select-all-checkbox`}
                />
              </div>
            </MenuToggle>
          )}
          isOpen={isDropdownOpen}
        >
          <DropdownList>{dropdownItems}</DropdownList>
        </Dropdown>
      </div>
      <DragDrop onDrop={onDrag}>
        <Droppable droppableId="draggable-datalist">
          <DataList aria-label="Selected columns" isCompact data-ouia-component-id={`${ouiaId}-column-list`}>
            {currentColumns.map((column, index) =>
              <Draggable key={column.key} id={column.key}>
                <DataListItem key={column.key} data-testid={`column-item-${column.key}`}>
                  <DataListItemRow>
                    <DataListControl>
                      <DataListDragButton
                        aria-label="Reorder"
                        aria-labelledby={`${ouiaId}-column-${index}-label`}
                      />
                    </DataListControl>
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
                </DataListItem>
              </Draggable>
            )}
          </DataList>
        </Droppable>
      </DragDrop>
      <div style={{ display: 'flex', justifyContent: 'normal', paddingTop: '1rem' }}>
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
