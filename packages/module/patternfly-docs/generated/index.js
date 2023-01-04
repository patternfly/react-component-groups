module.exports = {
  '/extensions/extended-components/design-guidelines': {
    id: "extended-components",
    title: "extended-components",
    toc: [{"text":"Header"},[{"text":"Sub-header"}]],
    section: "extensions",
    source: "design-guidelines",
    Component: () => import(/* webpackChunkName: "extensions/extended-components/design-guidelines/index" */ './extensions/extended-components/design-guidelines')
  },
  '/extensions/extended-components/react': {
    id: "extended-components",
    title: "extended-components",
    toc: [{"text":"Basic usage"},[{"text":"Example"},{"text":"Fullscreen example"}]],
    examples: ["Example"],
    fullscreenExamples: ["Fullscreen example"],
    section: "extensions",
    source: "react",
    Component: () => import(/* webpackChunkName: "extensions/extended-components/react/index" */ './extensions/extended-components/react')
  }
};