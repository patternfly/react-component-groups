import type { FunctionComponent, ReactNode } from 'react';
import { useState } from 'react';
import { ActionList, ActionListItem, ActionListGroup, Bullseye, Button, ButtonProps, Flex, FlexItem, FlexProps } from '@patternfly/react-core';

/** 
 * extends PatternFly's ButtonProps 
 */
export interface DeckButton extends ButtonProps {
  /** Automatically navigate to next/previous page or close the deck when clicked */
  navigation?: 'next' | 'previous' | 'close';
}

export interface DeckPage {
  /** Content to display on this page */
  content: ReactNode;
  /** Array of button configurations for this page */
  buttons?: DeckButton[];
}

export interface DeckProps {
  /** Array of pages to display in the deck */
  pages: DeckPage[];
  /** Deck className */
  className?: string;
  /** Custom OUIA ID */
  ouiaId?: string;
  /** Hide the progress dots indicator */
  hideProgressDots?: boolean;
  /** Initial page index to display (0-based) */
  initialPage?: number;
  /** Callback when page changes */
  onPageChange?: (pageIndex: number) => void;
  /** Callback when deck is closed/cancelled */
  onClose?: () => void;
  /** Additional props for the Flex layout containing content, progress dots, and buttons */
  contentFlexProps?: FlexProps;
  /** Text alignment for content (uses PatternFly utility classes). Set to false to disable. */
  textAlign?: 'center' | 'left' | 'right' | false;
  /** Accessible label for the deck region */
  ariaLabel?: string;
  /** Accessible role description for the deck */
  ariaRoleDescription?: string;
  /** Function to generate accessible page info label. Receives (currentPage, totalPages) and returns a string. */
  getPageLabel?: (currentPage: number, totalPages: number) => string;
}

export const Deck: FunctionComponent<DeckProps> = ({
  pages,
  className,
  ouiaId = 'Deck',
  hideProgressDots = false,
  initialPage = 0,
  onPageChange,
  onClose,
  contentFlexProps,
  textAlign = 'center',
  ariaLabel = 'Information deck',
  ariaRoleDescription = 'sequential information deck',
  getPageLabel = (current, total) => `Page ${current} of ${total}`,
  ...props
}: DeckProps) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(initialPage);

  const handlePageChange = (newIndex: number) => {
    if (newIndex >= 0 && newIndex < pages.length) {
      setCurrentPageIndex(newIndex);
      onPageChange?.(newIndex);
    }
  };

  const currentPage = pages[currentPageIndex];

  // Generate text alignment class if specified
  const textAlignClass = textAlign ? `pf-v6-u-text-align-${textAlign}` : '';

  // Generate accessible label with page information
  const pageInfo = getPageLabel(currentPageIndex + 1, pages.length);
  const pageInfoId = `${ouiaId}-page-info`;

  return (
    <Bullseye 
      className={className}
      data-ouia-component-id={ouiaId}
      {...props}
    >
      <Flex 
        direction={{ default: 'column' }}
        spaceItems={{ default: 'spaceItemsMd' }}
        alignItems={{ default: 'alignItemsCenter' }}
        role="region"
        aria-label={ariaLabel}
        aria-roledescription={ariaRoleDescription}
        {...contentFlexProps}
      >
        {/* Visually hidden page info for screen readers */}
        <span
          id={pageInfoId}
          className="pf-v6-screen-reader"
          aria-live="polite"
          aria-atomic="true"
        >
          {pageInfo}
        </span>

        {/* Current page content */}
        <FlexItem 
          className={textAlignClass} 
          data-ouia-component-id={`${ouiaId}-content`}
          aria-describedby={pageInfoId}
        >
          {currentPage?.content}
        </FlexItem>

        {/* Progress dots */}
        {!hideProgressDots && pages.length > 1 && (
          <FlexItem data-ouia-component-id={`${ouiaId}-progress-dots`}>
            <Flex spaceItems={{ default: 'spaceItemsSm' }} alignItems={{ default: 'alignItemsCenter' }}>
              {pages.map((_, index) => (
                <FlexItem key={index}>
                  <span
                    style={{ 
                      width: '6px', 
                      height: '6px', 
                      display: 'inline-block',
                      borderRadius: 'var(--pf-t--global--border--radius--pill)',
                      backgroundColor: index === currentPageIndex 
                        ? 'var(--pf-t--global--background--color--inverse--default)' 
                        : 'transparent',
                      border: index === currentPageIndex 
                        ? 'none' 
                        : '1px solid var(--pf-t--global--background--color--inverse--default)',
                      transition: `all var(--pf-t--global--motion--duration--fade--default) var(--pf-t--global--motion--timing-function--default)`
                    }}
                    aria-hidden="true"
                  />
                </FlexItem>
              ))}
            </Flex>
          </FlexItem>
        )}

        {/* Page buttons */}
        {currentPage?.buttons && currentPage.buttons.length > 0 && (
          <FlexItem>
            <ActionList data-ouia-component-id={`${ouiaId}-buttons`}>
                <ActionListGroup>
                    {currentPage.buttons.map((buttonConfig, index) => {
                        const { navigation, onClick, ...buttonProps } = buttonConfig;
                        
                        // Auto-wire navigation if specified
                        const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
                        // Call user's custom onClick first if provided
                        onClick?.(event);
                        
                        // Then handle navigation
                        if (navigation === 'next') {
                            handlePageChange(currentPageIndex + 1);
                        } else if (navigation === 'previous') {
                            handlePageChange(currentPageIndex - 1);
                        } else if (navigation === 'close') {
                            onClose?.();
                        }
                        };

                        return (
                        <ActionListItem key={index}>
                            <Button 
                            {...buttonProps} 
                            onClick={navigation || onClick ? handleClick : undefined}
                            />
                        </ActionListItem>
                        );
                    })}
                </ActionListGroup>
            </ActionList>
          </FlexItem>
        )}
      </Flex>
    </Bullseye>
  );
};

export default Deck;
