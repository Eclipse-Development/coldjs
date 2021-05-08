const glob = require("glob");
const path = require("path");
const chalk = require("chalk");

module.exports = function (client, directory) {

  const events = glob.sync(directory + "**/*.js");

  for (const load of events) {
    const event = require(path.resolve(load));

    if (!event.run) {
      throw new Error(chalk.redBright("Cannot execute a Event without run function"));
    };

    client.on(event.name, event.run.bind(null, client));
  };

  console.log(chalk.blue("Handler | Event Loaded"));
};
