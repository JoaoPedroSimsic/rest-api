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
          type: Sequelize.STRING,
          defaultValue: '',
        },
        updated_by: {
          type: Sequelize.STRING,
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
