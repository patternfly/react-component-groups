import React from 'react';
import { AutoLinkHeader, Example, Link as PatternflyThemeLink } from '@patternfly/documentation-framework/components';
import { ExtendedButton } from "@patternfly/extended-components";
const pageData = {
  "id": "extended-components",
  "section": "extensions",
  "source": "react",
  "slug": "/extensions/extended-components/react",
  "sourceLink": "https://github.com/patternfly/patternfly-react/blob/main/packages/module/patternfly-docs/content/extensions/extended-components/examples/basic.md",
  "propComponents": [
    {
      "name": "ExtendedButton",
      "description": "",
      "props": [
        {
          "name": "children",
          "type": "React.ReactNode",
          "description": "Content to render inside the extended button component"
        }
      ]
    }
  ],
  "examples": [
    "Example"
  ],
  "fullscreenExamples": [
    "Fullscreen example"
  ]
};
pageData.liveContext = {
  ExtendedButton
};
pageData.relativeImports = {
  
};
pageData.examples = {
  'Example': props => 
    <Example {...pageData} {...props} {...{"code":"import React from 'react';\nimport { ExtendedButton } from '@patternfly/extended-components';\n\nexport const BasicExample: React.FunctionComponent = () => <ExtendedButton>My custom extension button</ExtendedButton>;\n","title":"Example","lang":"js"}}>
      
    </Example>,
  'Fullscreen example': props => 
    <Example {...pageData} {...props} {...{"code":"import React from 'react';\nimport { ExtendedButton } from '@patternfly/extended-components';\n\nexport const BasicExample: React.FunctionComponent = () => <ExtendedButton>My custom extension button</ExtendedButton>;\n","title":"Fullscreen example","lang":"js","isFullscreen":true}}>
      
    </Example>
};

const Component = () => (
  <React.Fragment>
    <AutoLinkHeader {...{"id":"basic-usage","size":"h2","className":"ws-title ws-h2"}}>
      {`Basic usage`}
    </AutoLinkHeader>
    {React.createElement(pageData.examples["Example"])}
    {React.createElement(pageData.examples["Fullscreen example"])}
  </React.Fragment>
);
Component.displayName = 'ExtensionsPatternflyExtensionSeedReactDocs';
Component.pageData = pageData;

export default Component;
