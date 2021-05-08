const chalk = require("chalk");

module.exports = {
    token: {
        undefined: chalk.red("Token of undefined"),
        invalid: chalk.red("Token Invalid or Connection Timed out")
    },
    directory: {
        command: chalk.red("No directory was provided - loadCommands"),
        event: chalk.red("No directory was provided - loadEvents")
    },
    config: chalk.red("No directory was provided - config"),
    
};
