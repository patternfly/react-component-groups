import { Fragment, FunctionComponent } from 'react';
import StaleDataWarning from '@patternfly/react-component-groups/dist/dynamic/StaleDataWarning';
import { Stack, StackItem } from '@patternfly/react-core';

export const CustomizedRenderExample: FunctionComponent = () => {
  const staleDate = new Date('Sun Jan 26 2020');
  const warningDate = new Date('Mon Feb 15 2025');
  const cullingDate = new Date('Fri Feb 20 2025');
  return (
    <>
      <Stack>
        <StackItem>
          <StaleDataWarning
            stale={staleDate}
            currDate={new Date()}
            culled={cullingDate}
            staleWarning={warningDate}
            render={({ msg }) => <Fragment>{msg}</Fragment>}
          ></StaleDataWarning>
        </StackItem>

        <StackItem>
          <StaleDataWarning
            stale={staleDate}
            currDate={new Date()}
            culled={new Date('Fri Feb 07 2024')}
            staleWarning={new Date('Mon Feb 03 2024')}
            render={() => <Fragment>This is an error message where the item is overdue</Fragment>}
          ></StaleDataWarning>
        </StackItem>
      </Stack>
    </>
  );
};
