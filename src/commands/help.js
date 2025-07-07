module.exports = {
  name: 'help',
  async execute(interaction) {
    const helpMessage = `**Available Commands:**
• /profile [tag] - Get player info.
• /help - Show this message.
• /battle-logs [tag] - Get player battle logs.
• /club-members [tag] - List club members.
• /club-info [tag] - Get club info.
• /resources - Show upgrade requirements.`;
    await interaction.reply(helpMessage);
  }
};