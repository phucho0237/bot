const { Events, Message } = require("discord.js");

const afkModel = require("../../database/model/afk");

module.exports = {
   name: Events.MessageCreate,
   /**
    *
    * @param {Message} message
    */
   async execute(message) {
      if (message.author.bot) return;

      const mentionedMember = message.mentions.members.first();

      const authorId = message.author.id;

      if (mentionedMember) {
         const afkData = await afkModel.findOne({ userId: mentionedMember.id });
         if (afkData) {
            message.channel
               .send(
                  `\`${mentionedMember.user.username}\` is AFK with reason: \`${afkData.reason}\``
               )
               .then((msg) => {
                  setTimeout(() => msg.delete(), 5000);
               });
         }
      }

      const isAFK = await afkModel.findOne({ userId: authorId });
      if (isAFK) {
         await afkModel.deleteOne({ userId: authorId });

         message.channel
            .send(`Welcome back <@${userId}>, I removed your AFK status`)
            .then((msg) => {
               setTimeout(() => msg.delete(), 5000);
            });
      }
   },
};
