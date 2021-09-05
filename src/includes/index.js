require("dotenv").config();
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { Client, Intents } = require("discord.js");
const fs = require("fs");

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const cmdsDir = "./components/commands/";
const slashCommands = [];

fs.readdirSync(cmdsDir).filter((file) => {
  if (!file.endsWith(".js")) return;

  const command = require(`${cmdsDir}/${file}`);

  if (!command.data) return;
  slashCommands.push(command.data.toJSON());
});

const rest = new REST({ version: "9" }).setToken(process.env.DISCORD_TOKEN);
(async () => {
  try {
    console.log("Inicio da requisição do REST.");
    await rest.put(
      Routes.applicationGuildCommands(
        process.env.DISCORD_CLIENT,
        process.env.DISCORD_GUILD
      ),
      {
        body: slashCommands,
      }
    );

    console.log("Requisição foi feita !");
  } catch (error) {
    console.log("Aconteceu um errinho:", error);
  }
})();

client.once("ready", async () => {
  console.log("Opa, acordei de um longo sono ...");
});

client.on("interactionCreate", async (i) => {
  if (!i.isCommand()) return;
try {
    
} catch (error) {
    console.log("Eita, achei um error: ", error);
}

});

client.login(process.env.DISCORD_TOKEN);