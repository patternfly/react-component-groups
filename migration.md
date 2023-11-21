# Frontend components -> patternfly/react-component-groups migration
​
This migration guide covers all components that have been moved from the Insights repository to the new PatternFly “React component groups” extension. The API changes resulting from this migration will affect aspects of each component’s usage implementation. This guide outlines these changes and provides solutions for replicating your previous implementation.
​
The guide should be applicable when migrating from frontend-components **version 3.8.0 and later**. Please be aware that `frontend-components` version 4 included an upgrade to PatternFly 5, which brought changes to CSS class names and the DOM representation of components.Although this did not change the API of individual components or their visual appearance, their DOM representation may be slightly different.
​
## Ansible
​
- The disabled color for “Ansible unsupported” has been changed from `--pf-v5-global--disabled-color--200` to `--pf-v5-global--disabled-color--100` in order to comply with PatternFly guidelines
​
  **SOLUTION:** use the `className` property if you need a custom color
​
​
## Battery
​
- No action required
​
​
## ErrorState
​
- The default error description *“If the problem persists, contact [Red Hat Support](https://access.redhat.com/support) or check our [status page](https://status.redhat.com) for known outages.”* has been removed. 
​
  **SOLUTION:** pass a default value using the new `defaultErrorDescription` property
​
​
## ErrorBoundary
​
- The removal of the default error description from `ErrorState` *“If the problem persists, contact [Red Hat Support](https://access.redhat.com/support) or check our [status page](https://status.redhat.com) for known outages.”* also affected this component. 
​
  **SOLUTION:** pass a default value using the new `defaultErrorDescription` property
​
​
## ErrorStack
​
- `overflowWrap: 'break-word'` styling change has been made to the component
​
  **SOLUTION:** use the `className` property for custom styling
​
​
## NotAuthorized
​
- The default error description *“Contact your organization administrator(s) for more information or visit [My User Access](./iam/my-user-access) to learn more about your permissions.”* has been removed. 
​
  **SOLUTION:** pass a default value using the new `description` property 
​
​
- The `actions` property has been divided into `primaryAction` (there should be only one for any given screen) and `secondaryActions`
​
  **SOLUTION:** use the new properties for primary and secondary actions 
​
​
## InvalidObject
​
- The logic automatically persisting the `/beta` URL section for *“Go to home page”* target has been removed. 
​
  **SOLUTION:** handle `/beta` in your URL on your own and pass a final URL using the new `toLandingPageUrl` property
​
​
## SkeletonTable
​
- No action required
​
​
## TagCount
​
- The tag icon size is set to `md` by default instead of `lg` the previous default 
​
  **SOLUTION:** use the new `iconSize` property to customize icon size
​
  ***Note:*** if you migrate from Insights FEC version 3.x.x you may not be affected
​
​
- The `onTagClick` property has been renamed to `onClick`
​
  **SOLUTION:** use the new `onTagClick` property
​
​
## Unavailable (renamed to UnavailableContent)
​
- The default status page URL ([https://status.redhat.com](https://status.redhat.com)) has been removed
​
  **SOLUTION:** use the new `statusPageUrl` property to pass in your custom URL