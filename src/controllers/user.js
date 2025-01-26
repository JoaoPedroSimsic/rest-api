import User from '../models/User';

class UserController {
  async store(req, res) {
    try {
      const newUser = await User.create(req.body);
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
      const usr = await User.findAll({ attributes: ['id', 'name', 'email'] });
      return res.json(usr);
    } catch (e) {
      return res.json(null);
    }
  }

  async show(req, res) {
    try {
      const usr = await User.findByPk(req.params.id);
      const { id, name, email } = usr;
      return res.json({ id, name, email });
    } catch (e) {
      return res.json(null);
    }
  }

  async update(req, res) {
    try {
      const usr = await User.findByPk(req.userId);
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
      const { id } = req.params;
      const usr = await User.findByPk(id);
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

export default new UserController();
