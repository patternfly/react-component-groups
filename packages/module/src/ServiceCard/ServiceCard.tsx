import React from 'react';
import { Card, CardBody, CardFooter, CardHeader, Text, TextContent, TextVariants } from '@patternfly/react-core';
import { HelperText } from '@patternfly/react-core/dist/dynamic/components/HelperText';
import { HelperTextItem } from '@patternfly/react-core/dist/dynamic/components/HelperText';
import { createUseStyles } from 'react-jss';

export interface ServiceCardProps {
  /** Title for card */
  title: string;
  /** Subtitle for card */
  subtitle: string;
  /** Custom description */
  description: string;
  /** icon for service card */
  icon: React.ReactNode;
  /** Whether to show if button is disabled */
  showDisabledButton?: boolean;
  /** Helper text for card */
  helperText?: string;
  /** Optional footer */
  footer?: React.ReactElement
  /** Optional custom OUIA ID */
  ouiaId?: string | number;
}

const useStyles = createUseStyles({
  card: {
    height: 'var(--pf-v5-u-h-100)'
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
  footer,
  ouiaId='ServiceCard'
}: ServiceCardProps) => {
  const classes = useStyles();

  return (
    <Card className={classes.card} ouiaId={`${ouiaId}-card`}>
      <CardHeader>
        <div className={classes.image}>
          {icon}
        </div>
        <TextContent>
          <Text component={TextVariants.h2}>{title}</Text>
          {subtitle}
        </TextContent>
      </CardHeader>
      <CardBody>{description}</CardBody>
      <CardFooter>
        { helperText ?
          ( <HelperText>
            <HelperTextItem variant="indeterminate" className="pf-v5-u-mb-lg">
              {helperText}
            </HelperTextItem>
          </HelperText>) : null
        }
        { footer ? ( footer ) : null }
      </CardFooter>
    </Card>
  )
}

export default ServiceCard;