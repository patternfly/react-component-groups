import { Button, EmptyState, EmptyStateBody, EmptyStateFooter, EmptyStateProps, EmptyStateVariant } from '@patternfly/react-core';

import NotFoundIcon from '../NotFoundIcon/NotFoundIcon';
import React from 'react';

export interface InvalidObjectProps extends Omit<EmptyStateProps, 'children' | 'title' | 'titleText'> {
  /** The URL that the home page link points to */
  toHomePageUrl?: string;
  /** The text label for the link that points back to the home page */
  toHomePageText?: React.ReactNode;
  /** The title for the invalid object message */
  titleText?: string;
  /** The body text for the invalid object message */
  bodyText?: string;
  /** Custom OUIA ID */
  ouiaId?: string | number;
}

const InvalidObject: React.FunctionComponent<InvalidObjectProps> = ({
  toHomePageUrl = window.location.origin,
  toHomePageText = 'Return to homepage',
  titleText = 'We lost that page',
  bodyText = "Let's find you a new one. Try a new search or return home.",
  ouiaId = "InvalidObject",
  ...props
}: InvalidObjectProps) => (
  <EmptyState headingLevel='h1' variant={EmptyStateVariant.full} data-ouia-component-id={ouiaId} {...props} titleText={titleText}>
    <NotFoundIcon data-ouia-component-id={`${ouiaId}-icon`} />
    <EmptyStateBody data-ouia-component-id={`${ouiaId}-body`}>{bodyText}</EmptyStateBody>
    <EmptyStateFooter data-ouia-component-id={`${ouiaId}-footer`}>
      <Button variant="link" component="a" href={toHomePageUrl} ouiaId={`${ouiaId}-home-button`}>
        {toHomePageText}
      </Button>
    </EmptyStateFooter>
  </EmptyState>
);

export default InvalidObject;