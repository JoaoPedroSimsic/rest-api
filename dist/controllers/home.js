"use strict";Object.defineProperty(exports, "__esModule", {value: true});class HomeController {
  async index(req, res) {
    res.status(200).json('Connected to the API');
  }
}

exports. default = new HomeController();
