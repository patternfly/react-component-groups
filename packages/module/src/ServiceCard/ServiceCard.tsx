import React from 'react';
import { Button, ButtonVariant, ButtonProps, Card, CardBody, CardFooter, CardHeader, Text, TextContent, TextVariants } from '@patternfly/react-core';
import { HelperText } from '@patternfly/react-core/dist/dynamic/components/HelperText';
import { HelperTextItem } from '@patternfly/react-core/dist/dynamic/components/HelperText';
import { createUseStyles } from 'react-jss';

export interface AnalyticsProps {
  event: string;
  properties: { name: string; url: string; };
}

export interface ServiceCardButtonProps extends ButtonProps {
    /** Label for the button */
    label: string;
    /** button url */
    url: string;
    analytics: AnalyticsProps
}


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
  /** Props to customize learn more Button */
  learnMoreButton:React.ReactElement ;
  /** Optional launch */
  launchButton?: React.ReactElement;
  /** Custom OUIA ID */
  ouiaId?: string | number;
}

const useStyles = createUseStyles({
  card: {
    height: ('--pf-v5-u-h-100')
  },
  image: {
    marginRight: ('--pf-v5-u-mr-md'),
    width: 48
  }
})

const ServiceCard: React.FunctionComponent<ServiceCardProps> = ({
  title,
  subtitle,
  description,
  iconUrl,
  helperText,
  learnMoreButton,
  launchButton,
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
        {learnMoreButton}
        {/* <Button
          variant={ButtonVariant.link}
          component="a"
          ouiaId={`${ouiaId}-learn-more-button`}
          isInline
          href={learnMoreUrl}
          {...learnMoreButtonProps}>
          {learnMoreButtonProps?.label}
        </Button> */}

        {launchButton ? ( launchButton ) : null
        // <Button 
        //   variant={ButtonVariant.primary}
        //   ouiaId={`${ouiaId}-launch-button`}
        //   isInline
        //   component="a"
        //   href={launchUrl}
        //   {...launchButtonProps}>
        //   {launchButtonProps?.label}
        // </Button>
        }
      </CardFooter>
    </Card>
  )
  
}

export default ServiceCard;