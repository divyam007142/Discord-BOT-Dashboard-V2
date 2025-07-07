module.exports = {
  name: 'resources',
  async execute(interaction, client, helpers) {
    const pp = helpers.calculatePowerPointsToMax();
    const coins = helpers.calculateCoinsToMax();

    await interaction.reply(`To max a brawler you need: **${pp} Power Points** and **${coins} Coins**`);
  }
};