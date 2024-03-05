import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    viewportHeight: 1024,
    viewportWidth: 1400,
    screenshotOnRunFailure: false,
    reporter: "junit",
    reporterOptions: {
      mochaFile: "results/my-test-output-[hash].xml",
      toConsole: true
    },
  },
});
