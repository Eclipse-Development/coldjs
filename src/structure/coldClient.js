const { Client, Collection } = require("discord.js");
const commandHandler = require("./commandHandler");
const chalk = require("chalk");
const eventHandler = require("./eventHandler");

module.exports = class coldClient extends Client {
    constructor() {
        super({
            messageCacheMaxSize: 1

        });

        /**
         * Discord.js lib
         * {discord}
         */
        this.discord = require("discord.js");

        /**
         * Custom Errors
         * {error}
         */

        this.error = require("../errors/common");

        /**
         * Wrapper for interacting with mongoDB
         * {mongoose}
         */
        this.mongoose = require("mongoose");

        /**
         * Config
         * {config}
         */
        this.config = {
            prefix: [],
            defaultCooldown: 0,
            blacklist: [],
            developer: [],
            messageCooldown: ""
        };

        /**
         * Collections
         */
        this.commands = new Collection;
        this.aliases = new Collection;
        this.cooldowns = new Collection;
    };

    /**
     * Secret Client Token
     * @param {String} token 
     */
    start(token) {

        if (!token) throw new ReferenceError(this.error.token.undefined);

        this.login(token).catch(x => {
            console.log(this.error.token.invalid);
        });

        this.on("ready", async () => {
            console.log(chalk.green("Ready   | " + this.user.tag));
            console.log(chalk.green("Guild   | Total [" + this.guilds.cache.size + "]"));
            console.log(chalk.cyan("Command | Total [" + this.commands.size + "]"))
        });
    
        process.on("uncaughtException", async (error) => {
            require("../events/errors")(error);
        });

        process.on("unhandledRejection", async (error) => {
            require("../events/errors/unhandledRejection")(error);
        });
    };

    /**
     * @param {Parameters} directory 
     */

    loadCommands(directory) {

        if (!directory) throw new Error(this.error.directory.command);

        const cmdHandler = new commandHandler();
        cmdHandler.load(this, directory);
    };

    /**
     * @param {Parameters} directory 
     */

    loadEvents(directory) {

        if (!directory) throw new Error(this.error.directory.event);

        const evtHandler = new eventHandler();
        evtHandler.load(this, directory);
    };

    /**
     * @param {Parameters} config
     */

    setConfig(config) {
        this.config = config;

        return this;
    };

    /**
     * Loads the message event to execute commands
     */

    defaultExecute() {

        this.on("message", async message => {
            require("../events/cmdExecute")(this, message);
        });

        console.log(chalk.cyan("Execute | Loaded"));
    };
};
