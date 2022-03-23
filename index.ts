import express from "express";
import routes from "./routes/routes";
import cors from "cors";
import "dotenv";
require("dotenv").config();

class App {
  readonly server: any;

  constructor() {
    this.server = express();

    this.middlewares();

    this.routes();
  }

  middlewares() {
    this.server.use(express.json());

    this.server.use(express.urlencoded({ extended: true }));

    this.server.use(cors());
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
