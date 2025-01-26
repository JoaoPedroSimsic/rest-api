"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

class UserController {
  async store(req, res) {
    try {
      const newUser = await _User2.default.create(req.body);
      const { id, name, email } = newUser;
      return res.json({ id, name, email });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async index(req, res) {
    try {
      const usr = await _User2.default.findAll({ attributes: ['id', 'name', 'email'] });
      return res.json(usr);
    } catch (e) {
      return res.json(null);
    }
  }

  async show(req, res) {
    try {
      const usr = await _User2.default.findByPk(req.params.id);
      const { id, name, email } = usr;
      return res.json({ id, name, email });
    } catch (e) {
      return res.json(null);
    }
  }

  async update(req, res) {
    try {
      const usr = await _User2.default.findByPk(req.userId);
      if (!usr) {
        return res.status(400).json({
          errors: ['User does not exists'],
        });
      }
      const newData = await usr.update(req.body);
      const { id, name, email } = newData;
      return res.json({ id, name, email });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async delete(req, res) {
    try {
      const usr = await _User2.default.findByPk(req.userId);
      if (!usr) {
        return res.status(400).json({
          errors: ['User does not exists'],
        });
      }
      await usr.destroy();
      return res.json(null);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

exports. default = new UserController();
