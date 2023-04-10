// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');
const dotenv = require('dotenv');
const { log } = require('node:console');
dotenv.config();
const {TOKEN, CLIENT_ID, GUILD_ID} = process.env;

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// ==================== Import commands ==================== //

const fs = require('node:fs');
const path = require('node:path');
const ytdl = require('ytdl-core');

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.js'))

// console.log(commandFiles);

client.commands = new Collection();

for (file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath)

    if ("data" in command && "execute" in command) {
        client.commands.set(command.data.name, command)
    } else {
        console.log(`Esse commando em: ${filePath}, falhou`)
    }
}

// console.log(client.commands);               

// ---------------------------------------------------------- //

client.once(Events.ClientReady, c => {
	console.log(`Login realizado como: ${c.user.tag}`);
});

client.login(TOKEN);


// ====================== Listner interactions ================= //

client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return;
    
    const command = interaction.client.commands.get(interaction.commandName);


    if(!command) {
        console.error('Comando não encontrado!!!')
        return;
    }

    // console.log(interaction.member);
  
    // const channel = client.channels.cache.get(interaction.channelId); // Buscando id do cannal



    try {
        await command.execute(interaction, client);
    } catch (error) {
        console.error(error)

        interaction.reply('Houve um erro ao executar esse comando');
    } finally {
        console.log('Código executado');
    }
})


