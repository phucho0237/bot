const { GuildQueueEvent } = require("discord-player");
const { EmbedBuilder } = require("discord.js");

module.exports = {
   name: GuildQueueEvent.PlayerStart,
   type: "player",
   execute(queue, track) {
      queue.metadata.channel.send({
         embeds: [
            new EmbedBuilder()
               .setColor("#CED9DE")
               .setAuthor({ name: "Now playing" })
               .setDescription(
                  `[**${track.title} - ${track.author}**](${track.url}) - \`${track.duration}\``
               )
               .setThumbnail(track.thumbnail),
         ],
      });
   },
};
