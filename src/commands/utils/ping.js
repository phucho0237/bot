const {
   SlashCommandBuilder,
   ChatInputCommandInteraction,
   EmbedBuilder,
} = require("discord.js");

module.exports = {
   data: new SlashCommandBuilder()
      .setName("ping")
      .setDescription("Show the bot's ping"),
   /**
    *
    * @param {ChatInputCommandInteraction} interaction
    */
   async execute(interaction) {
      const sent = await interaction.reply({
         embeds: [
            new EmbedBuilder()
               .setColor("White")
               .setDescription("🏓 Pinging..."),
         ],
         fetchReply: true,
      });

      interaction.editReply({
         embeds: [
            new EmbedBuilder()
               .setColor("#CED9DE")
               .setTitle("🏓 Ping")
               .setDescription(
                  `- Websocket latency: **${
                     interaction.client.ws.ping
                  }ms**\n- Roundtrip latency: **${
                     sent.createdTimestamp - interaction.createdTimestamp
                  }ms**`
               ),
         ],
      });
   },
};
