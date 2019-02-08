import * as express from 'express';
import UserApi from './apis/users';
import TodoApi from './apis/todos';

export default (router: express.Router) => {
  [UserApi, TodoApi].forEach((api) => {
    api.bindRoutes(router);
  });
};
