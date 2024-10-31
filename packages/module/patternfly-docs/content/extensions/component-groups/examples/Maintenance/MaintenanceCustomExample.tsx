import React from 'react';
import Maintenance from '@patternfly/react-component-groups/dist/dynamic/Maintenance'

export const BasicExample: React.FunctionComponent = () => (
  <Maintenance bodyText='We are currently undergoing scheduled maintenance and will be unavailable from' customFooter='Please visit' redirectLinkUrl='http://patternfly.com' redirectLinkText='here.' startTime='6am' endTime='8am' timeZone='EST' />
);
