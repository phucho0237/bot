const mongoose = require("mongoose");

const config = require("../config");

async function connect() {
   try {
      await mongoose.connect(config.dbUrl);

      console.log("[DATABASE] Connected to database");
   } catch (err) {
      console.error(err);
   }
}

module.exports = connect;
