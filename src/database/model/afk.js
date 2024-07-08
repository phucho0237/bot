const { Schema, model } = require("mongoose");

const afkSchema = new Schema({
   userId: String,
   reason: String,
   timestamp: Date,
});

module.exports = model("afk", afkSchema);
