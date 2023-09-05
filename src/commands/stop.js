const { SlashCommandBuilder } = require('discord.js');
const { VoiceConnectionStatus } = require('@discordjs/voice');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription('Comando para parar a música atual e limpar a fila de reprodução'),
    
    execute(interaction) {
        const botVoiceState = interaction.member.voice;

        if (!botVoiceState.channelId) {
          return interaction.reply('O bot não está em um canal de voz.');
        }

        console.log(botVoiceState);

        if (botVoiceState.connection.state.status === VoiceConnectionStatus.Ready) {
            botVoiceState.connection.destroy();
            return interaction.reply('A música atual foi interrompida.');
        }

        interaction.reply('O bot não está em um canal de voz ou não há música para parar.');
    }
};