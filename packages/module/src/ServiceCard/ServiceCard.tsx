import React from 'react';
import { Button, ButtonVariant, Card, CardBody, CardFooter, CardHeader, Text, TextContent, TextVariants } from '@patternfly/react-core';
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
  /** URL for service card icon */
  iconUrl: string;
  /** Whether to show if button is disabled */
  showDisabledButton?: boolean;
  /** Helper text for card */
  helperText?: string;
  /** learn more button url*/
  learnMoreUrl: string;
  /** Optional launch button url*/
  launchUrl?: string;
  /** Optional foot to override default Learn More and Launch buttons */
  footer?: React.ReactElement
  /** Optional custom OUIA ID */
  ouiaId?: string | number;
}

const useStyles = createUseStyles({
  card: {
    height: ('--pf-v5-u-h-100')
  },
  image: {
    marginRight: ('--pf-v5-u-mr-md'),
    width: 48
  },
  launchButton: {
    marginRight: ('--pf-v5-u-mr-md')
  }
});

const ServiceCard: React.FunctionComponent<ServiceCardProps> = ({
  title,
  subtitle,
  description,
  iconUrl,
  helperText,
  learnMoreUrl,
  launchUrl,
  footer,
  ouiaId='ServiceCard'
}: ServiceCardProps) => {
  const classes = useStyles();

  return (
    <Card className={classes.card} ouiaId={`${ouiaId}-card`}>
      <CardHeader>
        <img src={iconUrl} className={classes.image} />
        <TextContent>
          <Text component={TextVariants.h2}>{title}</Text>
          {subtitle}
        </TextContent>
      </CardHeader>
      <CardBody>{description}</CardBody>
      <CardFooter>
        <HelperText>
          <HelperTextItem variant="indeterminate" className="pf-v5-u-mb-lg">
            {helperText}
          </HelperTextItem>
        </HelperText>
        {
          footer ?
            ( footer ) :
            ( <>
             { launchUrl &&  
              <Button
                variant={ButtonVariant.secondary}
                isInline
                className={classes.launchButton}
                component="a"
                href="/">
                  Launch
              </Button> }
              <Button
                variant={ButtonVariant.link}
                component="a"
                isInline
                href={learnMoreUrl}
              >
                Learn More
              </Button>
            </> )
        }
      </CardFooter>
    </Card>
  )
  
}

export default ServiceCard;