import { Fragment, useState } from 'react';
import { Button } from '@patternfly/react-core';
import Tearsheet from '@patternfly/react-component-groups/dist/dynamic/Tearsheet';
import TearsheetHeader from '@patternfly/react-component-groups/dist/dynamic/TearsheetHeader';
import TearsheetBody from '@patternfly/react-component-groups/dist/dynamic/TearsheetBody';
import TearsheetFooter from '@patternfly/react-component-groups/dist/dynamic/TearsheetFooter';

export const TearsheetStacked: React.FunctionComponent = () => {
  const [ isTearsheetOpen, setIsTearsheetOpen ] = useState(false);
  const [ isStack1TearsheetOpen, setIsStack1TearsheetOpen ] = useState(false);
  const [ isStack2TearsheetOpen, setIsStack2TearsheetOpen ] = useState(false);

  const toggleTearsheet = (_event: React.MouseEvent<Element, MouseEvent> | KeyboardEvent | MouseEvent) => {
    setIsTearsheetOpen(!isTearsheetOpen);
  };
  const toggleStack1Tearsheet = (_event: React.MouseEvent<Element, MouseEvent> | KeyboardEvent | MouseEvent) => {
    setIsStack1TearsheetOpen(!isStack1TearsheetOpen);
  };
  const toggleStack2Tearsheet = (_event: React.MouseEvent<Element, MouseEvent> | KeyboardEvent | MouseEvent) => {
    setIsStack2TearsheetOpen(!isStack2TearsheetOpen);
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
        <TearsheetHeader title="Tearsheet Header (stack 0)" labelId="basic-modal-title=0" />
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
          <Button variant="secondary" onClick={toggleStack1Tearsheet}>
            Show Tearsheet (stacked 1)
          </Button>
          <Button key="cancel" variant="link" onClick={toggleTearsheet}>
            Cancel
          </Button>
        </TearsheetFooter>
      </Tearsheet>
      <Tearsheet
        isOpen={isStack1TearsheetOpen}
        stackLevel={1}
        onClose={(e: React.MouseEvent<Element, MouseEvent> | KeyboardEvent | MouseEvent) => toggleStack1Tearsheet(e)}
      >
        <TearsheetHeader title="Tearsheet Header (stack 1)" labelId="basic-modal-title-1" />
        <TearsheetBody>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </TearsheetBody>
        <TearsheetFooter>
          <Button key="confirm" variant="primary" onClick={toggleStack1Tearsheet}>
            Confirm
          </Button>
          <Button variant="secondary" onClick={toggleStack2Tearsheet}>
            Show Tearsheet (stacked 2)
          </Button>
          <Button key="cancel" variant="link" onClick={toggleStack1Tearsheet}>
            Cancel
          </Button>
        </TearsheetFooter>
      </Tearsheet>
      <Tearsheet
        isOpen={isStack2TearsheetOpen}
        stackLevel={2}
        onClose={(e: React.MouseEvent<Element, MouseEvent> | KeyboardEvent | MouseEvent) => toggleStack2Tearsheet(e)}
      >
        <TearsheetHeader title="Tearsheet Header (stack 2)" labelId="basic-modal-title-2" />
        <TearsheetBody>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </TearsheetBody>
        <TearsheetFooter>
          <Button key="confirm" variant="primary" onClick={toggleStack2Tearsheet}>
            Confirm
          </Button>
          <Button key="cancel" variant="link" onClick={toggleStack2Tearsheet}>
            Cancel
          </Button>
        </TearsheetFooter>
      </Tearsheet>
    </Fragment>
  );
};
