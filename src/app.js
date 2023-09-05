// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');
const dotenv = require('dotenv');

dotenv.config();
const {TOKEN, CLIENT_ID, GUILD_ID} = process.env;

const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates,
    ] 
});

// ==================== Import commands ==================== //

const fs = require('node:fs');
const path = require('node:path');

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

    try {
        await command.execute(interaction, client);
    } catch (error) {
        console.error(error)

        interaction.reply('Houve um erro ao executar esse comando');
    } finally {
        console.log(`Comando ${command.data.name} executado`);
    }
});

function startBot() {
    client.login('YOUR_BOT_TOKEN');
  }
  
  module.exports = startBot;