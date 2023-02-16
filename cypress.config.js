const { defineConfig } = require("cypress");
const installLogsPrinter = require("cypress-terminal-report/src/installLogsPrinter");

module.exports = defineConfig({
  chromeWebSecurity: false,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      installLogsPrinter(on, {
        printLogsToConsole: "always",
      });
    },
  },
});
