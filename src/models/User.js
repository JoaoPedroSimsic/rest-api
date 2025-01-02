import { Model, DataTypes } from 'sequelize';
import sequelize from '../../config/database';
import bcryptjs from 'bcryptjs';

class User extends Model {}
User.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [10, 50],
          msg: 'Your name should be from 10 to 50 characters long',
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'An account with this email already exists',
      },
      validate: {
        isEmail: {
          msg: 'Please, enter a valid email',
        },
      },
    },
    password: {
      type: DataTypes.VIRTUAL,
      validate: {
        len: {
          args: [6, 50],
          msg: 'The password must have 6 to 50 characters',
        },
      },
      set(value) {
        this.setDataValue('password', value);
        this.setDataValue('password_hash', bcryptjs.hashSync(value, 8));
      },
    },
    password_hash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'User',
  }
);

export default User;
