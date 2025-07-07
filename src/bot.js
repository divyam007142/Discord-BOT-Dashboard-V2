const Discord = require("discord.js");
const Enmap = require("enmap");
const fs = require("fs");
const path = require("path");
const chalk = require('chalk');
const commands = require('./commands/index');

const { GatewayIntentBits } = require('discord.js');

const client = new Discord.Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessageTyping,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildScheduledEvents,
    GatewayIntentBits.AutoModerationConfiguration,
    GatewayIntentBits.AutoModerationExecution
  ]
});

const config = require('./config/config.json');
const settings = require('./config/settings.json');
client.commands = new Enmap();
client.config = config;

// ✅ FIXED: Safe loading of events from ./src/events
const eventFolder = path.join(__dirname, 'events');

fs.readdir(eventFolder, (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const eventPath = path.join(eventFolder, file);
    const event = require(eventPath);
    const eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
  });
});

// Loading commands
Object.keys(commands).forEach(commandName => {
  let props = commands[commandName];
  if (settings.includes(commandName)) return;
  console.log(chalk.green(`[+] Loaded command: ${commandName}`));
  console.log(`Loading command from ${__filename}`);

  try {
    client.commands.set(commandName, props);
  } catch (error) {
    console.error(`Error loading command ${commandName}: ${error}`);
  }
});

// Command processing
client.on('messageCreate', message => {
  if (message.author.bot) return;
  if (!message.content.startsWith(config.prefix)) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const commandName = args.shift().toLowerCase();

  const command = client.commands.get(commandName);

  if (!command) {
    console.error(`Command ${commandName} not found`);
    return;
  }

  if (typeof command.execute !== 'function') {
    console.error(`Command ${commandName} does not have an execute function`);
    return;
  }

  try {
    command.execute(client, message, args);
  } catch (error) {
    console.error(`Error executing command: ${error}`);
    message.reply('There was an error trying to execute that command!');
  }
});

// Bot ready event
client.on("ready", () => {
  client.user.setActivity('Set Activity', { type: 'WATCHING' });
});

client.login(config.token);

exports.client = client;
