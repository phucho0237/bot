const { Events, CommandInteraction, Collection } = require("discord.js");

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

      if (!interaction.client.cooldowns.has(command.data.name)) {
         interaction.client.cooldowns.set(command.data.name, new Collection());
      }

      const now = Date.now();
      const timestamps = interaction.client.cooldowns.get(command.data.name);
      const cooldownAmount = (command.cooldown ?? 0) * 1000;

      if (timestamps.has(interaction.user.id)) {
         const expirationTime =
            timestamps.get(interaction.user.id) + cooldownAmount;

         if (now < expirationTime) {
            const expiredTimestamp = Math.round(expirationTime / 1000);

            return interaction.reply({
               content: `${expiredTimestamp}`,
               ephemeral: true,
            });
         }
      }

      timestamps.set(interaction.user.id, now);
      setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

      try {
         await command.execute(interaction);
      } catch (error) {
         console.error(error);
      }
   },
};
