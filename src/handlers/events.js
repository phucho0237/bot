const fs = require("node:fs");

module.exports = (client) => {
   const eventDir = fs.readdirSync("./src/events");

   for (const folder of eventDir) {
      const eventFiles = fs
         .readdirSync(`./src/events/${folder}`)
         .filter((f) => f.endsWith(".js"));

      for (const file of eventFiles) {
         const event = require(`../events/${folder}/${file}`);

         if ("execute" in event) {
            if (event.once) {
               client.once(event.name, (...args) => event.execute(...args));
            } else {
               client.on(event.name, (...args) => event.execute(...args));
            }
         } else {
            continue;
         }
      }
   }

   console.log("[HANDLER] Loaded all event(s)");
};
