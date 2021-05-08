const chalk = require("chalk");

module.exports = class eventHandler {
    constructor() {};

    load(client, directory) {

        if (!directory) throw new Error(chalk.red("Error: Event Handler directory is not defined."));

        const handlers = [
            "event"
        ]

        handlers.forEach(x => {
            require(`../handlers/` + x)(client, directory);
        });
    };
};