const {
   SlashCommandBuilder,
   ChatInputCommandInteraction,
   EmbedBuilder,
} = require("discord.js");
const { useMainPlayer, useQueue } = require("discord-player");

module.exports = {
   data: new SlashCommandBuilder()
      .setName("music")
      .setDescription("Play and control music")
      .addSubcommand((subcmd) =>
         subcmd
            .setName("play")
            .setDescription("Play a song/playlist")
            .addStringOption((opt) =>
               opt
                  .setName("query")
                  .setDescription("The query you want to play")
                  .setRequired(true)
            )
      )
      .addSubcommand((subcmd) =>
         subcmd.setName("stop").setDescription("Stop the queue")
      ),
   /**
    *
    * @param {ChatInputCommandInteraction} interaction
    */
   async execute(interaction) {
      const subcommand = interaction.options.getSubcommand();

      switch (subcommand) {
         case "play": {
            const query = interaction.options.getString("query");

            const voiceChannel = interaction.member.voice.channel;
            if (!voiceChannel)
               return interaction.reply({
                  content: "You must join a voice channel first",
                  ephemeral: true,
               });

            const player = useMainPlayer();

            const searchResult = await player
               .search(query, { requestedBy: interaction.user })
               .catch(() => null);
            if (!searchResult) {
               return interaction.reply({
                  content: `No result found for \`${query}\``,
               });
            }

            await interaction.deferReply();

            try {
               const { track } = await player.play(voiceChannel, searchResult, {
                  requestedBy: interaction.user,
                  nodeOptions: {
                     leaveOnEnd: false,
                     leaveOnEmpty: true,
                     leaveOnEmptyCooldown: 0,
                     metadata: interaction,
                  },
               });

               return interaction.followUp({
                  embeds: [
                     new EmbedBuilder()
                        .setColor("#CED9DE")
                        .setDescription(
                           `Added [**${track.title} - ${track.author}**](${track.url}) - \`(${track.duration})\``
                        ),
                  ],
               });
            } catch (err) {
               interaction.followUp({
                  content: "Something went wrong! Please try again later",
                  ephemeral: true,
               });
               console.error(err);
            }
         }
         case "stop": {
            const queue = useQueue(interaction.guild.id);

            queue.delete();

            interaction.reply({
               embeds: [
                  new EmbedBuilder()
                     .setColor("#CED9DE")
                     .setDescription("Stopped the queue"),
               ],
            });
         }
      }
   },
};
