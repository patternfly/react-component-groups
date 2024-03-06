import React from 'react';
import {
  Card,
  CardExpandableContent,
  CardHeader,
  CardProps,
  CardTitle,
  Divider,
  Flex,
  FlexItem,
  Title,
} from '@patternfly/react-core';
import { createUseStyles } from 'react-jss';
import clsx from 'clsx';

export type MultiContentCardBorderVariant = 'primary' | 'danger' | 'success' | 'info' | 'warning' | 'hidden';

export type MultiContentCardDividerVariant = 'left' | 'right';

export interface MutliContentCardProps {
  /** Card element to be displayed as a content */
  content: React.ReactElement;
  /** Allows adding divider on the left/right from the card */
  dividerVariant?: MultiContentCardDividerVariant;
}

export interface MultiContentCardProps extends Omit<CardProps, 'children' | 'title'> {
  /** Cards to be displayed as a content */
  cards?: (React.ReactElement | MutliContentCardProps)[];
  /** Actions to be displayed in the expandable section */
  actions?: React.ReactElement;
  /** Toggle text for the expandable section */
  toggleText?: string;
  /** Toggle content for the expandable section */
  toggleContent?: React.ReactElement;
  /** Left border variant for the containing card */
  leftBorderVariant?: MultiContentCardBorderVariant;
  /** When set to true, all content cards will be separated with dividers */
  withDividers?: boolean;
  /** Indicates whether the card is expandable */
  isExpandable?: boolean;
  /** Indicates whether the card is expanded by default */
  defaultExpanded?: boolean;
  /** Indicates whether the actions toggle is right aligned */
  isToggleRightAligned?: boolean;
  /** Indicates whether the card header has a bottom border */
  withHeaderBorder?: boolean
}

const useStyles = createUseStyles({
  multiContentCardHeadingBorder: {
    borderBottom: 'var(--pf-v5-global--BorderWidth--sm) solid var(--pf-v5-global--disabled-color--200)',
  },
  multiContentCardLeftBorder: (leftBorderVariant: MultiContentCardBorderVariant) => ({
    borderLeft: `var(--pf-v5-global--BorderWidth--lg) solid var(--pf-v5-global--${leftBorderVariant}-color--100)` 
  })
})

const MultiContentCard: React.FunctionComponent<MultiContentCardProps> = ({
  cards = [],
  isToggleRightAligned = false,
  actions,
  toggleText,
  toggleContent,
  withDividers = false,
  leftBorderVariant = 'hidden',
  isExpandable = false,
  defaultExpanded = true,
  withHeaderBorder = false,
  ...rest
}: MultiContentCardProps) => {
  const classes = useStyles(leftBorderVariant);
  const [ isExpanded, setIsExpanded ] = React.useState(defaultExpanded);
  const onExpand = () => {
    setIsExpanded(!isExpanded);
  };
  
  const renderCards = (cards: (React.ReactElement | MutliContentCardProps)[], withDividers?: boolean) =>  (
    <Flex alignSelf={{ default: 'alignSelfStretch' }} alignItems={{ default: 'alignItemsStretch' }}>
      {cards.map((card, index) => {
        const isElement = React.isValidElement(card);
        return (
          <>
            {(index > 0 && !isElement && ((card as MutliContentCardProps).dividerVariant === 'left')) && (
              <Divider 
                orientation={{ md: 'vertical' }} 
                inset={{ default: 'inset3xl' }}
              />
            )}
            <FlexItem key={`card-${index}`} flex={{ default: 'flex_1' }}>
              {isElement ? card as React.ReactNode : (card as MutliContentCardProps).content}
            </FlexItem>
            {(index + 1 < cards.length && (withDividers || !isElement && (card as MutliContentCardProps).dividerVariant === 'right')) && (
              <Divider 
                orientation={{ md: 'vertical' }} 
                inset={{ default: 'inset3xl' }}
              />
            )}
          </>
        )})} 
    </Flex>
  );
  
  return(
    <Card className={clsx([ { [classes.multiContentCardLeftBorder]: leftBorderVariant !== 'hidden' } ])} isExpanded={isExpanded} {...rest}>
      {isExpandable && (
        <CardHeader
          className={clsx({ [classes.multiContentCardHeadingBorder]: withHeaderBorder })}
          onExpand={onExpand}
          isToggleRightAligned={isToggleRightAligned}
          toggleButtonProps={{
            'aria-label': 'Details',
            'aria-expanded': isExpanded
          }}
          actions={{ actions }}
        >
          <CardTitle>{toggleText ? <Title headingLevel="h2" size="xl">{toggleText}</Title> : toggleContent}</CardTitle>
        </CardHeader>
      )}
      {isExpandable ? <CardExpandableContent>{renderCards(cards, withDividers)}</CardExpandableContent> : renderCards(cards, withDividers)}
    </Card>
  );}


export default MultiContentCard;
