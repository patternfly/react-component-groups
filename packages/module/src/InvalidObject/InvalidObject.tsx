import { Button, EmptyState, EmptyStateBody, EmptyStateFooter, EmptyStateHeader, EmptyStateProps, EmptyStateVariant } from '@patternfly/react-core';

import NotFoundIcon from '../NotFoundIcon/NotFoundIcon';
import React from 'react';

export interface InvalidObjectProps extends Omit<EmptyStateProps, 'children' | 'title'> {
  /** The URL that the home page link points to */
  toHomePageUrl?: string;
  /** The text label for the link that points back to the home page */
  toHomePageText?: React.ReactNode;
  /** The title for the invalid object message */
  invalidObjectTitleText?: string;
  /** The body text for the invalid object message */
  invalidObjectBodyText?: string;
  /** Custom OUIA ID */
  ouiaId?: string | number;
}

const InvalidObject: React.FunctionComponent<InvalidObjectProps> = ({
  toHomePageUrl = window.location.origin,
  toHomePageText = 'Return to homepage',
  invalidObjectTitleText = 'We lost that page',
  invalidObjectBodyText = "Let's find you a new one. Try a new search or return home.",
  ouiaId = "InvalidObject",
  ...props
}: InvalidObjectProps) => (
  <EmptyState variant={EmptyStateVariant.full} data-ouia-component-id={ouiaId} {...props}>
    <EmptyStateHeader titleText={invalidObjectTitleText} icon={<NotFoundIcon data-ouia-component-id={`${ouiaId}-icon`} />} headingLevel='h1' data-ouia-component-id={`${ouiaId}-header`} />
    <EmptyStateBody data-ouia-component-id={`${ouiaId}-body`}>{invalidObjectBodyText}</EmptyStateBody>
    <EmptyStateFooter data-ouia-component-id={`${ouiaId}-footer`}>
      <Button variant="link" component="a" href={toHomePageUrl} ouiaId={`${ouiaId}-home-button`}>
        {toHomePageText}
      </Button>
    </EmptyStateFooter>
  </EmptyState>
);

export default InvalidObject;