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

export const MultiContentCardBorderVariant = {
  primary: 'primary',
  danger: 'danger',
  success: 'success',
  info: 'info',
  warning: 'warning',
  hidden: 'hidden'
} as const;

export type MultiContentCardBorderVariant = typeof MultiContentCardBorderVariant[keyof typeof MultiContentCardBorderVariant];

export const MultiContentCardDividerVariant = {
  left: 'left',
  right: 'right'
} as const;

export type MultiContentCardDividerVariant = typeof MultiContentCardDividerVariant[keyof typeof MultiContentCardDividerVariant];

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

export const isCardWithProps = (
  card: React.ReactElement | MutliContentCardProps
): card is MutliContentCardProps => !!card && !React.isValidElement(card);

const MultiContentCard: React.FunctionComponent<MultiContentCardProps> = ({
  cards = [],
  isToggleRightAligned = false,
  actions,
  toggleText,
  toggleContent,
  withDividers = false,
  leftBorderVariant = MultiContentCardBorderVariant.hidden,
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
      {cards.map((card, index) => (
        <>
          {index > 0 && isCardWithProps(card) && card.dividerVariant === MultiContentCardDividerVariant.left && (
            <Divider 
              orientation={{ md: 'vertical' }} 
              inset={{ default: 'inset3xl' }}
            />
          )}
          <FlexItem key={`card-${index}`} flex={{ default: 'flex_1' }}>
            {isCardWithProps(card) ? card.content : card}
          </FlexItem>
          {(index + 1 < cards.length && (withDividers || isCardWithProps(card) && card.dividerVariant === MultiContentCardDividerVariant.right)) && (
            <Divider 
              orientation={{ md: 'vertical' }} 
              inset={{ default: 'inset3xl' }}
            />
          )}
        </>
      ))} 
    </Flex>
  );
  
  return(
    <Card className={clsx([ { [classes.multiContentCardLeftBorder]: leftBorderVariant !== MultiContentCardBorderVariant.hidden } ])} isExpanded={isExpanded} {...rest}>
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
