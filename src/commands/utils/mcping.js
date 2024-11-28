const {
   SlashCommandBuilder,
   ChatInputCommandInteraction,
   Client,
} = require("discord.js");
const axios = require("axios");

const mcPingModel = require("../../database/model/mcping");

module.exports = {
   data: new SlashCommandBuilder()
      .setName("mcping")
      .setDescription("Ping the specified Minecraft server"),
   /**
    *
    * @param {ChatInputCommandInteraction} interaction
    * @param {Client} client
    */
   async execute(interaction) {
      try {
         const data = await mcPingModel.findOne({
            guildId: interaction.guild.id,
         });

         if (!data) {
            return interaction.reply({
               content:
                  "This server isn't set up for this feature. Please contact server administrators to configure it first.",
               ephemeral: true,
            });
         }

         try {
            const serverData = await axios.get(
               `https://api.mcsrvstat.us/simple/${data.url}`
            );

            if (serverData.status === 200) {
               return interaction.reply({ content: "Server is up 🟢" });
            } else {
               return interaction.reply({ content: "Server is down 🔴" });
            }
         } catch (err) {
            console.error(err);
            return interaction.reply({
               content:
                  "Failed to ping the Minecraft server. Please try again later.",
               ephemeral: true,
            });
         }
      } catch (err) {
         console.error(err);
         return interaction.reply({
            content:
               "An error occurred while processing the request. Please try again later.",
            ephemeral: true,
         });
      }
   },
};
