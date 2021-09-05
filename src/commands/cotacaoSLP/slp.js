const Command = require("../../structures/Command");
const axios = require("axios");
const { MessageEmbed } = require("discord.js");

const includes = {
  api: axios.create({
    baseURL: process.env.API_COINGECKO,
    params: {
      localization: false,
      tickers: false,
      market_data: true,
      community_data: false,
      developer_data: false,
      sparkline: false,
    },
  })
};

module.exports = class extends Command {
  constructor(client) {
    super(client, {
      name: "slp",
      description: "Consultar a cotação do SLP",
    });
  }

  run = async (interaction) => {
    const { api } = includes;

    let result = await api.get("/smooth-love-potion")
    let slpFormat = result.data["market_data"]["current_price"]["brl"].toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
    let porcentagem = result.data["market_data"]["price_change_percentage_24h_in_currency"]["brl"]

    porcentagem = porcentagem.toString().slice(0, 6)

    const embed = new MessageEmbed()
    .setTitle("Valor de SLP hoje")
    .setColor("RANDOM")
    .addField(`1 SLP é igual à ${slpFormat}`, "_ _")
    .addField("Oscilação nas últimas 24 horas: ", porcentagem.startsWith("-") ? `teve ${porcentagem.toString().replace("-", "")}% de queda` :  `teve ${porcentagem.toString().replace("-", "")}% de aumento`)
    .setTimestamp()
    
    await interaction.reply({embeds: [embed], ephemeral: true});
  };
};