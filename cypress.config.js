const { defineConfig } = require("cypress");
const fs = require("fs");
const path = require("path");

module.exports = defineConfig({
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    reportDir: "cypress/reports",
    overwrite: false,
    charts: true,
    reportPageTitle: "Cypress E2E Test Report",
    embeddedScreenshots: true,    // embeds screenshots inside HTML
    inlineAssets: true,            // embeds CSS/JS/images
    html: true,
    json: true,
    videoEmbed: true               // ✅ embed videos inside HTML
  },
  e2e: {
    baseUrl: "https://www.saucedemo.com",
    video: true,
    screenshotOnRunFailure: true,
    screenshotOnRunAlways: true,
    setupNodeEvents(on, config) {
      const mochawesome = require("cypress-mochawesome-reporter/plugin");
      mochawesome(on);

      // Copy videos and screenshots to report folder
      on("after:run", async (results) => {
        const reportDir = path.join(config.projectRoot, "cypress/reports");

        // Videos
        if (results && results.video) {
          const videoDest = path.join(reportDir, "videos");
          if (!fs.existsSync(videoDest)) fs.mkdirSync(videoDest, { recursive: true });
          fs.copyFileSync(results.video, path.join(videoDest, path.basename(results.video)));
        }

        // Screenshots
        if (results && results.screenshots && results.screenshots.length) {
          const screenshotDest = path.join(reportDir, "screenshots");
          if (!fs.existsSync(screenshotDest)) fs.mkdirSync(screenshotDest, { recursive: true });
          results.screenshots.forEach(screenshot => {
            fs.copyFileSync(screenshot.path, path.join(screenshotDest, path.basename(screenshot.path)));
          });
        }
      });

      return config;
    }
  }
});
