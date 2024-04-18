import React from 'react';
import {
  Modal,
  Button,
  TextContent,
  Text,
  TextVariants,
  DataListItem,
  DataList,
  DataListItemRow,
  DataListCheck,
  DataListCell,
  DataListItemCells,
  Split,
  SplitItem,
  ModalProps,
  ButtonVariant,
  ModalVariant
} from '@patternfly/react-core';

export interface ColumnManagementModalColumn {
  /** Internal identifier of a column by which table displayed columns are filtered. */
  key: string,
  /** The actual display name of the column possibly with a tooltip or icon. */
  title: React.ReactNode,
  /** If user changes checkboxes, the component will send back column array with this property altered. */
  isShown?: boolean,
  /** Set to false if the column should be hidden initially */
  isShownByDefault: boolean,
  /** The checkbox will be checked and disabled, this is applicable to identifier columns which user shouldn't be able to hide */
  isAlwaysShown?: boolean
}

export interface ColumnManagementModalProps extends Omit<ModalProps, 'ref' | 'children'> {
  /** Flag to show the modal */
  isModalOpen: boolean,
  /** Invoked when modal visibility is changed */
  setModalOpen: (shouldOpen: boolean) => void
  /** Current column state */
  appliedColumns: ColumnManagementModalColumn[],
  /** Invoked with new column state after save button is clicked */
  applyColumns: (newColumns: ColumnManagementModalColumn[]) => void,
};

const ColumnManagementModal: React.FunctionComponent<ColumnManagementModalProps> = (
  { isModalOpen,
    setModalOpen,
    appliedColumns,
    applyColumns,
    ...props }: ColumnManagementModalProps) => {

  const [ currentColumns, setCurrentColumns ] = React.useState(
    appliedColumns.map(column => ({ ...column, isShown: column.isShown ?? column.isShownByDefault }))
  );

  const handleChange = index => {
    const newColumns = [ ...currentColumns ];
    const changedColumn = { ...newColumns[index] };

    changedColumn.isShown = !changedColumn.isShown;
    newColumns[index] = changedColumn;

    setCurrentColumns(newColumns);
  };

  const selectAll = () => {
    let newColumns = [ ...currentColumns ];
    newColumns = newColumns.map(column => ({ ...column, isShown: true }));

    setCurrentColumns(newColumns);
  };

  const resetToDefault = () => {
    setCurrentColumns(currentColumns.map(column => ({ ...column, isShown: column.isShownByDefault ?? false })));
  };

  const handleSave = () => {
    setModalOpen(false);
    applyColumns(currentColumns);
  };

  const handleCancel = () => {
    setModalOpen(false);
    setCurrentColumns(appliedColumns.map(column => ({ ...column, isShown: column.isShown ?? column.isShownByDefault })));
  };

  return (
    <Modal
      title="Manage columns"
      onClose={() => setModalOpen(false)}
      isOpen={isModalOpen}
      variant={ModalVariant.small}
      description={
        <TextContent>
          <Text component={TextVariants.p}>Selected categories will be displayed in the table.</Text>
          <Split hasGutter>
            <SplitItem>
              <Button isInline onClick={selectAll} variant={ButtonVariant.link}>
                Select all
              </Button>
            </SplitItem>
            <SplitItem>
              <Button isInline onClick={resetToDefault} variant={ButtonVariant.link}>
                Reset to default
              </Button>
            </SplitItem>
          </Split>
        </TextContent>
      }
      actions={[
        <Button key="save" variant={ButtonVariant.primary} onClick={handleSave}>
          Save
        </Button>,
        <Button key="cancel" variant={ButtonVariant.link} onClick={handleCancel}>
          Cancel
        </Button>
      ]}
      {...props}
    >
      <DataList aria-label="Table column management" id="table-column-management" isCompact>
        {currentColumns.map((column, index) =>
          <DataListItem key={column.key}>
            <DataListItemRow>
              <DataListCheck
                aria-labelledby={column.key}
                checked={column.isShown}
                id={`checkbox-${index}`}
                onChange={() => handleChange(index)}
                isDisabled={column.isAlwaysShown}
              />
              <DataListItemCells
                dataListCells={[
                  <DataListCell key={`table-column-management-item-${index}`}>
                    <label htmlFor={`checkbox-${index}`}>
                      {column.title}
                    </label>
                  </DataListCell>
                ]}
              />
            </DataListItemRow>
          </DataListItem>
        )}
      </DataList>
    </Modal>
  );
}

export default ColumnManagementModal;
