const {
   SlashCommandBuilder,
   ChatInputCommandInteraction,
   PermissionsBitField,
   EmbedBuilder,
   MessageFlags,
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
            flags: MessageFlags.Ephemeral,
         });
      }

      const timePattern = /^(\d+)(s|m|h)$/;

      if (!timePattern.test(time)) {
         return interaction.reply({
            content:
               "Invalid syntax, please use a valid time format (e.g., 1s, 2m, 3h).",
            flags: MessageFlags.Ephemeral,
         });
      }

      try {
         const formattedTime = timestring(time);

         if (formattedTime > 21600) {
            return interaction.reply({
               content: "The time must be between 1 second and 6 hours.",
               flags: MessageFlags.Ephemeral,
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
            content: "Something went wrong! Please try again later.",
            flags: MessageFlags.Ephemeral,
         });
      }
   },
};
