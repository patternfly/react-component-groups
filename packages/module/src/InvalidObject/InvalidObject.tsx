import { Button, EmptyState, EmptyStateBody, EmptyStateFooter, EmptyStateHeader, EmptyStateVariant } from '@patternfly/react-core';

import NotFoundIcon from '../NotFoundIcon/NotFoundIcon';
import React from 'react';

export interface InvalidObjectProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
  /** The URL that the landing page link points to */
  toLandingPageUrl?: string;
  /** The text label for the link that points back to the landing page */
  toLandingPageText?: React.ReactNode;
  /** The title for the invalid object message */
  invalidObjectTitleText?: string;
  /** The body text for the invalid object message */
  invalidObjectBodyText?: string;
}


const InvalidObject: React.FunctionComponent<InvalidObjectProps> = ({
  toLandingPageUrl = window.location.origin,
  toLandingPageText = 'Return to homepage',
  invalidObjectTitleText = 'We lost that page',
  invalidObjectBodyText = "Let's find you a new one. Try a new search or return home."
}: InvalidObjectProps) => (
  <EmptyState variant={EmptyStateVariant.full}>
    <EmptyStateHeader titleText={invalidObjectTitleText}icon={<NotFoundIcon />} headingLevel='h1' />
    <EmptyStateBody>{invalidObjectBodyText}</EmptyStateBody>
    <EmptyStateFooter>
      <Button variant="link" component="a" href={toLandingPageUrl}>
        {toLandingPageText}
      </Button>
    </EmptyStateFooter>
  </EmptyState>
);

export default InvalidObject;