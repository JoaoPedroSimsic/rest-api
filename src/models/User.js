import Sequelize, { Model } from 'sequelize';
import bcryptjs from 'bcryptjs';

export default class User extends Model {
  static init(sequelize) {
    console.log('model user read');
    super.init(
      {
        name: {
          type: Sequelize.STRING,
          defaultValue: '',
          validate: {
            len: {
              args: [3, 50],
              msg: 'Name must have 3 to 50 characters',
            },
          },
        },
        email: {
          type: Sequelize.STRING,
          defaultValue: '',
          unique: {
            msg: 'An accont with this email already exists',
          },
          validate: {
            isEmail: {
              msg: 'Invalid email',
            },
          },
        },
        password_hash: {
          type: Sequelize.STRING,
          defaultValue: '',
        },
        password: {
          type: Sequelize.VIRTUAL,
          defaultValue: '',
          validate: {
            len: {
              args: [6, 50],
              msg: 'Password must have 6 to 50 characters',
            },
          },
        },
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async (usr) => {
      if (usr.password) {
        usr.password_hash = await bcryptjs.hash(usr.password, 8);
      }
    });

    return this;
  }

  passwordIsValid(password) {
    return bcryptjs.compare(password, this.password_hash);
  }
}
