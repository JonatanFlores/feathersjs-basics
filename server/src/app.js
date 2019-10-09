const dotenv = require("dotenv");
const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');

class AppController {
  constructor() {
    // Setup express to use feathers
    this.express = express(feathers());

    this.dotenv();
    this.middlewares();
    this.services();
    this.run();
  }

  dotenv() {
    dotenv.config({
      path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
    });
  }

  middlewares() {
    // Parse JSON
    this.express.use(express.json());
    // Configure Socket.io realtime APIs
    this.express.configure(socketio());
    // Enable REST services
    this.express.configure(express.rest());
    // Setup error handler
    this.express.use(express.errorHandler());
    // Setup static files
    this.express.use(express.static('public'));
  }

  services() {
    require("./services")(this.express);
  }

  run() {
    // New connections connect to stream channel
    this.express.on('connection', conn => this.express.channel('stream').join(conn))
    // Publish events to stream
    this.express.publish(() => this.express.channel('stream'));
  }
}

module.exports = new AppController().express;
