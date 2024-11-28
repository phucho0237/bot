const {
   SlashCommandBuilder,
   ChatInputCommandInteraction,
   PermissionsBitField,
   EmbedBuilder,
} = require("discord.js");
const timestring = require("timestring");

module.exports = {
   data: new SlashCommandBuilder()
      .setName("slowmode")
      .setDescription("Enable/disable slowmode")
      .addStringOption((opt) =>
         opt
            .setName("time")
            .setDescription(
               "Time in second to slowmode (e.g: 1s, 2m, 3h). Set it to 0s to turn off the slowmode"
            )
            .setRequired(true)
      ),
   /**
    *
    * @param {ChatInputCommandInteraction} interaction
    */
   async execute(interaction) {
      const time = interaction.options.getString("time");

      if (
         !interaction.member.permissions.has(
            PermissionsBitField.Flags.ManageChannels
         )
      ) {
         return interaction.reply({
            content: "You don't have permission to use this command.",
            ephemeral: true,
         });
      }

      const timePattern = /^(\d+)(s|m|h)$/;

      if (!timePattern.test(time)) {
         return interaction.reply({
            content:
               "Invalid syntax, please use a valid time format (e.g., 1s, 2m, 3h).",
            ephemeral: true,
         });
      }

      try {
         const formattedTime = timestring(time);

         if (formattedTime > 21600) {
            return interaction.reply({
               content: "The time must be between 1 second and 6 hours.",
               ephemeral: true,
            });
         }

         await interaction.channel.setRateLimitPerUser(formattedTime);

         const successMessage =
            formattedTime === 0
               ? "Successfully turned off the slowmode."
               : `Set the slowmode for this channel to \`${time}\``;

         const embed = new EmbedBuilder()
            .setColor("#CED9DE")
            .setDescription(successMessage);

         const reply = await interaction.reply({ embeds: [embed] });

         setTimeout(() => reply.delete(), 5000);
      } catch (err) {
         console.error(err);
         interaction.reply({
            content:
               "Something went wrong while setting the slowmode. Please try again later.",
            ephemeral: true,
         });
      }
   },
};
