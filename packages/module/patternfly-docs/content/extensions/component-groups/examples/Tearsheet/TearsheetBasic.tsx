import { Fragment, useState } from 'react';
import { Button } from '@patternfly/react-core';
import Tearsheet from '@patternfly/react-component-groups/dist/dynamic/Tearsheet';
import TearsheetHeader from '@patternfly/react-component-groups/dist/dynamic/TearsheetHeader';
import TearsheetBody from '@patternfly/react-component-groups/dist/dynamic/TearsheetBody';
import TearsheetFooter from '@patternfly/react-component-groups/dist/dynamic/TearsheetFooter';

export const TearsheetBasic: React.FunctionComponent = () => {
  const [ isTearsheetOpen, setIsTearsheetOpen ] = useState(false);

  const toggleTearsheet = (_event: React.MouseEvent<Element, MouseEvent> | KeyboardEvent | MouseEvent) => {
    setIsTearsheetOpen(!isTearsheetOpen);
  };

  return (
    <Fragment>
      <Button variant="primary" onClick={toggleTearsheet}>
        Show Tearsheet
      </Button>
      <Tearsheet
        isOpen={isTearsheetOpen}
        onClose={(e: React.MouseEvent<Element, MouseEvent> | KeyboardEvent | MouseEvent) => toggleTearsheet(e)}
      >
        <TearsheetHeader title="Tearsheet Header" labelId="basic-modal-title" />
        <TearsheetBody>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </TearsheetBody>
        <TearsheetFooter>
          <Button key="confirm" variant="primary" onClick={toggleTearsheet}>
            Confirm
          </Button>
          <Button key="cancel" variant="link" onClick={toggleTearsheet}>
            Cancel
          </Button>
        </TearsheetFooter>
      </Tearsheet>
    </Fragment>
  );
};
