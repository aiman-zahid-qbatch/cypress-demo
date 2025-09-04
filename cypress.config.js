const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    reportDir: "cypress/reports",
    overwrite: false,
    charts: true,
    reportPageTitle: "Sauce Demo E2E",
    embeddedScreenshots: true,
    inlineAssets: true,
    videoOnFailOnly: false,
    saveAllAttempts: false,
    html: true,
    json: true
  },
  e2e: {
    baseUrl: "https://www.saucedemo.com",
    video: true,
    videoCompression: 32,
    videosFolder: "cypress/videos",
    screenshotOnRunFailure: true,
    screenshotsFolder: "cypress/screenshots",
    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);
      return config;
    }
  }
});
