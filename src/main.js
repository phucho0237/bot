const {
   Client,
   GatewayIntentBits,
   ActivityType,
   Collection,
} = require("discord.js");
const { Player } = require("discord-player");

const config = require("./config");

const client = new Client({
   intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.GuildVoiceStates,
   ],
   presence: {
      activities: [{ name: "somthin", type: ActivityType.Competing }],
      status: "dnd",
   },
});

const player = new Player(client);
player.extractors.loadDefault();

client.commands = new Collection();

["events", "commands"].forEach((handler) => {
   require(`./handlers/${handler}`)(client);
});

client.login(config.bot.token);

require("./database/connect")();
