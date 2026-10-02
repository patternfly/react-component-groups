import React, { useState } from 'react';
import { Button, Content, List, ListItem } from '@patternfly/react-core';
import { ProductNudgeDataModal } from '@patternfly/react-component-groups/dist/dynamic/ProductNudge';

// `customContent` replaces the built-in match/ecosystem charts entirely — it accepts any
// caller-supplied content, not just a different chart.
export const ProductNudgeCustomContentExample: React.FunctionComponent = () => {
  const [ isOpen, setIsOpen ] = useState(false);

  return (
    <>
      <Button variant="primary" onClick={() => setIsOpen(true)}>
        Open custom content modal
      </Button>
      <ProductNudgeDataModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        titleText="What's included with Acme Pro"
        descriptionText="This modal renders whatever content you pass in — no built-in chart required."
        contentAriaLabel="Acme Pro feature list"
        customContent={(
          <Content>
            <p>Acme Pro includes:</p>
            <List>
              <ListItem>Unlimited dashboards</ListItem>
              <ListItem>Priority support</ListItem>
              <ListItem>Single sign-on</ListItem>
            </List>
          </Content>
        )}
        primaryAction={{ label: 'Upgrade now', onClick: () => alert('Upgraded!') }}
      />
    </>
  );
};
