const { SlashCommandBuilder } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, NoSubscriberBehavior } = require('@discordjs/voice');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Comando de play de musicas'),
    
        async execute(interaction) {
            const channel = interaction.member.voice.channelId;
            
            if (!channel) {
                return interaction.reply('Você precisa estar em um canal de voz para usar este comando.');
            }
        
            const botVoiceState = interaction.member.voice;
        
            if (!botVoiceState) {
                return interaction.reply('O bot não está em um canal de voz.');
            }
        
            botVoiceState.selfMute = true;
        
            const connection = joinVoiceChannel({
                channelId: channel,
                guildId: interaction.guild.id,
                adapterCreator: interaction.guild.voiceAdapterCreator,
            });
        
            const player = createAudioPlayer({
                behaviors: {
                    noSubscriber: NoSubscriberBehavior.Play
                }
            });
        
            player.setMaxListeners(10);
        
            connection.subscribe(player);
        
            const audioResource = createAudioResource(require('path').join(__dirname, './lost-in-you.opus'));
        
            player.play(audioResource);
        
            interaction.reply('Reproduzindo áudio...');
        }
}
