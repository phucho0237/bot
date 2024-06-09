const { Client, GatewayIntentBits, Collection } = require("discord.js");

const config = require("./config");

const client = new Client({
   intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.GuildMessages,
   ],
});

client.commands = new Collection();

["events", "commands"].forEach((handler) => {
   require(`./handlers/${handler}`)(client);
});

client.login(config.botToken);
