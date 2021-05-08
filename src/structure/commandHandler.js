const chalk = require("chalk");

module.exports = class commandHandler {
    constructor() {};

    load(client, directory) {
        if (!directory) throw new Error(chalk.orange("Error: Command Handler directory is not defined."));

        const handlers = [
            "command"
        ]

        handlers.forEach(x => {
            require(`../handlers/` + x)(client, directory);
        });
    };
};