const {
   SlashCommandBuilder,
   ChatInputCommandInteraction,
   PermissionsBitField,
} = require("discord.js");

module.exports = {
   data: new SlashCommandBuilder()
      .setName("lock")
      .setDescription("Lock current channel"),
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

      if (perms.deny.has(PermissionsBitField.Flags.SendMessages))
         return interaction.reply({
            content: `<#${channel.id}> is locked already.`,
            ephemeral: true,
         });

      try {
         await channel.permissionOverwrites.edit(
            interaction.guild.roles.everyone,
            { SendMessages: false }
         );
         interaction.reply({ content: `Locked <#${channel.id}>` });
      } catch (err) {
         interaction.reply({
            content: "Something went wrong! Please try again later.",
            ephemeral: true,
         });

         console.error(err);
      }
   },
};
