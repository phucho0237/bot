const fs = require("node:fs");
const { REST, Routes } = require("discord.js");

const config = require("../config");

module.exports = (client) => {
   let cmdArray = [];

   const cmdDir = fs.readdirSync("./src/commands");

   for (const folder of cmdDir) {
      const cmdFiles = fs
         .readdirSync(`./src/commands/${folder}`)
         .filter((f) => f.endsWith(".js"));

      for (const file of cmdFiles) {
         const command = require(`../commands/${folder}/${file}`);

         if ("data" in command && "execute" in command) {
            client.commands.set(command.data.name, command);
            cmdArray.push(command.data.toJSON());
         } else {
            continue;
         }
      }
   }

   const rest = new REST().setToken(config.botToken);

   (async () => {
      try {
         await rest.put(Routes.applicationCommands(config.botClientId), {
            body: cmdArray,
         });

         console.log("[HANDLER] Loaded all command(s)");
      } catch (err) {
         console.error(err);
      }
   })();
};
