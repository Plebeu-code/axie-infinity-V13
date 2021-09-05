const Command = require("../../structures/Command");
const fs = require("fs");
const { knex: database } = require("../../database/controls/db_controls");
const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");


// ANCHOR - Fazer a verificação do aluno
async function verifyStudent(interaction) {
  // console.info(`RegisterStudent - verifyStudent - linha 26`)

  if (interaction.options.getUser("aluno").id === interaction.user.id) return await interaction.reply({ content: "Você não pode registrar você na sua própria escola, derr !", ephemeral: true })

  if (await schoolExist(interaction) === false) return;

  if (await pushSchools(interaction, interaction.options.getUser("aluno").id) === false) return;

  await registerStudent(interaction)

}

// ANCHOR - Verificando a escola informada existe 
async function schoolExist(interaction) {
  // console.info(`RegisterStudent - schoolExist - linha 22`)

  const schoolName = interaction.options.getString("escola").toLowerCase()

  try {

    const result = await database("scholarship").select("*").where({ manager_id: interaction.user.id, scholarship: schoolName })

    if (result.length == 0) {

      interaction.reply({ content: `Hey <@${interaction.user.id}> eu não achei a sua escola com esse nome !`, ephemeral: true })

      return false;
    }

    return true

  } catch (error) {
    if (!interaction.replied) {
      console.error(error);
      interaction.reply({ content: `[${error.errno}] Eu tive um problema para buscar a escola informada !`, ephemeral: true })
      return false
    } else return false
  }


}

// ANCHOR - Puxar os dados das escolas do Aluno
async function pushSchools(interaction, studentId) {
  // console.info(`RegisterStudent - pushSchools - linha 54`)
  try {

    const scholarships = await database("scholarship").select("manager_id")
    const alunos = await database("alunos").select("aluno_id")

    for (const value of scholarships) {
      if (value.manager_id === studentId) {
        await interaction.reply({ content: `O <@${studentId}> é um Manager, você não pode registra-lo !`, ephemeral: true })
        return false
      }
    }

    for (const value of alunos) {
      if (value.aluno_id === studentId) {
        await interaction.reply({ content: `O <@${studentId}> já está registrado como aluno !`, ephemeral: true })
        return false
      }
    }

    return true

  } catch (error) {
    if (!interaction.replied) {
      console.error(error);
      return await interaction.reply({ content: `[${error.errno}] Eita ! tive uns problemas para achar as papeladas, consulte alguém da staff !`, ephemeral: true })
    } else return
  }
}

// ANCHOR - Registrando o aluno na escola informada 
async function registerStudent(interaction) {
  // console.info(`RegisterStudent - registerStudent - linha 9`)
  try {

    const student = interaction.options.getUser("aluno")

    const school = interaction.options.getString("escola").toLowerCase()
    const resultId = await database("scholarship").select("scholarship_id").where({ scholarship: school }).first()

    const SchoolName = school.charAt(0).toUpperCase() + school.slice(1)

    const id = resultId.scholarship_id

    const data = {
      manager: interaction.user.username,
      manager_id: interaction.user.id,
      aluno: student.username,
      aluno_id: student.id,
      scholarship: school,
      scholarship_id: id,
    }

    await database("alunos").insert(data)

    await interaction.reply({ content: `Eu registrei o aluno <@${student.id}> na escola ${SchoolName}`, ephemeral: true })

  } catch (error) {
    if (!interaction.replied) {
      console.error(error);
      return await interaction.reply({ content: `[${error.errno}] CARA ! tive um problema para registrar o aluno, chame os meus superiores !!!`, ephemeral: true })
    } else return
  }

}

module.exports = class extends Command {
  constructor(client) {
    super(client, {
      name: "registraraluno",
      description: "Registrar o aluno informado na sua escola.",
      options: [
        {
          name: "aluno",
          type: "USER",
          description: "Nome do usuário que você deseja registrar.",
          required: true,
        },
        {
          name: "escola",
          type: "STRING",
          description: "Nome do usuário que você deseja registrar.",
          required: true,
        },
      ],
    });
  }

  run = async (interaction) => {

    const result = await database("alunos")
      .select({ scholarship_nome: "scholarships.nome", alunos_nome: "alunos.nome" })
      .join("scholarships", "scholarships.id", "alunos.scholarship_id")

    console.log(result);

    // try {

    //   await verifyStudent(interaction)

    // } catch (error) {
    //   console.error(error);
    // }
  }
}