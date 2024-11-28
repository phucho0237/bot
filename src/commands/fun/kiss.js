const {
   SlashCommandBuilder,
   ChatInputCommandInteraction,
   EmbedBuilder,
} = require("discord.js");
const axios = require("axios");

module.exports = {
   data: new SlashCommandBuilder()
      .setName("kiss")
      .setDescription("Kiss someone")
      .addUserOption((opt) =>
         opt.setName("target").setDescription("User to kiss").setRequired(true)
      ),
   /**
    *
    * @param {ChatInputCommandInteraction} interaction
    */
   async execute(interaction) {
      const target = interaction.options.getMember("target");

      if (target.id === interaction.user.id) {
         return interaction.reply({
            content: `How can you kiss yourself, ${interaction.user.displayName}?`,
            ephemeral: true,
         });
      }

      try {
         const result = await axios.get(
            "https://api.otakugifs.xyz/gif?reaction=kiss"
         );

         if (result.data && result.data.url) {
            interaction.reply({
               embeds: [
                  new EmbedBuilder()
                     .setColor("#CED9DE")
                     .setAuthor({
                        name: `${interaction.user.displayName} kissed ${target.user.displayName}. How cute!`,
                        iconURL: interaction.user.avatarURL(),
                        url: result.data.url,
                     })
                     .setImage(result.data.url),
               ],
            });
         } else {
            interaction.reply({
               content:
                  "An error occurred while processing the request. Please try again later.",
               ephemeral: true,
            });
         }
      } catch (err) {
         console.error(err);
         interaction.reply({
            content:
               "An error occurred while processing the request. Please try again later.",
            ephemeral: true,
         });
      }
   },
};
