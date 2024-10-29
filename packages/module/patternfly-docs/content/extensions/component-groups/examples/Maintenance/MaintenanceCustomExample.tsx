import React from 'react';
import Maintenance from '@patternfly/react-component-groups/dist/dynamic/Maintenance'

export const BasicExample: React.FunctionComponent = () => (
  <Maintenance bodyText='We are going to be down for maintenance starting now.' customFooter='Please visit' redirectUrl='http://patternfly.com' redirectUrlLinkText='here' utcStartTime='10am' utcEndTime='12am' startTime='6am' endTime='8am' timeZone='EST' />
);
