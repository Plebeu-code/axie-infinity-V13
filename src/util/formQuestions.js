module.exports = [
    {
        question: 'Qual o seu nome?',
        name: 'Nome'
    },
    {
        question: 'Informe seu e-mail para contato:',
        name: 'Email'
    },
    {
        question: 'Qual seu Nickname?',
        name: "Nick"
    },
    {
        question: "Você já jogou ou joga Axie Infinity?",
        placeholder: 'Reponda',
        customId: 'Experiência com Axie Infinity',
        options: [
            {
                label: 'Sim',
                value: 'Sim',
                description: 'Já joguei Axie Infinity',
                emoji: '🀄'
            },
            {
                label: 'Nao',
                value: 'Nao',
                description: 'Nunca joguei Axie Infinity',
                emoji: '🀄'
            }
        ]
    },
    {
        question: 'Qual estilo mais se encaixa com seu perfil como jogador?',
        placeholder: 'Selecione seu estilo:',
        customId: 'Estilo',
        options: [
            {
                label: 'Controle/Defensivo',
                value: 'Controle/Defensivo',
                description: 'Suas habilidades serão sempre as melhores opções para demarcar ou negar caminhos...'
            },
            {
                label: 'Balanceado/Mid Range',
                value: 'Balanceado/Mid Range',
                description: 'Suas habilidades misturadas com uma mira afiada são os ingredientes perfeitos para...'
            },
            {
                label: 'Agressivo/DPS',
                value: 'Agressivo/DPS',
                description: 'Ótimos para conquistar espaços vulneráveis - eliminando quem estiver no caminho...'
            }
        ]
    },
    {
        question: 'Quantas horas por dia você possui para farmar?',
        placeholder: 'Selecione horas disponíveis',
        customId: 'Horas disponiveis',
        options: [
            {
                label: '1h',
                value: '1h+',
                description: '1h por dia'
            },
            {
                label: '2h+',
                value: '2h+',
                description: '2h por dia'
            },
            {
                label: '3h+',
                value: '3h+',
                description: '3h por dia'
            },
            {
                label: '4h+',
                value: '4h+',
                description: '4h por dia'
            },
            {
                label: '5h+',
                value: '5+',
                description: '5h+ por dia'
            },
        ]
    },
    {
        question: 'Em qual região do país você mora?',
        placeholder: 'Selecione a região',
        customId: 'Região',
        options: [
            {
                label: 'Norte',
                value: 'Norte',
                description: 'Amazonas, Acre, Rondônia, Pará, Amapá, Roraima e Tocantins.',
                emoji: '🌻'
            },
            {
                label: 'Nordeste',
                value: 'Nordeste',
                description: 'Maranhão, Piauí, Ceará, Bahia, Pernambuco, Rio Grande do Norte, Sergipe, Alagoas e Paraíba.',
                emoji: '🥵'
            },
            {
                label: 'Centro-Oeste',
                value: 'Centro-Oeste',
                description: 'Mato Grosso, Goiás, Mato Grosso do Sul e Distrito Federal.',
                emoji: '💼'
            },
            {
                label: 'Sudeste',
                value: 'Sudeste',
                description: 'Minas Gerais, São Paulo, Rio de Janeiro e Espírito Santo.',
                emoji: '🧀'
            },
            {
                label: 'Sul',
                value: 'Sul',
                description: 'Paraná, Santa Catarina e Rio Grande do Sul.',
                emoji: '🥶'
            }
        ]
    },
    {
        question: 'Você já jogou, ou joga quais destes jogos?',
        placeholder: 'Selecione o Jogo:',
        customId: 'Jogos',
        minValues: 1,
        maxValues: 8,
        options: [
            {
                label: 'Magic',
                value: 'Magic',
                description: 'É um jogo de cartas colecionáveis criado por Richard Garfield...'
            },
            {
                label: 'Pokemon TCG',
                value: 'Pokemon',
                description: 'Pokémon TCG Online é um jogo eletrônico de 2012 baseado...'
            },
            {
                label: 'Hearthstone',
                value: 'Hearthstone',
                description: 'É um jogo de cartas estratégico on-line desenvolvido...'
            },
            {
                label: 'Dota',
                value: 'Dota',
                description: 'Dota é uma série de videogames de estratégia da Valve...'
            },
            {
                label: 'League of Legends',
                value: 'Lol',
                description: 'League of Legends é um jogo eletrônico online gratuito...'
            },
            {
                label: 'Counter Strike',
                value: 'CSGO',
                description: 'Counter-Strike é uma série de jogos eletrônicos de tiro em...'
            },
            {
                label: 'Clash Royale',
                value: 'Clash',
                description: 'Clash Royale é um videojogo de estratégia freemium...'
            },
            {
                label: 'Poker',
                value: 'Poker',
                description: 'É um jogo de cartas jogado por duas ou mais pessoas...'
            },
            {
                label: 'Outros',
                value: 'outro',
                description: 'Não está listado !'
            },
        
        ]
    },
    {
        question: 'Qual a sua idade?',
        name: 'Idade',
    },
    {
        question: 'Conte um pouco sobre você',
        name: 'Sobre mim'
    }
]