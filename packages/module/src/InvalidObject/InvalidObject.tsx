import { Button, Title } from '@patternfly/react-core';

import Icon404 from './icon-404';
import React from 'react';
import classNames from 'classnames';
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  "ins-c-component_invalid-component": {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    h1: {marginBottom: "30px"},
    svg: {marginBottom: "30px"},
    button: {fontSize: "20px"}
  },
  "ins-c-text__sorry": {maxWidth: "70%"},
})

// Don't use chrome here because the 404 page on landing does not use chrome
const isBeta = () => {
  return window.location.pathname.split('/')[1] === 'beta' ? '/beta' : '';
};


const InvalidObject: React.FunctionComponent = ({ ...props }) => {
  const classes = useStyles();
  const invalidObjectClasses = classNames("pf-v5-l-page__main-section", "pf-v5-c-page__main-section", classes['ins-c-component_invalid-component'])
  return (
    <section {...props} className={invalidObjectClasses}>
      <Title headingLevel="h1" size="3xl">
        We lost that page
      </Title>
      <Icon404 />
      <Title headingLevel="h1" size="xl" className={classes['ins-c-text__sorry']}>
        Let&apos;s find you a new one. Try a new search or return home.
      </Title>
      <Button variant="link" component="a" href={`${window.location.origin}${isBeta()}`}>
        Return to homepage
      </Button>
    </section>
  );
};

export default InvalidObject;