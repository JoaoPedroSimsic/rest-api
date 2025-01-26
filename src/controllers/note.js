import Note from '../models/Note';

class NoteController {
  async index(req, res) {
    const note = await Note.findAll();
    res.json(note);
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ['Missing ID'],
        });
      }

      const note = await Note.findByPk(id);
      if (!note) {
        return res.status(400).json({
          errors: ['Note does not exists'],
        });
      }
      return res.json(note);
    } catch (e) {
      return res.status(400).json({
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
      const note = await Note.create({
        ...data,
        created_by: userId,
        updated_by: userId,
      });
      return res.json(note);
    } catch (e) {
      return res.status(400).json({
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

      const note = await Note.findByPk(id);

      if (!note) {
        return res.status(400).json({
          errors: ['Note does not exists'],
        });
      }
      const updatedNote = await note.update({
        ...data,
        updated_by: userId,
      });
      return res.json(updatedNote);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors
          ? e.errors.map((err) => err.message)
          : ['An unexpected error occurred'],
      });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ['Missing ID'],
        });
      }

      const note = await Note.findByPk(id);

      if (!note) {
        return res.status(400).json({
          errors: ['Note does not exists'],
        });
      }
      await note.destroy();
      return res.json({
        deleted: true,
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

export default new NoteController();
