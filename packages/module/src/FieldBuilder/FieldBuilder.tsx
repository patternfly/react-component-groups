import React, { FunctionComponent, Children, useRef, useCallback, useState } from 'react';
import {
  Button,
  ButtonProps,
  FormGroup,
  type FormGroupProps,
  Flex,
  FlexItem,
  Grid,
  GridItem,
} from '@patternfly/react-core';
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

  // Function to announce changes to screen readers
  const announceChange = useCallback((message: string) => {
    setLiveRegionMessage(message);
    // Clear the message after a delay to prepare for next announcement
    setTimeout(() => {
      setLiveRegionMessage('');
    }, 1000);
  }, []);

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

  // Enhanced onRemoveRow with announcements
  const handleRemoveRow = useCallback((event: React.MouseEvent, index: number) => {
    const rowNumber = index + 1;
    
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

      // Determine span based on number of children
      const cellSpan = cells.length === 1 ? 10 : 5;

      return (
        <Grid 
          key={`field-row-${index}`} 
          hasGutter 
          className="pf-v6-u-mb-md"
          role="group"
        >
          {/* Map over the user's components and wrap each one in a GridItem with dynamic spans. */}
          {cells.map((cell, cellIndex) => (
            <GridItem key={cellIndex} span={cellSpan}>
              {cell}
            </GridItem>
          ))}
          {/* Automatically add the remove button as the last item in the row. */}
          <GridItem span={2}>
            <Button
              variant="plain"
              aria-label={removeButtonAriaLabel ? removeButtonAriaLabel(rowNumber, rowGroupLabelPrefix) : `Remove ${rowGroupLabelPrefix.toLowerCase()} ${rowNumber}`}
              onClick={(event) => handleRemoveRow(event, index)}
              icon={<MinusCircleIcon />}
              {...removeButtonProps}
            />
          </GridItem>
        </Grid>
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
          aria-atomic="true"
          role="status"
        >
          {liveRegionMessage}
        </div>

        {/* Render the column headers */}
        <Grid hasGutter className="pf-v6-u-mb-md">
          <GridItem span={secondColumnLabel ? 5 : 10}>
            <span className="pf-v6-c-form__label-text">
              {firstColumnLabel}
            </span>
          </GridItem>
          {secondColumnLabel && (
            <GridItem span={5}>
              <span className="pf-v6-c-form__label-text">
                {secondColumnLabel}
              </span>
            </GridItem>
          )}
          {/* Empty GridItem to align with the remove button column */}
          <GridItem span={2} />
        </Grid>

        {/* Render all the dynamic rows of fields */}
        {renderRows()}

        {/* The "Add" button for creating a new row */}
        <FlexItem className="pf-v6-u-mt-md">
          <Button 
            variant="link" 
            isInline 
            onClick={handleAddRow} 
            icon={<PlusCircleIcon />} 
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
