"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

 class Note extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        message: {
          type: _sequelize2.default.STRING,
          defaultValue: '',
        },
        created_by: {
          type: _sequelize2.default.INTEGER,
          defaultValue: '',
        },
        updated_by: {
          type: _sequelize2.default.INTEGER,
          defaultValue: '',
        },
      },
      {
        sequelize,
      }
    );

    return this;
  }
} exports.default = Note;
