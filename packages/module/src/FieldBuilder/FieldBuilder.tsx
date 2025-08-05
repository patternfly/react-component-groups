import React, { FunctionComponent, Children, useRef, useCallback, useState, useEffect } from 'react';
import {
  Button,
  ButtonProps,
  FormGroup,
  type FormGroupProps,
  Flex,
  FlexItem,
} from '@patternfly/react-core';
import { Table, Tbody, Td, Th, Tr, Thead } from '@patternfly/react-table';
import { PlusCircleIcon, MinusCircleIcon } from '@patternfly/react-icons';

/**
 * Defines the helpers passed to the children render prop.
 * This provides accessibility labels and focus management for each row.
 */
export interface FieldRowHelpers {
  /** 
   * Ref callback to attach to the first focusable element in the row.
   * This enables automatic focus management when rows are added/removed.
   */
  focusRef: (element: HTMLElement | null) => void;
  /**
   * Unique ID for this row group
   */
  rowGroupId: string;
  /**
   * Complete aria-label string for the first column that includes both row and column context
   */
  firstColumnAriaLabel: string;
  /**
   * Complete aria-label string for the second column that includes both row and column context
   */
  secondColumnAriaLabel?: string;
}

/**
 * Extends FormGroupProps to inherit standard functionality like
 * label, helperText, isRequired, and validation states.
 */
export interface FieldBuilderProps extends Omit<FormGroupProps, 'children'> {
  /** Label for the first column (required for both single and two-column layouts) */
  firstColumnLabel: React.ReactNode;
  /** Label for the second column (optional, only used in two-column layout) */
  secondColumnLabel?: React.ReactNode;
  /** The total number of rows to render. This should be derived from the length of the state array managed by the parent. */
  rowCount: number;
  /**
   * A function that returns the content for each row. This "render prop" provides
   * maximum flexibility for defining the inputs within each row.
   * Can return 1 child (single-column) or 2 children (two-column).
   * The second parameter provides the 0-based index of the current row.
   */
  children: (helpers: FieldRowHelpers, index: number) => React.ReactNode;
  /** A callback triggered when the "Add" button is clicked. */
  onAddRow: (event: React.MouseEvent) => void;
  /** A callback triggered when a "Remove" button is clicked, which receives the index of the row to remove. */
  onRemoveRow: (event: React.MouseEvent, index: number) => void;
  /** Additional props to customize the "Add" button. */
  addButtonProps?: Omit<ButtonProps, 'onClick'>;
  /** Content for the "Add" button. Defaults to "Add another". */
  addButtonContent?: React.ReactNode;
  /** Additional props to customize the "Remove" buttons. */
  removeButtonProps?: Omit<ButtonProps, 'onClick' | 'ref'>;
  /**
   * Optional function to customize the aria-label for remove buttons.
   * If not provided, defaults to "Remove {rowGroupLabelPrefix} {rowNumber}".
   */
  removeButtonAriaLabel?: (rowNumber: number, rowGroupLabelPrefix: string) => string;
  /**
   * Optional label prefix for each row group. Defaults to "Row".
   * Screen readers will announce this as "Row 1", "Row 2", etc.
   */
  rowGroupLabelPrefix?: string;
  /**
   * Optional unique ID prefix for this FieldBuilder instance.
   * This ensures unique IDs when multiple FieldBuilders exist on the same page.
   */
  fieldBuilderIdPrefix?: string;
  /**
   * Optional function to customize the announcement message when a row is added.
   * If not provided, defaults to "New {rowGroupLabelPrefix} added. {rowGroupLabelPrefix} {newRowNumber}."
   */
  onAddRowAnnouncement?: (rowNumber: number, rowGroupLabelPrefix: string) => string;
  /**
   * Optional function to customize the announcement message when a row is removed.
   * If not provided, defaults to "{rowGroupLabelPrefix} {removedRowNumber} removed."
   */
  onRemoveRowAnnouncement?: (rowNumber: number, rowGroupLabelPrefix: string) => string;
}

/**
 * FieldBuilder is a component group that simplifies the creation of dynamic,
 * multi-row forms with a consistent layout. It manages the layout and actions
 * for adding and removing rows, while giving the consumer full control over the fields themselves.
 */
