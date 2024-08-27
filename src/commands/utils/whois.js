const {
   SlashCommandBuilder,
   ChatInputCommandInteraction,
   EmbedBuilder,
} = require("discord.js");

module.exports = {
   data: new SlashCommandBuilder()
      .setName("whois")
      .setDescription("Get user infomation")
      .addUserOption((opt) =>
         opt
            .setName("target")
            .setDescription("User to get infomation for")
            .setRequired(true)
      ),
   /**
    *
    * @param {ChatInputCommandInteraction} interaction
    */
   async execute(interaction) {
      const target = interaction.options.getMember("target");

      interaction.reply({
         embeds: [
            new EmbedBuilder()
               .setColor("#CED9DE")
               .addFields(
                  {
                     name: "Username",
                     value: `${target.user.username}`,
                  },
                  {
                     name: "ID",
                     value: `${target.id}`,
                  },
                  {
                     name: "Joined",
                     value: `<t:${parseInt(target.joinedTimestamp / 1000)}:R>`,
                     inline: true,
                  },
                  {
                     name: "Registered",
                     value: `<t:${parseInt(
                        target.user.createdTimestamp / 1000
                     )}:R>`,
                     inline: true,
                  },
                  {
                     name: "Roles",
                     value: `${target.roles.cache
                        .filter((r) => r.name !== "@everyone")
                        .sort((a, b) => b.position - a.position)
                        .map((r) => r)
                        .join(" ")}`,
                  },
                  {
                     name: "Acknowledgements",
                     value:
                        target.id === interaction.guild.ownerId
                           ? "Server Owner"
                           : "Member",
                  }
               )
               .setThumbnail(target.displayAvatarURL({ size: 64 }))
               .setTimestamp(),
         ],
      });
   },
};
