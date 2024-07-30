import React from 'react';
import { Card, CardBody, CardFooter, CardHeader, Content, ContentVariants } from '@patternfly/react-core';
import { HelperText } from '@patternfly/react-core/dist/dynamic/components/HelperText';
import { HelperTextItem } from '@patternfly/react-core/dist/dynamic/components/HelperText';
import { createUseStyles } from 'react-jss';
import clsx from 'clsx';

export interface ServiceCardProps {
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
}

const useStyles = createUseStyles({
  card: {
    height: 'var(--pf-v6-u-h-100)'
  },
  image: {
    marginRight: 'var(--pf-t--global--spacer--md)',
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
  ouiaId='ServiceCard'
}: ServiceCardProps) => {
  const classes = useStyles();

  return (
    <Card className={classes.card} ouiaId={`${ouiaId}-card`}>
      <CardHeader>
        <div className={classes.image}>
          {icon}
        </div>
        <Content>
          <Content component={ContentVariants.h2} ouiaId={`${ouiaId}-title`}>{title}</Content>
          {subtitle}
        </Content>
      </CardHeader>
      <CardBody data-ouia-component-id={`${ouiaId}-description`}>{description}</CardBody>
      <CardFooter data-ouia-component-id={`${ouiaId}-footer`}>
        { helperText ?
          ( <HelperText data-ouia-component-id={`${ouiaId}-helper-text`}>
            <HelperTextItem className="pf-v6-u-mb-lg">
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