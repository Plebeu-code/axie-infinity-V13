const Command = require("../../structures/Command");

async function listSchools(interaction) {



}

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: "listarescolas",
            description: "Listas as escolas registradas.",
        });
    }

    run = async (interaction) => {

        await listSchools(interaction)

    }
}