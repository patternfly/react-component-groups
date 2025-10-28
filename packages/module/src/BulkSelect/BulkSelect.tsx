import type { FC, Ref } from 'react';
import { useMemo, useState } from 'react';
import {
  Dropdown,
  DropdownItem,
  DropdownList,
  DropdownProps,
  MenuToggle,
  MenuToggleCheckbox,
  MenuToggleCheckboxProps,
  MenuToggleElement,
  MenuToggleProps
} from '@patternfly/react-core';

export const BulkSelectValue = {
  all: 'all',
  none: 'none',
  page: 'page',
  nonePage: 'nonePage'
} as const;

export type BulkSelectValue = (typeof BulkSelectValue)[keyof typeof BulkSelectValue];

/** extends DropdownProps */
export interface BulkSelectProps extends Omit<DropdownProps, 'toggle' | 'onSelect'> {
  /** BulkSelect className */
  className?: string;
  /** Indicates whether selectable items are paginated */
  isDataPaginated?: boolean;
  /** Indicates whether "Select all" option should be available */
  canSelectAll?: boolean;
  /** Number of entries present in current page */
  pageCount?: number;
  /** Number of selected entries */
  selectedCount: number;
  /** Number of all entries */
  totalCount?: number;
  /** Indicates if ALL current page items are selected */
  pageSelected?: boolean;
  /** Indicates if ONLY some current page items are selected */
  pagePartiallySelected?: boolean;
  /** Callback called on item select */
  onSelect: (value: BulkSelectValue) => void;
  /** Custom OUIA ID */
  ouiaId?: string;
  /** Additional props for MenuToggleCheckbox */
  menuToggleCheckboxProps?: Omit<MenuToggleCheckboxProps, 'onChange' | 'isChecked' | 'instance' | 'ref'>;
  /** Additional props for MenuToggleProps */
  menuToggleProps?: Omit<MenuToggleProps, 'children' | 'splitButtonItems' | 'ref' | 'isExpanded' | 'onClick'>;
}

export const BulkSelect: FC<BulkSelectProps> = ({
  isDataPaginated = true,
  canSelectAll,
  pageSelected,
  pagePartiallySelected,
  pageCount,
  selectedCount = 0,
  totalCount = 0,
  ouiaId = 'BulkSelect',
  onSelect,
  menuToggleCheckboxProps,
  menuToggleProps,
  ...props
}: BulkSelectProps) => {
  const [ isOpen, setOpen ] = useState(false);

  const splitButtonDropdownItems = useMemo(
    () => (
      <>
        <DropdownItem ouiaId={`${ouiaId}-select-none`} value={BulkSelectValue.none} key={BulkSelectValue.none}>
          Select none (0)
        </DropdownItem>
        {isDataPaginated && (
          <DropdownItem ouiaId={`${ouiaId}-select-page`} value={BulkSelectValue.page} key={BulkSelectValue.page}>
            {`Select page${pageCount ? ` (${pageCount})` : ''}`}
          </DropdownItem>
        )}
        {canSelectAll && (
          <DropdownItem ouiaId={`${ouiaId}-select-all`} value={BulkSelectValue.all} key={BulkSelectValue.all}>
            {`Select all${totalCount ? ` (${totalCount})` : ''}`}
          </DropdownItem>
        )}
      </>
    ),
    [ isDataPaginated, canSelectAll, ouiaId, pageCount, totalCount ]
  );

  const allOption = isDataPaginated ? BulkSelectValue.page : BulkSelectValue.all;
  const noneOption = isDataPaginated ? BulkSelectValue.nonePage : BulkSelectValue.none;

  const onToggleClick = () => setOpen(!isOpen);

  return (
    (<Dropdown
      shouldFocusToggleOnSelect
      ouiaId={`${ouiaId}-dropdown`}
      onSelect={(_e, value) => {
        setOpen(!isOpen);
        onSelect?.(value as BulkSelectValue);
      }}
      isOpen={isOpen}
      onOpenChange={(isOpen: boolean) => setOpen(isOpen)}
      toggle={(toggleRef: Ref<MenuToggleElement>) => (
        <MenuToggle
          ref={toggleRef}
          isExpanded={isOpen}
          onClick={onToggleClick}
          aria-label="Bulk select toggle"
          ouiaId={`${ouiaId}-toggle`}
          splitButtonItems={[
            <MenuToggleCheckbox
              ouiaId={`${ouiaId}-checkbox`}
              id={`${ouiaId}-checkbox`}
              key="bulk-select-checkbox"
              aria-label={`Select ${allOption}`}
              isChecked={
                (isDataPaginated && pagePartiallySelected) ||
                (!isDataPaginated && selectedCount > 0 && selectedCount < totalCount)
                  ? null
                  : pageSelected || (selectedCount === totalCount && totalCount > 0)
              }
              onChange={(checked) => onSelect?.(!checked || checked === null ? noneOption : allOption)}
              {...menuToggleCheckboxProps}
            />,
            selectedCount > 0 ? (
              <span onClick={onToggleClick} data-ouia-component-id={`${ouiaId}-text`} key="bulk-select-text">
                {`${selectedCount} selected`}
              </span>
            ) : null
          ]}
          {...menuToggleProps}
        />
      )}
      {...props}
    >
      <DropdownList>{splitButtonDropdownItems}</DropdownList>
    </Dropdown>)
  );
};

export default BulkSelect;
