const { Collection } = require("discord.js");


module.exports = async function (client, message) {

    let prefixes = client.config.prefix;
    /**
     * If prefixes undefined sets the default ["c!"]
     */
    if (prefixes === undefined) {
        prefixes = ["c!"];
    };

    let blacklist = client.config.blacklist;
    /**
     * If blacklist undefined sets the default one to prevent error
     */
    if (blacklist === undefined) {
        blacklist = ["123456789"];
    };

    /**
     * Check if the user is in blacklist or not and returns.
     */

    if (client.config.blacklist.includes(message.author.id)) {
        return;
    };

    /**
     * If the author is bot it will return
     */

    if (message.author.bot) {
        return;
    };

    /**
     * If message is in dm it will return
     */

    if (message.channel.type === "dm") {
        return;
    };

    /**
     * If message conent isn't start with it will return
     */
    const prefix = prefixes.find(x => message.content.toLowerCase().startsWith(x));
    if (!prefix) return;

    /**
     * If member isn't find it will fetch it
     */

    if (!message.member) message.member = await message.guild.fetchMember(message);

    /**
     * Argurement
     */

    const args = message.content.slice(prefix.length).trim().split(/ +/g);

    /**
     * x shifts the args
     */

    const x = args.shift().toLowerCase();

    /**
     * If length 0 returns
     */

    if (x.length === 0) {
        return;
    }

    /**
     * Gets the command
     */

    let command = client.commands.get(x);

    /**
     * If command isn't found by name it will get from aliases
     */
    if (!command) command = client.commands.get(client.aliases.get(x));

    /**
     * If command isn't found it will return
     */

    if (!command) return;

    if (!client.cooldowns.has(command.name)) {
        client.cooldowns.set(command.name, new Collection());
    };

    /**
     * If developer true it will check the author id. If not matched will return
     */

    if (command.developer === true) {
        if (!client.config.developer.includes(message.author.id)) {
            return;
        };
    };

    /**
     * Command Cooldown
     */

    const now = Date.now();
    const time = client.cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || client.config.defaultCooldown) * 1000;

    if (time.has(message.author.id)) {
        const ex = time.get(message.author.id) + cooldownAmount;

        if (Date.now() < ex) {
            const left = (ex - Date.now()) / 1000;

            if (client.config.messageCooldown === null) {
                return;
            } else {
                var text = client.config.messageCooldown
                if (text === undefined) {
                    return;
                } else {
                    text = text.replace("{time}", left.toFixed(1));
                };

                return message.channel.send(text);
            };
        }
    }

    time.set(message.author.id, now);
    setTimeout(() => time.delete(message.author.id), cooldownAmount);

    /**
     * Runs the command
     */

    if (command)
        command.run(client, message, args);
};
