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
      try {
         const sent = await interaction.reply({
            embeds: [
               new EmbedBuilder()
                  .setColor("#CED9DE")
                  .setDescription("🏓 Pinging..."),
            ],
            fetchReply: true,
         });

         const roundtripLatency =
            sent.createdTimestamp - interaction.createdTimestamp;

         await interaction.editReply({
            embeds: [
               new EmbedBuilder()
                  .setColor("#CED9DE")
                  .setTitle("🏓 Ping")
                  .setDescription(
                     `- Websocket latency: **${interaction.client.ws.ping}ms**\n- Roundtrip latency: **${roundtripLatency}ms**`
                  ),
            ],
         });
      } catch (err) {
         console.error(err);
         return interaction.reply({
            content:
               "An error occurred while fetching the ping. Please try again later.",
            ephemeral: true,
         });
      }
   },
};
