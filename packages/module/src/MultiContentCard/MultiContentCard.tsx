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

export interface MultiContentCardProps extends Omit<CardProps, 'children' | 'title'> {
  /** Cards to be displayed as a content */
  cards?: React.ReactElement[];
  /** Actions to be displayed in the expandable section */
  actions?: React.ReactElement;
  /** Toggle text for the expandable section */
  toggleText?: string;
  /** Toggle content for the expandable section */
  toggleContent?: React.ReactElement;
  /** Left border variant for the containing card */
  leftBorderVariant?: MultiContentCardBorderVariant;
  /** Indicates whether the content is separated by dividers */
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
  
  const renderCards = (cards: React.ReactElement[], withDividers?: boolean) =>  (
    <Flex alignSelf={{ default: 'alignSelfStretch' }} alignItems={{ default: 'alignItemsStretch' }}>
      {cards.map((card, index) => (
        <>
          <FlexItem key={`card-${index}`} flex={{ default: 'flex_1' }}>
            {card}
          </FlexItem>
          {(index + 1 < cards.length && withDividers) && (
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
