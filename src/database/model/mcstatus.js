const { Schema, model } = require("mongoose");

const mcStatusSchema = new Schema({
   guildId: String,
   url: String,
});

module.exports = model("mcStatusSchema", mcStatusSchema);
