require("dotenv").config();

const chalk = require("chalk");
// require('better-logging')(console, {
//     saveToFile: `./logs/log - ${Date.now()}.log`,
//     color: {
//         base: chalk.greenBright,
//         type: {
//             debug: chalk.cyan,
//             info: chalk.blue,
//             warn: chalk.yellow,
//             log: chalk.gray,
//             error: chalk.red
//         }
//     }
// });

const Client = require("./src/structures/Client");

const client = new Client({
  intents: [
    "GUILDS",
    "GUILD_MESSAGE_REACTIONS",
    "GUILD_MESSAGES",
    "GUILD_INVITES",
    "GUILD_VOICE_STATES",
    "GUILD_MEMBERS",
    "GUILD_PRESENCES",
  ],
});

client.login(process.env.DISCORD_TOKEN);

const PORT = process.env.PORT || 8080;
client.on("ready", () => {
  const api = require("./src/server/app");
  api.listen(PORT, () => {
    console.log("Servidor OPEN!");
  });
});

module.exports = client;
