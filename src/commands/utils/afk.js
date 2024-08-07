const {
   SlashCommandBuilder,
   ChatInputCommandInteraction,
   EmbedBuilder,
} = require("discord.js");

const afkModel = require("../../database/model/afk");

module.exports = {
   data: new SlashCommandBuilder()
      .setName("afk")
      .setDescription("Set an afk status")
      .addStringOption((opt) =>
         opt.setName("reason").setDescription("Reason to AFK")
      ),
   /**
    *
    * @param {ChatInputCommandInteraction} interaction
    */
   async execute(interaction) {
      const reason = interaction.options.getString("reason") || "AFK";

      const afkData = await afkModel.findOne({ userId: interaction.user.id });
      if (!afkData) {
         await afkModel.create({
            userId: interaction.user.id,
            reason: reason,
            timestamp: Date.now(),
         });
      }

      interaction.reply({
         embeds: [
            new EmbedBuilder()
               .setColor("#CED9DE")
               .setDescription(
                  `<@${interaction.user.id}> I set your AFK status with reason: \`${reason}\``
               ),
         ],
      });
   },
};
