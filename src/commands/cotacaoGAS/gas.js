const Command = require("../../structures/Command");
const axios = require("axios");
const { MessageEmbed } = require("discord.js");

const includes = {
  api: axios.create({
    baseURL: process.env.API_GAS,
    params: {
      params: {
        utm_source: "gasnow-fetcher",
      },
    },
  }),
};

module.exports = class extends Command {
  constructor(client) {
    super(client, {
      name: "gas",
      description: "Consultar a cotação do GAS",
    });
  }

  run = async (interaction) => {
    const { api } = includes;

    let gasResult = await api.get("data");

    let rapid = gasResult.data.data.rapid / 10 ** 9;
    let standard = gasResult.data.data.standard / 10 ** 9;
    let fast = gasResult.data.data.fast / 10 ** 9;
    let slow = gasResult.data.data.slow / 10 ** 9;

    rapid = Number(rapid).toFixed();
    standard = Number(standard).toFixed();
    fast = Number(fast).toFixed();
    slow = Number(slow).toFixed();

    const embed = new MessageEmbed()
      .setColor("#0099ff")
      .setTitle("Valor do Gás")
      .setAuthor(interaction.user.username)
      .addFields(
        { name: `⚡ Rapid: 15s`, value: `${rapid} Gwei` },
        { name: `🚗 Fast: 1min`, value: `${fast} Gwei` },
        { name: `🚲 Standard: 3min`, value: `${standard} Gwei` },
        { name: `🐌 Slow: 10min`, value: `${slow} Gwei` }
      )
      .setFooter("|", interaction.user.displayAvatarURL())
      .setDescription(`Caso não saiba o que é o Gás, digite /hgas`)
      .setTimestamp();

    await interaction.reply({ embeds: [embed], ephemeral: true });
  };
};
