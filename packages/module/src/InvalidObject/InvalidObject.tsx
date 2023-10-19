import { Button, EmptyState, EmptyStateBody, EmptyStateFooter, EmptyStateHeader, EmptyStateVariant } from '@patternfly/react-core';

import NotFoundIcon from '../NotFoundIcon/NotFoundIcon';
import React from 'react';

export interface InvalidObjectProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
  /** Custom landing page button URL */
  toLandingPageUrl?: string;
  /** Custom return to landing page text */
  toLandingPageText?: React.ReactNode;
}


const InvalidObject: React.FunctionComponent<InvalidObjectProps> = ({
  toLandingPageUrl = window.location.origin,
  toLandingPageText = 'Return to homepage'
}: InvalidObjectProps) => (
  <EmptyState variant={EmptyStateVariant.full}>
    <EmptyStateHeader titleText='We lost that page' icon={<NotFoundIcon />} headingLevel='h1' />
    <EmptyStateBody>Let&apos;s find you a new one. Try a new search or return home.</EmptyStateBody>
    <EmptyStateFooter>
      <Button variant="link" component="a" href={toLandingPageUrl}>
        {toLandingPageText}
      </Button>
    </EmptyStateFooter>
  </EmptyState>
);

export default InvalidObject;