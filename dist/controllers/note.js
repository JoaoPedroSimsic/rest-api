"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Note = require('../models/Note'); var _Note2 = _interopRequireDefault(_Note);

class NoteController {
  async index(req, res) {
    const note = await _Note2.default.findAll();
    return res.status(200).json(note);
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ['Missing ID'],
        });
      }

      const note = await _Note2.default.findByPk(id);
      if (!note) {
        return res.status(404).json({
          errors: ['Note does not exists'],
        });
      }
      return res.status(200).json(note);
    } catch (e) {
      return res.status(500).json({
        errors: e.errors
          ? e.errors.map((err) => err.message)
          : ['An unexpected error occurred'],
      });
    }
  }

  async store(req, res) {
    const { userId } = req;
    const data = req.body;
    try {
      if (!data.message) {
        return res.status(400).json({
          errors: ['Message is required'],
        });
      }
      const note = await _Note2.default.create({
        ...data,
        created_by: userId,
        updated_by: userId,
      });
      return res.status(201).json(note);
    } catch (e) {
      return res.status(500).json({
        errors: e.errors
          ? e.errors.map((err) => err.message)
          : ['An unexpected error occurred'],
      });
    }
  }

  async update(req, res) {
    try {
      const { userId } = req;
      const data = req.body;
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ['Missing ID'],
        });
      }

      if (!data.message) {
        return res.status(400).json({
          errors: ['Message is required'],
        });
      }

      const note = await _Note2.default.findByPk(id);

      if (!note) {
        return res.status(404).json({
          errors: ['Note does not exists'],
        });
      }
      const updatedNote = await note.update({
        ...data,
        updated_by: userId,
      });
      return res.status(200).json(updatedNote);
    } catch (e) {
      return res.status(500).json({
        errors: e.errors
          ? e.errors.map((err) => err.message)
          : ['An unexpected error occurred'],
      });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      if (!id || isNaN(id)) {
        return res.status(400).json({
          errors: ['Invalid or missing ID'],
        });
      }

      const note = await _Note2.default.findByPk(id);

      if (!note) {
        return res.status(404).json({
          errors: ['Note does not exists'],
        });
      }
      await note.destroy();
      return res.status(200).json({
        message: 'Note successfully deleted',
      });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors
          ? e.errors.map((err) => err.message)
          : ['An unexpected error occurred'],
      });
    }
  }
}

exports. default = new NoteController();
