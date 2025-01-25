import express from 'express';

import './database';

import homeRoutes from './routes/home';
import userRoutes from './routes/user';
import tokenRoutes from './routes/token';

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  routes() {
    this.app.use('/', homeRoutes);
    this.app.use('/user', userRoutes);
    this.app.use('/token', tokenRoutes);
  }
}

export default new App().app;
