import { Button, Title } from '@patternfly/react-core';

import Icon404 from './icon-404';
import React from 'react';
import classNames from 'classnames';
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
})

export interface InvalidObjectProps {
  /** Indicates if an additional "/beta" string should be added to when navigating back to the home screen. */
  isBeta?: boolean
}


const InvalidObject: React.FunctionComponent<InvalidObjectProps> = ({ isBeta }) => {
  const classes = useStyles();
  const invalidObjectClasses = classNames("pf-v5-l-page__main-section", "pf-v5-c-page__main-section", classes.invalidObject)
  return (
    <section className={invalidObjectClasses}>
      <Title headingLevel="h1" size="3xl">
        We lost that page
      </Title>
      <Icon404 />
      <Title headingLevel="h1" size="xl" className={classes.invalidObjectSorryText}>
        Let&apos;s find you a new one. Try a new search or return home.
      </Title>
      <Button variant="link" component="a" href={`${window.location.origin}${isBeta ? '/beta' : ''}`}>
        Return to homepage
      </Button>
    </section>
  );
};

export default InvalidObject;