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
    html: true,   // ✅ HTML report opens directly
    json: true
  },
  e2e: {
    baseUrl: "https://www.saucedemo.com",
    video: true,
    screenshotOnRunFailure: true,
    screenshotOnRunAlways: true, // ✅ take screenshot for every test
    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);
      return config;
    }
  }
});
