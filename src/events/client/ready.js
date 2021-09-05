const Event = require("../../structures/Event");
const { knex: database } = require("../../database/controls/db_controls")

async function tryConnectToDB() {

  try {

    const result = await database("alunos").select("*")

    console.log(`Estou conectado com o banco de dados ! [${result.length}]`);

    return true

  } catch (error) {
    return false
  }

}

module.exports = class extends Event {
  constructor(client) {
    super(client, {
      name: "ready",
    });
  }

  run = async () => {

    try {

      if (await tryConnectToDB() === false) this.client.destroy()

      console.info(
        `Bot ${this.client.user.username} logado com sucesso em ${this.client.guilds.cache.size} servidores.`
      );

      await this.client.registryCommands();
      await this.client.connectToDatabase();

      await this.client.manager.init(this.client.user.id);

    } catch (error) {
      console.log(error);
    }

  }

};


