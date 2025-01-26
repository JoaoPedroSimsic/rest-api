import Sequelize, { Model } from 'sequelize';

export default class Note extends Model {
  static init(sequelize) {
    super.init(
      {
        message: {
          type: Sequelize.STRING,
          defaultValue: '',
        },
        created_by: {
          type: Sequelize.INTEGER,
          defaultValue: '',
        },
        updated_by: {
          type: Sequelize.INTEGER,
          defaultValue: '',
        },
      },
      {
        sequelize,
      }
    );

    return this;
  }
}
