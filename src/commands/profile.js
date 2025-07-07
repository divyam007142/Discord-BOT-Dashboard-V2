module.exports = {
  name: 'profile',
  async execute(interaction, client, helpers) {
    const tag = interaction.options.getString('tag');
    if (!tag.startsWith('#')) {
      await interaction.reply('Please provide a player tag starting with #');
      return;
    }

    const playerInfo = await helpers.getPlayerInfo(tag);
    if (!playerInfo) {
      await interaction.reply('Error fetching player information. Please check if the player tag is correct.');
      return;
    }

    await interaction.reply({ embeds: [await helpers.createPlayerEmbed(playerInfo)] });
  }
};