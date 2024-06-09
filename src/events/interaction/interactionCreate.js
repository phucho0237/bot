const { Events, CommandInteraction } = require("discord.js");

module.exports = {
   name: Events.InteractionCreate,
   /**
    *
    * @param {CommandInteraction} interaction
    * @returns
    */
   async execute(interaction) {
      if (!interaction.isChatInputCommand()) return;

      const command = interaction.client.commands.get(interaction.commandName);

      if (!command)
         return interaction.reply({
            content: "This command has outdated",
            ephemeral: true,
         });

      try {
         await command.execute(interaction);
      } catch (error) {
         console.error(error);
      }
   },
};
