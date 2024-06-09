const { Events, Client } = require("discord.js");

module.exports = {
   name: Events.ClientReady,
   once: true,
   /**
    *
    * @param {Client} client
    */
   execute(client) {
      console.log(`[CLIENT] Logged in as ${client.user.tag}`);
   },
};
