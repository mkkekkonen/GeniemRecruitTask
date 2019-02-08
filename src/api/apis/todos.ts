import * as express from 'express';
import * as apiHelper from '../apiHelper';
import Todo from '../../models/Todo';

export default class TodoApi {
  static bindRoutes(router: express.Router) {
    apiHelper.getAll(router, '/todos', Todo);
    apiHelper.getOne(router, '/todos', Todo);
  }
}
