const {
   SlashCommandBuilder,
   ChatInputCommandInteraction,
   EmbedBuilder,
} = require("discord.js");

module.exports = {
   data: new SlashCommandBuilder()
      .setName("whois")
      .setDescription("Get user information")
      .addUserOption((opt) =>
         opt
            .setName("target")
            .setDescription("User to get information for")
            .setRequired(true)
      ),
   /**
    *
    * @param {ChatInputCommandInteraction} interaction
    */
   async execute(interaction) {
      const target = interaction.options.getMember("target");

      if (!target) {
         return interaction.reply({
            content: "Could not find the specified user.",
            ephemeral: true,
         });
      }

      const roles =
         target.roles.cache
            .filter((r) => r.name !== "@everyone")
            .sort((a, b) => b.position - a.position)
            .map((r) => r.name)
            .join(", ") || "No roles";

      const embed = new EmbedBuilder()
         .setColor("#CED9DE")
         .setTitle(`${target.user.username}'s Information`)
         .addFields(
            {
               name: "Username",
               value: `${target.user.username}#${target.user.discriminator}`,
            },
            {
               name: "ID",
               value: `${target.id}`,
            },
            {
               name: "Joined",
               value: `<t:${Math.floor(target.joinedTimestamp / 1000)}:R>`,
               inline: true,
            },
            {
               name: "Registered",
               value: `<t:${Math.floor(
                  target.user.createdTimestamp / 1000
               )}:R>`,
               inline: true,
            },
            {
               name: "Roles",
               value: roles,
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
         .setTimestamp();

      interaction.reply({
         embeds: [embed],
      });
   },
};
