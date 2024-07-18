import React from 'react';
import { Button, ButtonVariant, ButtonProps, Card, CardBody, CardFooter, CardHeader, Text, TextContent, TextVariants } from '@patternfly/react-core';
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
  title: string;
  subtitle: string;
  description: string;
  iconUrl: string;
  learnMoreUrl: string;
  launchUrl?: string;
  showDisabledButton?: boolean;
  helperText?: React.ReactElement;
  learnMoreButtonProps?: ServiceCardButtonProps;
  launchButtonProps: ServiceCardButtonProps;
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
  learnMoreUrl,
  launchUrl,
  helperText,
  learnMoreButtonProps,
  launchButtonProps,
  ouiaId='ServiceCard'
}: ServiceCardProps) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardHeader>
        <img src={iconUrl} className={classes.image} />
        <TextContent>
          <Text component={TextVariants.h2}>{title}</Text>
          {subtitle}
        </TextContent>
      </CardHeader>
      <CardBody>{description}</CardBody>
      <CardFooter>
        {helperText}
      
        <Button
          variant={ButtonVariant.link}
          component="a"
          ouiaId={`${ouiaId}-learn-more-button`}
          isInline
          href={learnMoreUrl}
          {...learnMoreButtonProps}>
          {learnMoreButtonProps?.label}
        </Button>

        {launchButtonProps && 
        <Button 
          variant={ButtonVariant.primary}
          ouiaId={`${ouiaId}-launch-button`}
          isInline
          component="a"
          href={launchUrl}
          {...launchButtonProps}>
          {launchButtonProps?.label}
        </Button>}
     
        {/* <AnalyticsButton
        variant={ButtonVariant.link}
        component="a"
        href={learnMoreUrl}
        target="_blank"
        rel="noopener"
        isInline
        analytics={{
          event: 'DevSandbox Service Learn',
          properties: {
            name: `${title} ${subtitle}`,
            url: learnMoreUrl,
          },
        }}
      >
        Learn more
      </AnalyticsButton> */}
      </CardFooter>
    </Card>
  )
  
}

export default ServiceCard;