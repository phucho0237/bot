const {
   SlashCommandBuilder,
   ChatInputCommandInteraction,
   PermissionsBitField,
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
            ephemeral: true,
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
            content:
               "Something went wrong while nuking the channel. Please try again later.",
            ephemeral: true,
         });
      }
   },
};
