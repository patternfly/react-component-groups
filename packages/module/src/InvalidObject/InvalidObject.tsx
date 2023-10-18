import { Button, EmptyState, EmptyStateBody, EmptyStateFooter, EmptyStateHeader, EmptyStateVariant } from '@patternfly/react-core';

import NotFoundIcon from '../NotFoundIcon/NotFoundIcon';
import React from 'react';
import clsx from 'clsx';
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  "invalidObject": {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    h1: { marginBottom: "30px" },
    svg: { marginBottom: "30px" },
    button: { fontSize: "20px" }
  },
  "invalidObjectSorryText": { maxWidth: "70%" },
});

export interface InvalidObjectProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
  /** Custom landing page button URL */
  toLandingPageUrl?: string;
  /** Custom return to landing page text */
  toLandingPageText?: React.ReactNode;
}


const InvalidObject: React.FunctionComponent<InvalidObjectProps> = ({
  toLandingPageUrl = `${window.location.origin}`,
  toLandingPageText = 'Return to homepage'
}: InvalidObjectProps) => {
  const classes = useStyles();
  const invalidObjectClasses = clsx("pf-v5-l-page__main-section", "pf-v5-c-page__main-section", classes.invalidObject)
  return (
    <EmptyState variant={EmptyStateVariant.full} className={invalidObjectClasses}>
      <EmptyStateHeader titleText='We lost that page' icon={<NotFoundIcon />} headingLevel='h1' />
      <EmptyStateBody>Let&apos;s find you a new one. Try a new search or return home.</EmptyStateBody>
      <EmptyStateFooter>
        <Button variant="link" component="a" href={toLandingPageUrl}>
          {toLandingPageText}
        </Button>
      </EmptyStateFooter>
    </EmptyState>
  );
};

export default InvalidObject;