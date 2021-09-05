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
      name: "eth",
      description: "Consultar a cotação do Ethereum",
    });
  }

  run = async (interaction) => {
    const { api } = includes;

    let result = await api.get("/ethereum")
    let ethFormat = result.data["market_data"]["current_price"]["brl"].toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
    let porcentagem = result.data["market_data"]["price_change_percentage_24h_in_currency"]["brl"]

    porcentagem = porcentagem.toString().slice(0, 5)

    const embed = new MessageEmbed()
    .setTitle("Valor do Ethereum hoje")
    .setColor("RANDOM")
    .addField(`1 ETH é igual à ${ethFormat}`, "_ _")
    .addField("Oscilação nas últimas 24 horas: ", porcentagem.startsWith("-") ? `teve ${porcentagem.toString().replace("-", "")}% de queda` :  `teve ${porcentagem.toString().replace("-", "")}% de aumento`)
    .setTimestamp()
    
    await interaction.reply({embeds: [embed], ephemeral: true});
  };
};