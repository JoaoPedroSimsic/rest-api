import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import User from '../models/User';
import Note from '../models/Note';

const models = [User, Note];

const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));
