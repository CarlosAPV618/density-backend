const express = require("express");
const cors = require("cors");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;

    this.paths = {
      posts: "/api/posts",
    };

    this.middlewares();
    this.setRoutes();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  setRoutes() {
    this.app.use(this.paths.posts, require("../routes/posts"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en el puerto ${this.port}`);
    });
  }
}

module.exports = Server;
