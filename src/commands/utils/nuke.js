const {
   SlashCommandBuilder,
   ChatInputCommandInteraction,
   PermissionsBitField,
   EmbedBuilder,
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
      )
         return interaction.reply({
            content: "You don't have permission to use this command.",
            ephemeral: true,
         });

      try {
         const channel = interaction.channel;
         const position = interaction.channel.position;

         const newChannel = await channel.clone();

         await channel.delete();
         newChannel.setPosition(position);

         newChannel
            .send(`Nuked by \`${interaction.user.username}\``)
            .then((msg) => {
               setTimeout(() => msg.delete(), 5000);
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
