import Sequelize, { Model } from "sequelize";
import bcryptjs from "bcryptjs";

export default class User extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          defaultValue: "",
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: Sequelize.STRING,
          defaultValue: "",
          validate: {
            len: {
              args: [10, 50],
              msg: "Your name should be from 10 to 50 characters long",
            },
          },
        },
        email: {
          type: Sequelize.STRING,
          defaultValue: "",
          unique: {
            msg: "An account with this email already exists",
          },
          validate: {
            isEmail: {
              msg: "Please, enter a valid email",
            },
          },
        },
        password: {
          type: Sequelize.VIRTUAL,
          defaultValue: "",
          validate: {
            len: {
              args: [6, 50],
              msg: "The password must have 6 to 50 characters",
            },
          },
        },
        password_hash: {
          type: Sequelize.STRING,
          defaultValue: "",
        },
      },
      {
        sequelize,
      }
    );

    this.addHook("beforeSave", async (usr) => {
      if (usr.password) {
        usr.password_hash = await bcryptjs.hash(usr.password, 8);
      }
    });

    return this;
  }

  passwordCheck(password) {
    return bcryptjs.compare(password, this.password_hash);
  }
}
