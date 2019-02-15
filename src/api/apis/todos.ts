import * as express from 'express';
import * as apiHelper from '../apiHelper';
import Todo from '../../models/Todo';

const BASE_URL = '/todos';

export default class TodoApi {
  static bindRoutes(router: express.Router) {
    apiHelper.getAll(router, BASE_URL, Todo, true);
    apiHelper.getOne(router, BASE_URL, Todo, true);
    apiHelper.insertOne(router, BASE_URL, Todo, true);
  }
}
