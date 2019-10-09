const SessionService = require("./app/services/SessionService");

module.exports = (app) => {
  app.use("/sessions", SessionService);
  
  app.use("/dashboard", (req, res) => {
    return res.status(200).send();
  });
}
