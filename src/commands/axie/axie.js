const { MessageEmbed } = require("discord.js");
const { getAxieById } = require("../../requests/graphql");
const Commands = require("../../structures/Command");



module.exports = class extends Commands {
  constructor(client) {
    super(client, {
      name: "axie",
      description: "Mostra as informações do axie pelo ID.",
      options: [
        {
            name: 'id',
            type: 'INTEGER',
            description: 'Axie a ser mostrado',
            required: true
        }
    ],
    });
  }

  run = async (interaction) => {
    try {
        let idAxie = interaction.options.getInteger("id")


        const getAxie = await getAxieById(idAxie);

        const obj = [
        {
          name: "Status HP",
          value: `**${getAxie.stats.hp}**`
        },
        {
          name: "Status SPEED",
          value: `**${getAxie.stats.speed}**`,
          inline: true
        },
        {
          name: "Status SKILL",
          value: `**${getAxie.stats.skill}**`
        },
        {
          name: "Status MORALE",
          value: `**${getAxie.stats.morale}**`
        },
      
      ]

      const imagemR = getAxie.image

        const embed = new MessageEmbed()
        .setTitle(`⚔ ${getAxie.id}`)
        .setURL(`https://marketplace.axieinfinity.com/axie/${getAxie.id}`)
        .setImage(imagemR({size: 300, dynamic: true}))
        .setDescription(`Breed Count: ${getAxie.breedCount}/7`)
        .setColor("RANDOM")
        .addFields(obj)

        await interaction.reply({embeds: [embed]});


    } catch (err) {
        console.error(`Axie Não encontrado, ou problema na API.`);

        const embedErro = new MessageEmbed()
        .setTitle(`Axie não encontrado`)
    
        await interaction.reply( {embeds: [embedErro], ephemeral: true})
    }
  };
};
