import React from 'react';
import { createUseStyles } from 'react-jss';
import { PathMissingIcon } from '@patternfly/react-icons';

const useStyles = createUseStyles({
  notFoundIcon: { height: '150px', width: '150px' },
});


export const NotFoundIcon: React.FunctionComponent = (props) => (
  <PathMissingIcon
    {...props}
    className={useStyles().notFoundIcon}
  />
);

export default NotFoundIcon;
