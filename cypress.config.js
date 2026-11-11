const { defineConfig } = require("cypress");
const { addMatchImageSnapshotPlugin } = require("@simonsmith/cypress-image-snapshot/plugin");

module.exports = defineConfig({
  reporter: "cypress-multi-reporters",
  reporterOptions: {
    reporterEnabled: "cypress-mochawesome-reporter, mocha-junit-reporter",
    cypressMochawesomeReporterReporterOptions: {
      charts: true,
      embeddedScreenshots: true,
      inlineAssets: true,
    },
    mochaJunitReporterReporterOptions: {
      mochaFile: "cypress/reports/junit/results-[hash].xml",
    },
  },
  e2e: {
    baseUrl: "https://practicesoftwaretesting.com",
    expose: {
      apiUrl: "https://api.practicesoftwaretesting.com",
    },
    retries: {
      runMode: 2,
      openMode: 0,
    },
    setupNodeEvents(on, config) {
      on("task", {
        log(message) {
          console.log("TASK: " + message);
          return null;
        },
      });
      require("@cypress/grep/plugin").plugin(config);
      require("cypress-mochawesome-reporter/plugin")(on);
      addMatchImageSnapshotPlugin(on);
      return config;
    },
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
});
