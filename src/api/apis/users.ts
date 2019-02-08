import * as express from 'express';
import * as apiHelper from '../apiHelper';
import User from '../../models/User';

export default class UserApi {
  static bindRoutes(router: express.Router) {
    apiHelper.getAll(router, '/users', User);
  }
}
