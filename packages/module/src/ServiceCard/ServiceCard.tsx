import React from 'react';
import { Card, CardBody, CardFooter, CardHeader, Text, TextContent, TextVariants, Flex, FlexItem, CardProps } from '@patternfly/react-core';
import { HelperText } from '@patternfly/react-core/dist/dynamic/components/HelperText';
import { HelperTextItem } from '@patternfly/react-core/dist/dynamic/components/HelperText';
import { createUseStyles } from 'react-jss';

export interface ServiceCardProps extends CardProps {
  /** Service card title */
  title: string;
  /** Service card subtitle */
  subtitle: string;
  /** Service card description */
  description: string;
  /** Service card icon */
  icon: React.ReactNode;
  /** Optional Service card helper text*/
  helperText?: string;
  /** Optional footer */
  footer?: React.ReactElement | null;
  /** Optional custom OUIA ID */
  ouiaId?: string | number;
  /** Optional flag modifying the card header layout */
  isStacked?: boolean;
}

const useStyles = createUseStyles({
  card: {
    height: '100%'
  },
  image: {
    marginRight: 'var(--pf-v5-global--spacer--md)',
    width: 48
  }
});

const ServiceCard: React.FunctionComponent<ServiceCardProps> = ({
  title,
  subtitle,
  description,
  icon,
  helperText,
  footer = null,
  ouiaId='ServiceCard',
  isStacked = false,
  ...props
}: ServiceCardProps) => {
  const classes = useStyles();

  return (
    <Card className={classes.card} ouiaId={`${ouiaId}-card`} {...props}>
      <CardHeader>
        <Flex direction={{ default: isStacked ? 'column' : 'row' }} alignItems={{ default: isStacked ? 'alignItemsFlexStart' : 'alignItemsCenter' }}>
          <FlexItem className={classes.image}>
            {icon}
          </FlexItem>
          <FlexItem>
            <TextContent>
              <Text component={TextVariants.h2} ouiaId={`${ouiaId}-title`}>{title}</Text>
              {subtitle}
            </TextContent>
          </FlexItem>
        </Flex>
      </CardHeader>
      <CardBody data-ouia-component-id={`${ouiaId}-description`}>{description}</CardBody>
      <CardFooter data-ouia-component-id={`${ouiaId}-footer`}>
        { helperText ?
          ( <HelperText data-ouia-component-id={`${ouiaId}-helper-text`}>
            <HelperTextItem variant="indeterminate" className="pf-v5-u-mb-lg">
              {helperText}
            </HelperTextItem>
          </HelperText>) : null
        }
        { footer }
      </CardFooter>
    </Card>
  )
}

export default ServiceCard;