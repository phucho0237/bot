const {
   SlashCommandBuilder,
   ChatInputCommandInteraction,
   PermissionsBitField,
   MessageFlags,
} = require("discord.js");

module.exports = {
   data: new SlashCommandBuilder()
      .setName("nuke")
      .setDescription("Nuke a channel"),
   /**
    *
    * @param {ChatInputCommandInteraction} interaction
    */
   async execute(interaction) {
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

      try {
         const channel = interaction.channel;
         const position = channel.position;

         const newChannel = await channel.clone();
         await channel.delete();

         await newChannel.setPosition(position);

         const msg = await newChannel.send(
            `Nuked by <@${interaction.user.id}>`
         );

         setTimeout(() => msg.delete(), 5000);
      } catch (err) {
         console.error(err);
         return interaction.reply({
            content: "Something went wrong! Please try again later.",
            flags: MessageFlags.Ephemeral,
         });
      }
   },
};
