import User from '../models/user';

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
}

export default new UserController();
