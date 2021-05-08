const glob = require("glob");
const path = require("path");
const chalk = require("chalk");

module.exports = function (client, directory) {
    const commands = glob.sync(directory + "**/**/*.js");


    for (let file of commands) {
        let x = require(path.resolve(file));

        if (x.name) {
            client.commands.set(x.name, x);
        } else {
            continue;
        }


        if (x.aliases && Array.isArray(x.aliases)) x.aliases.forEach(a => client.aliases.set(a, x.name));

        console.log(chalk.blue("Handler | Command Loaded"));
    };
};
