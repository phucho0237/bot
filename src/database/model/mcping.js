const { Schema, model } = require("mongoose");

const mcPingSchema = new Schema({
   guildId: String,
   url: String,
});

module.exports = model("mcPingSchema", mcPingSchema);
