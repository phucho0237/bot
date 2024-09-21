const {
   Client,
   GatewayIntentBits,
   ActivityType,
   Collection,
} = require("discord.js");

const config = require("./config");

const client = new Client({
   intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.GuildMessages,
   ],
   presence: {
      activities: [{ name: "somthin", type: ActivityType.Competing }],
      status: "dnd",
   },
});

client.commands = new Collection();

["events", "commands"].forEach((handler) => {
   require(`./handlers/${handler}`)(client);
});

client.login(config.bot.token);

require("./database/connect")();
require("./utils/anti-crash")(client);
