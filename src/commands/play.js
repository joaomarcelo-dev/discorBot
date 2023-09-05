const { SlashCommandBuilder } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, NoSubscriberBehavior, VoiceConnectionStatus } = require('@discordjs/voice');
const ytdl = require('ytdl-core');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Comando de play de músicas')
        .addStringOption((option) => option.setName('url').setDescription('URL da música').setRequired(true)),
    
    async execute(interaction) {
        const channel = interaction.member.voice.channelId;
        
        if (!channel) {
            return interaction.reply('Você precisa estar em um canal de voz para usar este comando.');
        }

        const botVoiceState = interaction.member.voice;

        if (!botVoiceState) {
            return interaction.reply('O bot não está em um canal de voz.');
        }

        const youtubeUrl = interaction.options.getString('url'); // Obtém a URL da opção do usuário

        if (!youtubeUrl) {
            return interaction.reply('Por favor, forneça uma URL válida da música.');
        }

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
        
        console.log(VoiceConnectionStatus.Ready);
        console.log(connection.state.status);

        if (!ytdl.validateURL(youtubeUrl)) {
            return interaction.reply('A URL fornecida não é válida.');
        }

        if (connection.state.status === VoiceConnectionStatus.Ready) {
            return interaction.reply('Infelizmente o vagabundo do meu desenvolvedor não adicionou suporte a uma fila de reprodução, então não é possível tocar mais de uma música por vez.');
        }

        player.setMaxListeners(10);

        connection.subscribe(player);

        const stream = ytdl(youtubeUrl, { filter: 'audioonly' });

        const audioResource = createAudioResource(stream);

        try {
            player.play(audioResource);
        } catch (error) {
            console.error(error);
            interaction.reply(`Error: ${error.message}`);
        }

        interaction.reply(
            `
            Tocando agora: ${youtubeUrl}
            musica iniciada por: @${interaction.user.username}
            
            `
        );

        player.on('error', (error) => {
            console.error(`Error: ${error.message}`);
            interaction.reply(`Error: ${error.message} with resource ${error.resource.metadata.title}`);
        });

        player.on('idle', () => {
            console.log('Reprodução finalizada');
            connection.destroy();
        });
    }
};


