const {
   SlashCommandBuilder,
   ChatInputCommandInteraction,
   PermissionsBitField,
} = require("discord.js");

module.exports = {
   data: new SlashCommandBuilder()
      .setName("unlock")
      .setDescription("Unlock current channel"),
   /**
    *
    * @param {ChatInputCommandInteraction} interaction
    */
   async execute(interaction) {
      if (
         !interaction.member.permissions.has(
            PermissionsBitField.Flags.ManageChannels
         )
      )
         return interaction.reply({
            content: "You don't have permission to use this command.",
            ephemeral: true,
         });

      const channel = interaction.channel;

      const perms = channel.permissionOverwrites.cache.get(
         interaction.guild.roles.everyone.id
      );

      if (perms.allow.has(PermissionsBitField.Flags.SendMessages))
         return interaction.reply({
            content: `<#${channel.id}> is unlocked already.`,
            ephemeral: true,
         });

      try {
         await channel.permissionOverwrites.edit(
            interaction.guild.roles.everyone,
            { SendMessages: true }
         );
         interaction.reply({ content: `Unlocked <#${channel.id}>` });
      } catch (err) {
         interaction.reply({
            content: "Something went wrong! Please try again later.",
            ephemeral: true,
         });

         console.error(err);
      }
   },
};
