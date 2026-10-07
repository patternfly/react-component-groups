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
        titleText="Title text"
        descriptionText="This modal renders whatever content you pass in — no built-in chart required."
        contentAriaLabel="Feature list"
        customContent={(
          <Content>
            <p>This plan includes:</p>
            <List>
              <ListItem>Unlimited dashboards</ListItem>
              <ListItem>Priority support</ListItem>
              <ListItem>Single sign-on</ListItem>
            </List>
          </Content>
        )}
        primaryAction={{ label: 'CTA text', onClick: () => alert('Upgraded!') }}
      />
    </>
  );
};
