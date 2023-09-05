const { SlashCommandBuilder } = require('discord.js');



module.exports = {
    data: new SlashCommandBuilder()
        .setName('karaio')
        .setDescription('karaio!'),
    
    async execute(interaction) {
        await interaction.reply('Tomar no teu caneco @Iesley');
    }

}