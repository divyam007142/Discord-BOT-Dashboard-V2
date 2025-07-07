module.exports = {
  name: 'club-info',
  async execute(interaction, client, helpers) {
    const tag = interaction.options.getString('tag');
    if (!tag.startsWith('#')) {
      await interaction.reply('Please provide a club tag starting with #');
      return;
    }

    const clubInfo = await helpers.getClubInfo(tag);
    if (!clubInfo) {
      await interaction.reply('Error fetching club info. Please check if the club tag is correct.');
      return;
    }

    await interaction.reply({ embeds: [await helpers.createClubEmbed(clubInfo)] });
  }
};