export const FieldBuilder: FunctionComponent<FieldBuilderProps> = ({
  firstColumnLabel,
  secondColumnLabel,
  rowCount,
  children,
  onAddRow,
  onRemoveRow,
  addButtonProps = {},
  addButtonContent,
  removeButtonProps = {},
  removeButtonAriaLabel,
  rowGroupLabelPrefix = "Row",
  fieldBuilderIdPrefix = "field-builder",
  onAddRowAnnouncement,
  onRemoveRowAnnouncement,
  ...formGroupProps
}: FieldBuilderProps) => {
  // Track focusable elements for each row (for consumers who want to use focusRef)
  const focusableElementsRef = useRef<Map<number, HTMLElement>>(new Map());
  // State for ARIA live region announcements
  const [ liveRegionMessage, setLiveRegionMessage ] = useState<string>('');
  // Track previous row count for focus management
  const previousRowCountRef = useRef<number>(rowCount);
  // Track the last removed row index for focus management
  const lastRemovedIndexRef = useRef<number | null>(null);
  // Reference to the add button for focus management
  const addButtonRef = useRef<HTMLButtonElement>(null);

  // Function to announce changes to screen readers
  const announceChange = useCallback((message: string) => {
    setLiveRegionMessage(message);
    // Clear the message after a delay to prepare for next announcement
    setTimeout(() => {
      setLiveRegionMessage('');
    }, 1000);
  }, []);

  // Focus management effect - runs when rowCount changes
  useEffect(() => {
    const previousRowCount = previousRowCountRef.current;
    
    if (rowCount > previousRowCount) {
      // Row was added - focus the first input of the new row
      const newRowIndex = rowCount - 1;
      const newRowFirstElement = focusableElementsRef.current.get(newRowIndex);
      if (newRowFirstElement) {
        newRowFirstElement.focus();
      }
    } else if (rowCount < previousRowCount && lastRemovedIndexRef.current !== null) {
      // Row was removed - apply smart focus logic
      const removedIndex = lastRemovedIndexRef.current;
      
      if (rowCount === 0) {
        // No rows left - focus the add button
        if (addButtonRef.current) {
          addButtonRef.current.focus();
        }
      } else if (removedIndex >= rowCount) {
        // Removed the last row - focus the new last row's first element
        const newLastRowIndex = rowCount - 1;
        const newLastRowFirstElement = focusableElementsRef.current.get(newLastRowIndex);
        if (newLastRowFirstElement) {
          newLastRowFirstElement.focus();
        }
      } else {
        // Removed a middle row - focus the first element of the row that took its place
        const sameIndexFirstElement = focusableElementsRef.current.get(removedIndex);
        if (sameIndexFirstElement) {
          sameIndexFirstElement.focus();
        }
      }
      
      // Reset the removed index tracker
      lastRemovedIndexRef.current = null;
    }
    
    // Update the previous row count
    previousRowCountRef.current = rowCount;
  }, [ rowCount ]);

  // Create ref callback for focusable elements
  const createFocusRef = useCallback((rowIndex: number) => 
    (element: HTMLElement | null) => {
      if (element) {
        focusableElementsRef.current.set(rowIndex, element);
      } else {
        focusableElementsRef.current.delete(rowIndex);
      }
    }, []);

  // Enhanced onAddRow with focus management and announcements
  const handleAddRow = useCallback((event: React.MouseEvent) => {
    onAddRow(event);
    const newRowNumber = rowCount + 1;
    const announcementMessage = onAddRowAnnouncement ? onAddRowAnnouncement(newRowNumber, rowGroupLabelPrefix) : `New ${rowGroupLabelPrefix.toLowerCase()} added. ${rowGroupLabelPrefix} ${newRowNumber}.`;
    announceChange(announcementMessage);
  }, [ onAddRow, announceChange, rowGroupLabelPrefix, rowCount, onAddRowAnnouncement ]);

  // Enhanced onRemoveRow with announcements and focus tracking
  const handleRemoveRow = useCallback((event: React.MouseEvent, index: number) => {
    const rowNumber = index + 1;
    
    // Track which row is being removed for focus management
    lastRemovedIndexRef.current = index;
    
    onRemoveRow(event, index);
    
    // Announce the removal
    const announcementMessage = onRemoveRowAnnouncement ? onRemoveRowAnnouncement(rowNumber, rowGroupLabelPrefix) : `${rowGroupLabelPrefix} ${rowNumber} removed.`;
    announceChange(announcementMessage);
  }, [ onRemoveRow, announceChange, rowGroupLabelPrefix, onRemoveRowAnnouncement ]);

  // Helper function to render all the dynamic rows.
  const renderRows = () => {
    const rows = Array.from({ length: rowCount });

    return rows.map((_, index) => {
      const rowNumber = index + 1;
      const rowGroupId = `${fieldBuilderIdPrefix}-row-${index}`;

      // Call the user's render prop function to get the React nodes for this row's cells.
      const rowContent = children({ 
        focusRef: createFocusRef(index),
        rowGroupId,
        firstColumnAriaLabel: `${rowGroupLabelPrefix} ${rowNumber}, ${firstColumnLabel}`,
        secondColumnAriaLabel: secondColumnLabel ? `${rowGroupLabelPrefix} ${rowNumber}, ${secondColumnLabel}` : undefined
      }, index);
      // Safely convert the returned content into an array of children.
      const cells = Children.toArray(rowContent);

      // Validate that 1 or 2 children are provided
      if (cells.length < 1 || cells.length > 2) {
        // Only render the first 2 children to prevent layout issues
        cells.splice(2);
        // Ensure at least 1 child exists
        if (cells.length < 1) {
          cells.push(<div key="empty-placeholder" />);
        }
      }

      return (
        <Tr key={`field-row-${index}`} role="group">
          {/* First column cell */}
          <Td 
            dataLabel={String(firstColumnLabel)}
            className={secondColumnLabel ? "pf-m-width-40" : "pf-m-width-80"}
          >
            {cells[0]}
          </Td>
          {/* Second column cell (if two-column layout) */}
          {secondColumnLabel && (
            <Td 
              dataLabel={String(secondColumnLabel)}
              className="pf-m-width-40"
            >
              {cells[1] || <div />}
            </Td>
          )}
          {/* Remove button column */}
          <Td className="pf-m-width-20">
            <Button
              variant="plain"
              aria-label={removeButtonAriaLabel ? removeButtonAriaLabel(rowNumber, rowGroupLabelPrefix) : `Remove ${rowGroupLabelPrefix.toLowerCase()} ${rowNumber}`}
              onClick={(event) => handleRemoveRow(event, index)}
              icon={<MinusCircleIcon />}
              {...removeButtonProps}
            />
          </Td>
        </Tr>
      );
    });
  };

  return (
    // The entire component is wrapped in a FormGroup to be semantically correct.
    <FormGroup {...formGroupProps}>
      <Flex direction={{ default: 'column' }} spaceItems={{ default: 'spaceItemsNone' }}>
        {/* ARIA Live Region for announcing dynamic changes */}
        <div 
          className="pf-v6-screen-reader"
          aria-live="polite"
        >
          {liveRegionMessage}
        </div>

        {/* Table layout */}
        <Table 
          aria-label={`${rowGroupLabelPrefix} management table`} 
          variant="compact" 
          borders={false}
          style={{
            '--pf-v6-c-table--cell--PaddingInlineStart': '0',
            '--pf-v6-c-table--cell--first-last-child--PaddingInline': '0 1rem 0 0',
            '--pf-v6-c-table--cell--PaddingBlockStart': 'var(--pf-t--global--spacer--sm)',
            '--pf-v6-c-table--cell--PaddingBlockEnd': 'var(--pf-t--global--spacer--sm)',
            '--pf-v6-c-table__thead--cell--PaddingBlockEnd': 'var(--pf-t--global--spacer--sm)'
          } as React.CSSProperties}
        >
          <Thead>
            <Tr>
              <Th className={secondColumnLabel ? "pf-m-width-40" : "pf-m-width-80"}>
                {firstColumnLabel}
              </Th>
              {secondColumnLabel && (
                <Th className="pf-m-width-40">
                  {secondColumnLabel}
                </Th>
              )}
              <Th screenReaderText="Actions" className="pf-m-width-20" />
            </Tr>
          </Thead>
          <Tbody>
            {renderRows()}
          </Tbody>
        </Table>

        {/* The "Add" button for creating a new row */}
        <FlexItem className="pf-v6-u-mt-sm">
          <Button 
            ref={addButtonRef}
            variant="link" 
            onClick={handleAddRow} 
            icon={<PlusCircleIcon />} 
            aria-label={`Add ${rowGroupLabelPrefix.toLowerCase()}`}
            {...addButtonProps}
          >
            {addButtonContent || 'Add another'}
          </Button>
        </FlexItem>
      </Flex>
    </FormGroup>
  );
};

export default FieldBuilder;
