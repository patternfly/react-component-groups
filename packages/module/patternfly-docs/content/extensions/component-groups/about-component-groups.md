---
section: Component groups
id: About component groups
sortValue: 1
sourceLink: https://github.com/patternfly/react-component-groups/blob/main/packages/module/patternfly-docs/content/extensions/component-groups/about-component-groups.md
--- 
import { SectionGallery } from '@patternfly/documentation-framework/components/sectionGallery/sectionGallery';
import galleryData from './gallery-data.json';

Component groups lives in its own package [`@patternfly/react-component-groups`](https://www.npmjs.com/package/@patternfly/react-component-groups) 

**Note:** This extension replaces [`RedHatInsights/frontend-components`](https://github.com/RedHatInsights/frontend-components). If you previously used `frontend-components`, you can refer to [this migration guide](https://github.com/patternfly/react-component-groups/blob/main/migration.md) to help you transition to `react-component-groups`.

# Component groups

The component groups extension contains a range of React components that are more complex than basic PatternFly components. These component groups combine and adjust multiple base components to provide opinionated solutions for recurring use cases across products using PatternFly.

The creation and maintenance of this extension is a collaborative effort between the PatternFly and Red Hat Hybrid Cloud Console teams. All component groups receive accessibility and design reviews, and we are working to improve internationalization, add test coverage, and ensure that CSS overrides all correctly reference the PatternFly CSS API.

There are a few different functional categories of component groups:

<SectionGallery
  section="Component groups"
  galleryItemsData={galleryData}
  placeholderText="Search component groups by name"
  includeSubsections={true}
  hasGridText={true}
  isFullWidth={false}
/>

## Contribution guidelines

The code for component groups lives in the [`patternfly/react-component-groups repository`](https://github.com/patternfly/react-component-groups).

Specific contribution guidelines and instructions are outlined in [the component groups GitHub README](https://github.com/patternfly/react-component-groups#readme).

### Reporting bugs and requesting new features

We aim to align the standards of component groups as closely as possible with existing PatternFly standards. Given that this is a multi-team collaboration, we will continue to work towards this goal together.

If you notice a bug or have a suggestion for a new component group, open an issue in our [GitHub repository](https://github.com/patternfly/react-component-groups/issues)! Please make sure to check if there is already a pre-existing issue before creating a new one. 
