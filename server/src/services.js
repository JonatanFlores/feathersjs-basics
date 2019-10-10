const formatRestApiErrors = require("./app/middlewares/formatRestApiErrors");
const SessionService = require("./app/services/SessionService");

module.exports = app => {
  app.use("/sessions", SessionService, formatRestApiErrors);

  app.use("/dashboard", (req, res) => {
    return res.status(200).send();
  });
};
