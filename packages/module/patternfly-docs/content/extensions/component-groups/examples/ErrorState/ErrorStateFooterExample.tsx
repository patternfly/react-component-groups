import React from 'react';
import { Button } from '@patternfly/react-core';
import ErrorState from "@patternfly/react-component-groups/dist/dynamic/ErrorState";

// eslint-disable-next-line no-console
export const BasicExample: React.FunctionComponent = () => <ErrorState titleText='Sample error title' bodyText='Sample error description' customFooter={<Button variant="secondary" onClick={() => console.log("Custom button clicked")}>
Custom action
</Button>}/>;
