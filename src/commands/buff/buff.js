const { MessageEmbed } = require("discord.js");
const Commands = require("../../structures/Command");


module.exports = class extends Commands {
    constructor(client) {
        super(client, {
            name: "buff",
            description: "Mostra as informações de todos os buffs.",
        });
    }

    run = async (interaction) => {
        try {

            const obj = [
                {
                    name: "<:AttackmaisP:883101720043978752> Attack up",
                    value: `Aumenta o próximo Ataque em 20%. Acomulável`
                },
                {
                    name: "<:MoraleUp:883013923924766870> Morale up",
                    value: `Aumenta o moral em 20% para a próxima rodada. Acomulável`,
                },
                {
                    name: "<:Speedmais:822319951116763136> Speed Up",
                    value: `Aumenta a velocidade em 20% para a próxima rodada. Acomulável`
                },
            ]


            const embed = new MessageEmbed()
                .setTitle(`⚔ BUFFS ⚔`)
                .setColor("RANDOM")
                .addFields(obj)
                .setFooter("Buffs são efeitos de status que afetam seus Axies positivamente.")

            await interaction.reply({ embeds: [embed] });

        } catch (err) {
            console.error('Axie infinity erro', err)
        }
    };
};
