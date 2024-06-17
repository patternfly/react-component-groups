import React from 'react';
import {
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
  ButtonVariant
} from '@patternfly/react-core';
import { ModalProps, Modal, ModalVariant } from '@patternfly/react-core/deprecated';

export interface ColumnManagementModalColumn {
  /** Internal identifier of a column by which table displayed columns are filtered. */
  key: string,
  /** The actual display name of the column possibly with a tooltip or icon. */
  title: React.ReactNode,
  /** If user changes checkboxes, the component will send back column array with this property altered. */
  isShown?: boolean,
  /** Set to false if the column should be hidden initially */
  isShownByDefault: boolean,
  /** The checkbox will be disabled, this is applicable to columns which should not be toggleable by user */
  isUntoggleable?: boolean
}

export interface ColumnManagementModalProps extends Omit<ModalProps, 'ref' | 'children'> {
  /** Flag to show the modal */
  isOpen?: boolean,
  /** Invoked when modal visibility is changed */
  onClose?: (event: KeyboardEvent | React.MouseEvent) => void,
  /** Current column state */
  appliedColumns: ColumnManagementModalColumn[],
  /** Invoked with new column state after save button is clicked */
  applyColumns: (newColumns: ColumnManagementModalColumn[]) => void,
  /* Modal description text */
  description?: string,
  /* Modal title text */
  title?: string,
  /** Custom OUIA ID */
  ouiaId?: string | number,
};

const ColumnManagementModal: React.FunctionComponent<ColumnManagementModalProps> = (
  { title = 'Manage columns',
    description = 'Selected categories will be displayed in the table.',
    isOpen = false,
    onClose = () => undefined,
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

  const handleSave = event => {
    applyColumns(currentColumns);
    onClose(event);
  };

  const handleCancel = event => {
    setCurrentColumns(appliedColumns.map(column => ({ ...column, isShown: column.isShown ?? column.isShownByDefault })));
    onClose(event);
  };

  return (
    <Modal
      title={title}
      onClose={onClose}
      isOpen={isOpen}
      variant={ModalVariant.small}
      description={
        <TextContent>
          <Text component={TextVariants.p}>{description}</Text>
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
                isDisabled={column.isUntoggleable}
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
