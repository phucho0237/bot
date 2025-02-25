const {
   SlashCommandBuilder,
   ChatInputCommandInteraction,
   PermissionsBitField,
   EmbedBuilder,
   MessageFlags,
} = require("discord.js");

module.exports = {
   data: new SlashCommandBuilder()
      .setName("addrole")
      .setDescription("Add a role to a user")
      .addUserOption((opt) =>
         opt
            .setName("target")
            .setDescription("The user to add the role to")
            .setRequired(true)
      )
      .addRoleOption((opt) =>
         opt.setName("role").setDescription("The role to add").setRequired(true)
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
            flags: MessageFlags.Ephemeral,
         });

      try {
         await target.roles.add(role);
         interaction.reply({
            embeds: [
               new EmbedBuilder()
                  .setColor("#CED9DE")
                  .setDescription(`Successfully added ${role} to ${target}.`),
            ],
            flags: MessageFlags.Ephemeral,
         });
      } catch (err) {
         interaction.reply({
            content: "Something went wrong! Please try again later.",
            flags: MessageFlags.Ephemeral,
         });

         console.error(err);
      }
   },
};
