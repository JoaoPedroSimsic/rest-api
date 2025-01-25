import jwt from 'jsonwebtoken';
import User from '../models/User';

class TokenController {
  async store(req, res) {
    const { email = '', password = '' } = req.body;
    if (!email || !password) {
      return res.status(401).json({
        errors: ['Invalid credentials'],
      });
    }
    const usr = await User.findOne({ where: { email } });
    if (!usr) {
      return res.status(401).json({
        errors: ['User does not exists'],
      });
    }
    if (!(await usr.passwordIsValid(password))) {
      return res.status(401).json({
        errors: ['Invalid password'],
      });
    }
    const { id } = usr;
    const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });
    return res.json({ token, usr: { name: usr.name, id, email } });
  }
}

export default new TokenController();
