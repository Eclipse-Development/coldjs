<div align="center">
  <br />
  <p>
    <a href="#"><img src="./assets/logo.png" width="546" alt="coldjs" /></a>
  </p>
  <br />
  <p>
    <a href="https://www.npmjs.com/package/coldjs"><img src="https://nodei.co/npm/coldjs.png?downloads=true" alt="npm installnfo" /></a>
  </p>
</div>


# What is coldJS?

A user friendly wapper of discord.js lib for a fresh start in bot developing.


## What we have?
- Easy command handler
- Easy event handler
- Easy setup
- Default command execute
- Colorful console

## Installation

*coldjs*  
`npm install coldjs`

*discord.js*

`npm install discord.js`

Requires Node 12+ and Discord v12

# Getting Started

```js
const { coldClient } = require("coldjs");
const client = new coldClient();

client.start("your token");
```
# Command Handler
## loadCommands
```js
const { coldClient } = require("coldjs");
const client = new coldClient();

client.start("your token");
client.loadCommands("./commands/"); // Supports subfolder
```
## How to execute?
```js
module.exports = {
    name: "",
    description: "",
    aliases: [],
    usage: "",
    category: "",
    cooldown: 0,

    run: async (client, message, args) => {
        // Rest of your code
    },
};
```

# Event Handler
## loadEvents
```js
const { coldClient } = require("coldjs");
const client = new coldClient();

client.start("your token");
client.loadEvents("./events/"); // Supports subfolder
```
## How to execute?
```js
module.exports = {
    name: "",

    async run () {
        // Rest of your code
    },
};
```
# Configuration
## defaultExecute
```js
// Execute your commands by default
const { coldClient } = require("coldjs");
const client = new coldClient();

client.start("your token");
client.loadCommands("./commands/")
client.defaultExecute(); // If you want to make custom one then you can skip

```
## setConfig
```js
const { coldClient } = require("coldjs");
const client = new coldClient();

client.start("your token");
client.loadCommands("./commands/")
client.defaultExecute();

client.setConfig({
    prefix: ["c!",],
    defaultCooldown: 5,
    blacklist: ["1", "2"],
    developer: ["1", "2"],
    messageCooldown: "You have to wait {time} before using the command!"
});
```
# Issues
It's common for you to face issues as because it is the first version that released. If you find any feel free to submit and it will be fixed on next release.
