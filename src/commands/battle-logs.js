module.exports = {
  name: 'battle-logs',
  async execute(interaction, client, helpers) {
    const tag = interaction.options.getString('tag');
    if (!tag.startsWith('#')) {
      await interaction.reply('Please provide a player tag starting with #');
      return;
    }

    const playerInfo = await helpers.getPlayerInfo(tag);
    if (!playerInfo || !playerInfo.battleLogs) {
      await interaction.reply('Error fetching battle logs. Please check if the player tag is correct.');
      return;
    }

    const logs = playerInfo.battleLogs.map(log => `• ${log}`).join('\n');
    await interaction.reply(`**Recent Battles:**\n${logs}`);
  }
};