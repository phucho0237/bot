module.exports = (client) => {
   process.on("unhandledRejection", (reason, promise) => {
      console.error("Unhandled Rejection at:", promise, "reason:", reason);
   });

   process.on("uncaughtException", (err) => {
      console.error("Uncaught Exception thrown:", err);
   });

   process.on("uncaughtExceptionMonitor", (err) => {
      console.error("Uncaught Exception (Monitor):", err);
   });

   process.on("warning", (warn) => {
      console.warn("Warning:", warn);
   });
};
