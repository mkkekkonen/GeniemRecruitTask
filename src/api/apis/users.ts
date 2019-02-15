import * as express from 'express';
import * as apiHelper from '../apiHelper';
import * as passwordUtils from '../../accounts/password';
import * as jwtUtils from '../../accounts/jwt';
import User from '../../models/User';
import { ConflictError, NotFoundError, UnauthorizedError } from '../../Errors';
import * as constants from '../../constants';

const checkIfUserExists = async (username: string): Promise<boolean> => {
  const queryResult = await User.query().where({ username });
  return queryResult.length > 0;
};

const addUser = async (
    username: string,
    name: string,
    lastName: string,
    password: string,
) => {
  const passwordResult = await passwordUtils.hashPassword(password);
  const result = await User.query().insert({
    username,
    name,
    lastName,
    passwordHash: passwordResult.hash,
  });
  return result;
};

export default class UserApi {
  static bindRoutes(router: express.Router) {
    apiHelper.getAll(router, '/users', User);

    router.post('/users/new', async (req, res) => {
      const username = req.body.username;
      const name = req.body.name;
      const lastName = req.body.lastName;
      const password = req.body.password;

      const userExists = await checkIfUserExists(username);
      if (userExists) {
        throw new ConflictError('User already exists!');
      }

      const result = addUser(username, name, lastName, password);
      res.send(result);
    });

    router.post('/users/login', async (req, res) => {
      const username = req.body.username;
      const password = req.body.password;

      const user = await User.query().where({ username }).first();
      if (!user) {
        throw new NotFoundError('No such user!');
      }

      const passwordsMatch = await passwordUtils.comparePassword(password, user.passwordHash);

      if (!passwordsMatch) {
        throw new UnauthorizedError('Invalid password!');
      }

      const token = jwtUtils.issueToken(username);

      res.send({ token });
    });
  }
}
