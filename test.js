const { getAxieById } = require("./src/requests/graphql");


(async () => {
    
    const getAxie = await getAxieById(4697228)
    const banned = getAxie.battleInfo.banned ? "Sim" : "Não"

    console.log(`Buscando ID axie: ${getAxie.id}`);
    console.log(`Imagem do axie: ${getAxie.image}`);
    console.log(`Breed Count: ${getAxie.breedCount}/7`);
    console.log(`Nome do Axie: ${getAxie.name}`);
    console.log(`Classe do axie: ${getAxie.sireClass}`);
    console.log(`Dono da conta: ${getAxie.ownerProfile.name}`);

    console.log(`Status HP: ${getAxie.stats.hp}`);
    console.log(`Status SPEED: ${getAxie.stats.speed}`);
    console.log(`Status SKILL: ${getAxie.stats.skill}`);
    console.log(`Status MORALE: ${getAxie.stats.morale}`);
    console.log(`Data de criação do Axie ${getAxie.birthDate}`)
    console.log(`Bannido:  ${banned}`)
})()