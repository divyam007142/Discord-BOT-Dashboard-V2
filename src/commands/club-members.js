module.exports = {
  name: 'club-members',
  async execute(interaction, client, helpers) {
    const tag = interaction.options.getString('tag');
    if (!tag.startsWith('#')) {
      await interaction.reply('Please provide a club tag starting with #');
      return;
    }

    const clubInfo = await helpers.getClubInfo(tag);
    if (!clubInfo || !clubInfo.members) {
      await interaction.reply('Error fetching club members. Please check if the club tag is correct.');
      return;
    }

    const members = clubInfo.members.map(m => `• ${m.name} (${m.tag})`).join('\n');
    await interaction.reply(`**Club Members:**\n${members}`);
  }
};