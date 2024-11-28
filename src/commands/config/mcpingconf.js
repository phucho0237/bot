const {
   SlashCommandBuilder,
   ChatInputCommandInteraction,
   Client,
   PermissionsBitField,
} = require("discord.js");

const mcPingModel = require("../../database/model/mcping");

module.exports = {
   data: new SlashCommandBuilder()
      .setName("mcpingconf")
      .setDescription("Config the mcping command")
      .addStringOption((opt) =>
         opt
            .setName("url")
            .setDescription("The Minecraft URL you want to setup (Java only)")
            .setRequired(true)
      ),
   /**
    *
    * @param {ChatInputCommandInteraction} interaction
    * @param {Client} client
    */
   async execute(interaction, client) {
      const url = interaction.options.getString("url");

      if (
         !interaction.member.permissions.has(
            PermissionsBitField.Flags.Administrator
         )
      ) {
         return interaction.reply({
            content: "You don't have permission to use this command.",
            ephemeral: true,
         });
      }

      try {
         const data = await mcPingModel.findOne({
            guildId: interaction.guild.id,
         });

         if (!data) {
            await mcPingModel.create({ guildId: interaction.guild.id, url });
            return interaction.reply({
               content: `Successfully set up the mcping command with the URL: \`${url}\``,
               ephemeral: true,
            });
         }

         await mcPingModel.findOneAndUpdate(
            { guildId: interaction.guild.id },
            { url }
         );
         return interaction.reply({
            content: `Successfully updated the mcping command URL to: \`${url}\``,
            ephemeral: true,
         });
      } catch (err) {
         console.error(err);
         return interaction.reply({
            content:
               "An error occurred while processing your request. Please try again later.",
            ephemeral: true,
         });
      }
   },
};
