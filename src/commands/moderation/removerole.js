const {
   SlashCommandBuilder,
   ChatInputCommandInteraction,
   PermissionsBitField,
   EmbedBuilder,
} = require("discord.js");

module.exports = {
   data: new SlashCommandBuilder()
      .setName("removerole")
      .setDescription("Remove a role from a user")
      .addUserOption((opt) =>
         opt
            .setName("target")
            .setDescription("The user to remove the role from")
            .setRequired(true)
      )
      .addRoleOption((opt) =>
         opt
            .setName("role")
            .setDescription("The role to remove")
            .setRequired(true)
      ),
   /**
    *
    * @param {ChatInputCommandInteraction} interaction
    */
   async execute(interaction) {
      const target = interaction.options.getMember("target");
      const role = interaction.options.getRole("role");

      if (
         !interaction.member.permissions.has(
            PermissionsBitField.Flags.ManageRoles
         )
      )
         return interaction.reply({
            content: "You don't have permission to use this command.",
            ephemeral: true,
         });

      try {
         await target.roles.remove(role);
         interaction.reply({
            embeds: [
               new EmbedBuilder()
                  .setColor("#CED9DE")
                  .setDescription(
                     `Successfully remove ${role} from ${target}.`
                  ),
            ],
            ephemeral: true,
         });
      } catch (err) {
         interaction.reply({
            content: "Something went wrong! Please try again later.",
            ephemeral: true,
         });

         console.error(err);
      }
   },
};
