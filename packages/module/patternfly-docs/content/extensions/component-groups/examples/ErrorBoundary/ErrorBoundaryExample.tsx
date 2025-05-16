import { FunctionComponent, useState } from 'react';
import { Title, Button, Card, CardBody, CardFooter, CardHeader } from '@patternfly/react-core';
import ErrorBoundary from '@patternfly/react-component-groups/dist/dynamic/ErrorBoundary';

export const BasicExample: FunctionComponent = () => {
  const [ hasError, setHasError ] = useState(false);

  const Surprise = () => {
    if (hasError) {
      throw new Error('but a welcome one');
    }
    return (
      <Card>
        <CardHeader>
          <Title headingLevel="h2">Demo content wrapped in error boundary</Title>
        </CardHeader>
        <CardBody>This is a demo content that may throw an error:</CardBody>
        <CardFooter>
          <Button className="pf-v6-u-mt-lg" variant="danger" onClick={() => setHasError(true)}>
            Click to throw an error
          </Button>
        </CardFooter>
      </Card>
    );
  };

  return (
    <>
      <ErrorBoundary errorTitle="Something wrong happened">
        <Surprise />
      </ErrorBoundary>
      {hasError && (
        <Button className="pf-v6-u-mt-lg" variant="secondary" onClick={() => window.location.reload()}>
          Reload page
        </Button>
      )}
    </>
  );
};
