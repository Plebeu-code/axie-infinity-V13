const { MessageEmbed } = require("discord.js");
const Commands = require("../../structures/Command");
const debuff = require('../../includes/efeitos.json')



module.exports = class extends Commands {
    constructor(client) {
        super(client, {
            name: "debuff",
            description: "Mostra as informações de todos os debuffs.",
        });
    }

    run = async (interaction) => {
        try {

            const obj = [
                {
                    name: "<:Aroma:822319922100830209> Aroma",
                    value: `Muda a prioridade para o Axie afetado na próxima rodada.`
                },
                {
                    name: "<:0attackdown:863875697449369641> Attack Down",
                    value: `Aumenta o moral em 20% para a próxima rodada. Acomulável`,
                },
                {
                    name: "<:Chill:822319922000035865> Chill",
                    value: `O alvo afetado não pode entrar em Last Stand.`
                },
                {
                    name: "<:fear:863875697785176094> Fear",
                    value: `O alvo afetado não pode atacar.`
                },
                {
                    name: "<:Fragile:822319922126127104> Fragile",
                    value: `O escudo leva o dobro de dano no próximo ataque.`,
                },
                {
                    name: "<:Jinx:822319921987977286> Jinx",
                    value: `Não poderá causar acertos críticos na próxima rodada. Acomulável`
                },
                {
                    name: "<:Lethal:822319921769742368> ",
                    value: `O próximo acerto no alvo afetado será um crítico.`
                },
                {
                    name: "<:Moralmenos:822319921752440873> Morale down",
                    value: `Diminui o moral em 20% na próxima rodada.`
                },
                {
                    name: "<:Poison:822319921739333663> Poison",
                    value: `O Axie afetado perde 2 de Vida para cada ação. Acomulável`
                },
                {
                    name: "<:Sleep:822319922028871680> Sleep",
                    value: `O próximo ataque irá ignorar o escudo.`
                },
                {
                    name: "<:Speedmenos:822319921902911499> Speed down",
                    value: `Diminui a velocidade em 20% na próxima rodada. Acomulável`
                },
                {
                    name: "<:stench:822336734842716160> Stench",
                    value: `Perde a prioridade de ataque na próxima rodada.`
                },
                {
                    name: "<:Stun:822319922105024512> Stun",
                    value: `Alvo afetado não acertará o próximo golpe.`
                },
            ]


            const embed = new MessageEmbed()
                .setTitle(`⚔ DEBUFFS ⚔`)
                .setColor("RANDOM")
                .addFields(obj)
                .setFooter("Buffs são efeitos de status que afetam seus Axies negativamente.")

            await interaction.reply({ embeds: [embed] });

        } catch (err) {
            console.error('Axie infinity erro', err)
        }
    };
};
