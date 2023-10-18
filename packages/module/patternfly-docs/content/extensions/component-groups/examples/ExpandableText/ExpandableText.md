---
section: extensions
subsection: Component groups
id: Expandable text
source: react
propComponents: ['ExpandableText', 'ExpandableTextCustomButtonProps']
---

import ExpandableText from "@patternfly/react-component-groups/dist/dynamic/ExpandableText";

## Component usage

The **expandable text** component enables you to truncate text and allow users to display the full text by selecting a button. 

### Basic ExpandableText component

A basic expandable text component truncates text and displays a button below the truncated text. Users can view the full text by selecting the button, which toggles expansion.

```js file="./ExpandableTextExample.tsx"

```

### ExpandableText component with inline text

This is an example of a ExpandableText component with inline text. It will truncate the text and display the full text when the button is clicked. The button will be display inline with the text and will toggle the text.

```js file="./ExpandableTextInlineExample.tsx"

```

### With custom button text

You can customize the button text to fit your needs with the `customButton` property. 

The following example customizes the text to change when expanded and collapsed.


```js file="./ExpandableTextCustomLinkButtonExample.tsx"

```

### With a custom button

You can use a custom button to adjust the appearance, style, and variation of the expansion toggle.

```js file="./ExpandableTextCustomButtonExample.tsx"

```

### Without a button

You can remove the button to instead allow users to toggle full text by hovering over the truncated text.

To enable expansion on hover, use the `expandOnMouseOver` and `hideExpandText` properties.

```js file="ExpandableTextNoButtonExample.tsx"

```
