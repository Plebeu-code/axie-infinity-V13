const Command = require("../../structures/Command");
module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: "removealuno",
            description: "Remover o aluno da escola informada.",
            options: [
                {
                    name: "aluno",
                    type: "USER",
                    description: "Nome do aluno para ser removido.",
                    required: true,
                },
                {
                    name: "nome",
                    type: "STRING",
                    description: "Nome da escola para remover do aluno.",
                    required: true,
                },
            ],
        });
    }

    run = async (interaction) => {



    }
}