module.exports = {
  '/extensions/patternfly-hac-components/design-guidelines': {
    id: "patternfly-hac-components",
    title: "patternfly-hac-components",
    toc: [{"text":"Header"},[{"text":"Sub-header"}]],
    section: "extensions",
    source: "design-guidelines",
    Component: () => import(/* webpackChunkName: "extensions/patternfly-hac-components/design-guidelines/index" */ './extensions/patternfly-hac-components/design-guidelines')
  },
  '/extensions/patternfly-hac-components/react': {
    id: "patternfly-hac-components",
    title: "patternfly-hac-components",
    toc: [{"text":"Basic usage"},[{"text":"Example"},{"text":"Fullscreen example"}]],
    examples: ["Example"],
    fullscreenExamples: ["Fullscreen example"],
    section: "extensions",
    source: "react",
    Component: () => import(/* webpackChunkName: "extensions/patternfly-hac-components/react/index" */ './extensions/patternfly-hac-components/react')
  }
};