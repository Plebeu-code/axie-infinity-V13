const Commands = require("../../structures/Command");
const cartas = require("../../includes/cartas.json");
const {
  MessageEmbed,
  MessageActionRow,
  MessageSelectMenu,
  MessageButton,
} = require("discord.js");

function createEmbed(card, total, index = 0) {

  let embed = new MessageEmbed()
    .setTitle(card.nome)
    .setColor("RANDOM")
    .setDescription(card.desc)
    .setImage(card.img)

  if (total == 1) embed.setAuthor(`Eu encontrei está carta:`)
  else embed.setAuthor(`Eu encontrei as seguintes cartas: ${index + 1}/${total}`)

  return embed;

}

async function searchFor(result, interaction) {

  if (result.length == 0) return await interaction.reply({ content: "Eu não achei nenhum Axie com este nome :(", ephemeral: true })

  if (result.length == 1) {

    await interaction.channel.send({ embeds: [createEmbed(result[0], 1)] });

    await interaction.reply("_ _");

    return await interaction.deleteReply();

  }

  const row = new MessageActionRow().addComponents(
    new MessageButton()
      .setCustomId("before")
      .setLabel("< Anterior")
      .setStyle("PRIMARY"),
    new MessageButton()
      .setCustomId("stopSearch")
      .setLabel("Terminar Busca")
      .setStyle("DANGER"),
    new MessageButton()
      .setCustomId("next")
      .setLabel("Próximo >")
      .setStyle("PRIMARY")
  )

  let index = 0;
  let embed = createEmbed(result[index], result.length)

  const message = await interaction.channel.send({ embeds: [embed], components: [row] })
  const collector = message.createMessageComponentCollector({ componentType: 'BUTTON', time: 60 * 1000 })

  await interaction.reply("_ _");
  await interaction.deleteReply()

  collector.on("collect", async i => {
    if (!i.isButton()) return

    if (i.customId === "before") {
      index--
      if (index == -1) index = result.length - 1
      embed = createEmbed(result[index], result.length, index)
      await i.update({ embeds: [embed] })
    }
    if (i.customId === "stopSearch") {
      await i.deferUpdate()
      collector.stop()
    }
    if (i.customId === "next") {
      index++
      if (index > result.length - 1) index = 0
      embed = createEmbed(result[index], result.length, index)
      await i.update({ embeds: [embed] })
    }
  })

  collector.on("end", () => message.delete())

}

module.exports = class extends Commands {
  constructor(client) {
    super(client, {
      name: "procurarcarta",
      description: "Procurar a carta que deseja.",
      options: [{
        name: "nome",
        type: "STRING",
        description: "Defina o nome do Axie que está procura !",
        required: true,
      }]
    });
  }

  run = async (interaction) => {

    const cards = Object.values(cartas)

    let result = cards.filter(value => value.nome.toLowerCase().indexOf(interaction.options.getString("nome").toLowerCase()) > -1)

    await searchFor(result, interaction)

  }
};
