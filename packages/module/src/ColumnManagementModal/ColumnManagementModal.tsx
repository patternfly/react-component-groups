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
  /** Custom OUIA ID */
  ouiaId?: string | number,
};

const ColumnManagementModal: React.FunctionComponent<ColumnManagementModalProps> = (
  { isModalOpen,
    setModalOpen,
    appliedColumns,
    applyColumns,
    ouiaId = 'ColumnManagementModal',
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
              <Button isInline onClick={selectAll} variant={ButtonVariant.link} ouiaId={`${ouiaId}-selectAll-button`}>
                Select all
              </Button>
            </SplitItem>
            <SplitItem>
              <Button isInline onClick={resetToDefault} variant={ButtonVariant.link} ouiaId={`${ouiaId}-reset-button`}>
                Reset to default
              </Button>
            </SplitItem>
          </Split>
        </TextContent>
      }
      actions={[
        <Button key="save" variant={ButtonVariant.primary} onClick={handleSave} ouiaId={`${ouiaId}-save-button`}>
          Save
        </Button>,
        <Button key="cancel" variant={ButtonVariant.link} onClick={handleCancel} ouiaId={`${ouiaId}-cancel-button`}>
          Cancel
        </Button>
      ]}
      ouiaId={ouiaId}
      {...props}
    >
      <DataList aria-label="Selected columns" isCompact data-ouia-component-id={`${ouiaId}-column-list`}>
        {currentColumns.map((column, index) =>
          <DataListItem key={column.key}>
            <DataListItemRow>
              <DataListCheck
                checked={column.isShown}
                onChange={() => handleChange(index)}
                isDisabled={column.isAlwaysShown}
                aria-labelledby={`${ouiaId}-column${index}-label`}
                data-ouia-component-id={`${ouiaId}-column${index}-checkbox`}
                id={`${ouiaId}-column${index}-checkbox`}
              />
              <DataListItemCells
                dataListCells={[
                  <DataListCell key={column.key} data-ouia-component-id={`${ouiaId}-column${index}-label`}>
                    <label htmlFor={`${ouiaId}-column${index}-checkbox`} id={`${ouiaId}-column${index}-label`}>
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
