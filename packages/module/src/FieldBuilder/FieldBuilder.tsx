import React, { FunctionComponent, Children, useRef, useEffect, useCallback } from 'react';
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
 * This allows each rendered row to have access to its own specific index.
 */
export interface FieldRowHelpers {
  rowIndex: number;
  /** 
   * Ref callback to attach to the first focusable element in the row.
   * This enables automatic focus management when rows are added/removed.
   */
  focusRef: (element: HTMLElement | null) => void;
  /**
   * Unique ID for this row group - use this for aria-labelledby associations
   */
  rowGroupId: string;
  /**
   * ID for the first column label - use this to associate the first field with its column header
   */
  firstColumnLabelId: string;
  /**
   * ID for the second column label - use this to associate the second field with its column header
   */
  secondColumnLabelId?: string;
  /**
   * ID for the row label - use this in combination with column labels for comprehensive labeling
   */
  rowLabelId: string;
  /**
   * Complete aria-labelledby string for the first column that includes both row and column context
   */
  firstColumnAriaLabelledBy: string;
  /**
   * Complete aria-labelledby string for the second column that includes both row and column context
   */
  secondColumnAriaLabelledBy?: string;
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
   */
  children: (helpers: FieldRowHelpers) => React.ReactNode;
  /** A callback triggered when the "Add" button is clicked. */
  onAddRow: () => void;
  /** A callback triggered when a "Remove" button is clicked, which receives the index of the row to remove. */
  onRemoveRow: (index: number) => void;
  /** Optional props to customize the "Add" button. */
  addButtonProps?: Omit<ButtonProps, 'onClick'>;
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
  rowGroupLabelPrefix = "Row",
  fieldBuilderIdPrefix = "field-builder",
  ...formGroupProps
}: FieldBuilderProps) => {
  // Track the previous row count to detect when rows are added
  const prevRowCountRef = useRef(rowCount);
  // Track focusable elements for each row
  const focusableElementsRef = useRef<Map<number, HTMLElement>>(new Map());
  // Track remove button refs for focus management
  const removeButtonRefs = useRef<Map<number, HTMLButtonElement>>(new Map());
  // Track the add button ref
  const addButtonRef = useRef<HTMLButtonElement>(null);
  // ARIA live region for announcing dynamic changes
  const liveRegionRef = useRef<HTMLDivElement>(null);

  // Generate unique IDs for this instance
  const instanceId = useRef(`${fieldBuilderIdPrefix}-${Math.random().toString(36).substr(2, 9)}`);
  const firstColumnLabelId = `${instanceId.current}-first-column-label`;
  const secondColumnLabelId = secondColumnLabel ? `${instanceId.current}-second-column-label` : undefined;

  // Function to announce changes to screen readers
  const announceChange = useCallback((message: string) => {
    if (liveRegionRef.current) {
      liveRegionRef.current.textContent = message;
      // Clear the message after a delay to prepare for next announcement
      setTimeout(() => {
        if (liveRegionRef.current) {
          liveRegionRef.current.textContent = '';
        }
      }, 1000);
    }
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

  // Create ref callback for remove buttons
  const createRemoveButtonRef = useCallback((rowIndex: number) => 
    (element: HTMLButtonElement | null) => {
      if (element) {
        removeButtonRefs.current.set(rowIndex, element);
      } else {
        removeButtonRefs.current.delete(rowIndex);
      }
    }, []);

  // Enhanced onAddRow with focus management and announcements
  const handleAddRow = useCallback(() => {
    onAddRow();
    announceChange(`New ${rowGroupLabelPrefix.toLowerCase()} added. ${rowGroupLabelPrefix} ${rowCount + 1}.`);
  }, [ onAddRow, announceChange, rowGroupLabelPrefix, rowCount ]);

  // Enhanced onRemoveRow with focus management and announcements
  const handleRemoveRow = useCallback((index: number) => {
    const rowNumber = index + 1;
    
    // Determine where focus should go after removal
    const focusTarget = () => {
      // If removing the last row and there are other rows, focus the new last row's remove button
      if (index === rowCount - 1 && rowCount > 1) {
        return removeButtonRefs.current.get(index - 1);
      }
      // If removing a middle row, focus the remove button that will take its place (same index)
      else if (index < rowCount - 1) {
        // Give React time to re-render, then focus the remove button at the same index
        setTimeout(() => {
          const newButton = removeButtonRefs.current.get(index);
          if (newButton) {
            newButton.focus();
          }
        }, 0);
        return null; // Return null to skip immediate focus
      }
      // If removing the only row, focus the add button
      else {
        return addButtonRef.current;
      }
    };

    const elementToFocus = focusTarget();
    onRemoveRow(index);
    
    // Announce the removal
    announceChange(`${rowGroupLabelPrefix} ${rowNumber} removed.`);
    
    // Focus immediately if we have a target (for last row or only row cases)
    if (elementToFocus) {
      setTimeout(() => {
        elementToFocus.focus();
      }, 0);
    }
  }, [ onRemoveRow, rowCount, announceChange, rowGroupLabelPrefix ]);

  // Handle focus management when rows are added
  useEffect(() => {
    
    // Update the previous row count reference
    // Note: We no longer automatically focus the first field of new rows
    // as focus should remain on the "Add" button for better UX
    prevRowCountRef.current = rowCount;
  }, [ rowCount ]);

  // Helper function to render all the dynamic rows.
  const renderRows = () => {
    const rows = Array.from({ length: rowCount });

    return rows.map((_, index) => {
      const rowNumber = index + 1;
      const rowGroupId = `${instanceId.current}-row-${index}`;
      const rowLabelId = `${rowGroupId}-label`;

      // Call the user's render prop function to get the React nodes for this row's cells.
      const rowContent = children({ 
        rowIndex: index,
        focusRef: createFocusRef(index),
        rowGroupId,
        firstColumnLabelId,
        secondColumnLabelId,
        rowLabelId,
        firstColumnAriaLabelledBy: `${rowLabelId} ${firstColumnLabelId}`,
        secondColumnAriaLabelledBy: secondColumnLabelId ? `${rowLabelId} ${secondColumnLabelId}` : undefined
      });
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
          aria-labelledby={rowLabelId}
        >
          {/* Visually hidden but accessible label for this row group */}
          <div id={rowLabelId} className="pf-v6-screen-reader">
            {rowGroupLabelPrefix} {rowNumber}
          </div>
          
          {/* Map over the user's components and wrap each one in a GridItem with dynamic spans. */}
          {cells.map((cell, cellIndex) => (
            <GridItem key={cellIndex} span={cellSpan}>
              {cell}
            </GridItem>
          ))}
          {/* Automatically add the remove button as the last item in the row. */}
          <GridItem span={2}>
            <Button
              ref={createRemoveButtonRef(index)}
              variant="plain"
              aria-label={`Remove ${rowGroupLabelPrefix.toLowerCase()} ${rowNumber}`}
              onClick={() => handleRemoveRow(index)}
              icon={<MinusCircleIcon />}
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
          ref={liveRegionRef}
          className="pf-v6-screen-reader"
          aria-live="polite" 
          aria-atomic="true"
          role="status"
        />

        {/* Render the column labels */}
        <Grid hasGutter className="pf-v6-u-mb-md">
          <GridItem span={secondColumnLabel ? 5 : 10}>
            <span id={firstColumnLabelId} className="pf-v6-c-form__label-text">
              {firstColumnLabel}
            </span>
          </GridItem>
          {secondColumnLabel && (
            <GridItem span={5}>
              <span id={secondColumnLabelId} className="pf-v6-c-form__label-text">
                {secondColumnLabel}
              </span>
            </GridItem>
          )}
          {/* Empty GridItem to align with the remove button column */}
          {/* <GridItem span={2} /> */}
        </Grid>

        {/* Render all the dynamic rows of fields */}
        {renderRows()}

        {/* The "Add" button for creating a new row */}
        <FlexItem className="pf-v6-u-mt-md">
          <Button 
            ref={addButtonRef}
            variant="link" 
            isInline 
            onClick={handleAddRow} 
            icon={<PlusCircleIcon />} 
            {...addButtonProps}
          >
            {addButtonProps.children || 'Add another'}
          </Button>
        </FlexItem>
      </Flex>
    </FormGroup>
  );
};

export default FieldBuilder;
