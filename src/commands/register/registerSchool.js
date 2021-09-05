const Command = require("../../structures/Command");
const fs = require("fs");
const { knex: database } = require("../../database/controls/db_controls");
const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");

async function verifyschoolarship(interaction) {

  let schoolName = interaction.options.getString("nome").toLowerCase()

  schoolName = schoolName.normalize('NFD').replace(/[\u0300-\u036f]/g, "")

  if (schoolName.length < 4) {

    let message = "O nome da sua escola precisa ser maior que 4 letras !"

    await interaction.reply({ content: message, ephemeral: true })

    return;



  }

  if (schoolName.length > 13) {

    let message = "O nome da sua escola precisa ser menor que 13 letras !";

    await interaction.reply({ content: message, ephemeral: true })

    return;

  }

  if (await schoolarShipExists(interaction, schoolName) === false) return;

  await interaction.reply("_ _");
  await interaction.deleteReply();

  await createSchoolarShip(interaction, schoolName)

}

async function schoolarShipExists(interaction, schoolName) {

  try {

    const schools = await database("scholarship").select("scholarship").where({ scholarship: schoolName })

    if (schools.length == 0) return true
    else {
      await interaction.reply({ content: `O nome ${schoolName} já existe, defina outro !`, ephemeral: true })
      return false
    }

  } catch (error) {
    if (!interaction.replied) {
      console.error(error);
      return await interaction.reply({ content: `[${error.errno}] Não consegui executar este comando, avise alguém da STAFF !`, ephemeral: true })
    } else return
  }

}

async function createSchoolarShip(interaction, schoolName) {

  const { embed, row } = components(schoolName)

  const message = await interaction.channel.send({ embeds: [embed], components: [row] })

  const collector = await message.createMessageComponentCollector({ componentType: 'BUTTON', time: 60 * 1000 })

  collector.on("collect", async i => {

    if (!i.isButton()) return;
    if (i.user.id !== interaction.user.id) return;

    try {

      if (i.customId == "cancelSchoolShip") {

        i.reply({ content: "Okay, caso queira criar outra escola novamente, me chame !", ephemeral: true })

        collector.stop()

      } else {

        const SchoolNameToView = schoolName.charAt(0).toUpperCase() + schoolName.slice(1)

        const role = await interaction.guild.roles.create({

          name: SchoolNameToView,
          color: "RANDOM",

        })

        interaction.member.roles.add(role)

        const data = {

          manager: interaction.user.username,
          manager_id: interaction.user.id,
          scholarship: schoolName,
          scholarship_id: role.id,

        }

        await database("scholarship").insert(data)

        i.reply({ content: `A escola ${schoolName} foi registrada com sucesso !.`, ephemeral: true })

        collector.stop()

      }

    } catch (error) {
      console.log(error);
    }

  })

  collector.on("end", () => message.delete())

}

function components(schoolName) {

  const embed = new MessageEmbed()
    .setTitle(`Você realmente deseja criar escola ${schoolName} ?`)
    .setDescription("Depois que você criar essa escola, você poderá apaga-la novamente utilizando o comando /apagarescola !")
    .setColor("RANDOM")

  const row = new MessageActionRow().addComponents(

    new MessageButton()
      .setCustomId("cancelSchoolShip")
      .setLabel("Não, eu não quero criar !")
      .setStyle("DANGER"),

    new MessageButton()
      .setCustomId("processSchoolShip")
      .setLabel("Sim ! vai ser esse, manda bala !")
      .setStyle("SUCCESS")

  )

  return { embed, row }

}

module.exports = class extends Command {
  constructor(client) {
    super(client, {
      name: "registrarescola",
      description: "Irá registrar a escola informada.",
      options: [
        {
          name: "nome",
          type: "STRING",
          description: "Nome que a escola receberá",
          required: true,
        },
      ],
    });
  }

  run = async (interaction) => {

    try {
      await verifyschoolarship(interaction)
    } catch (error) {
      console.log(error);
    }

  };
};
