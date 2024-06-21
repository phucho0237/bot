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
               .setTitle(`${track.title} - ${track.author}`)
               .setURL(track.url)
               .setThumbnail(track.thumbnail)
               .setFooter({
                  text: `Requested by: ${track.requestedBy.username}`,
                  iconURL: track.requestedBy.displayAvatarURL(),
               }),
         ],
      });
   },
};
