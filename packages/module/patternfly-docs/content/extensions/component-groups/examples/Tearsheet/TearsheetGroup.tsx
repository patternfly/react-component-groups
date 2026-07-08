import { useState } from 'react';
import { Button } from '@patternfly/react-core';
import TearsheetGroup from '@patternfly/react-component-groups/dist/dynamic/TearsheetGroup';
import Tearsheet from '@patternfly/react-component-groups/dist/dynamic/Tearsheet';
import TearsheetHeader from '@patternfly/react-component-groups/dist/dynamic/TearsheetHeader';
import TearsheetBody from '@patternfly/react-component-groups/dist/dynamic/TearsheetBody';
import TearsheetFooter from '@patternfly/react-component-groups/dist/dynamic/TearsheetFooter';

const TOTAL_TEARSHEETS = 10;

export const TearsheetGroupExample: React.FunctionComponent = () => {
  const [ openState, setOpenState ] = useState<boolean[]>(Array(TOTAL_TEARSHEETS).fill(false));

  const open = (index: number) => {
    setOpenState((prev) => {
      const next = [ ...prev ];
      next[index] = true;
      return next;
    });
  };

  const close = (index: number) => {
    setOpenState((prev) => {
      const next = [ ...prev ];
      next[index] = false;
      return next;
    });
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
        <Button variant="primary" onClick={() => open(0)}>
          Show Tearsheet
        </Button>
      </div>

      <TearsheetGroup id="tearsheet-group-demo">
        {Array.from({ length: TOTAL_TEARSHEETS }, (_, i) => (
          <Tearsheet key={i} isOpen={openState[i]} onClose={() => close(i)} aria-label={`Tearsheet ${i + 1}`}>
            <TearsheetHeader title={`Tearsheet #${i + 1}`} labelId={`tearsheet-group-title-${i}`} />
            <TearsheetBody>
              <p>
                This is tearsheet <strong>#{i + 1}</strong> of {TOTAL_TEARSHEETS}.
              </p>
              <p style={{ marginTop: '1rem' }}>
                The TearsheetGroup manages stacking automatically. Only the top 3 open tearsheets are visible in the
                stack — earlier ones hide behind and reappear as you close the ones in front.
              </p>
            </TearsheetBody>
            <TearsheetFooter>
              {i < TOTAL_TEARSHEETS - 1 && (
                <Button variant="primary" onClick={() => open(i + 1)}>
                  Open Tearsheet #{i + 2}
                </Button>
              )}
              <Button variant="link" onClick={() => close(i)}>
                Close
              </Button>
            </TearsheetFooter>
          </Tearsheet>
        ))}
      </TearsheetGroup>
    </div>
  );
};
