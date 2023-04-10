const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');


const exampleEmbed = new EmbedBuilder()
	.setColor(0x0099FF)
	.setTitle('Argenda do dia, referente as aulas da trybe')
	.setURL('https://discord.js.org/')
	.setAuthor({ name: 'Some name', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
	.setDescription('Some description here')
	.setThumbnail('https://i.imgur.com/AfFp7pu.png')
	.addFields(
		{ name: 'Regular field title', value: 'Some value here' },
		{ name: '\u200B', value: '\u200B' },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
	)
	.addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
	.setImage('https://i.imgur.com/AfFp7pu.png')
	.setTimestamp()
	.setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });

// channel.send({ embeds: [exampleEmbed] });


module.exports = {
    data: new SlashCommandBuilder()
        .setName('agenda')
        .setDescription('Manda a prgramação do dia na TRYBE'),
    
    async execute(interaction) {
        await interaction.reply({ embeds: [exampleEmbed] });
    }

}