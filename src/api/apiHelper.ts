import * as express from 'express';
import { Model, NotFoundError } from 'objection';
import { BadRequestError, UnauthorizedError } from '../Errors';
import * as jwtUtils from '../accounts/jwt';
import * as constants from '../constants';
import { validateInput } from './inputValidator';
import User from '../models/User';

/**
 * Gets the JWT string from the authorization header.
 * @param headerValue string of the form "Bearer xxxx.yyyy.zzzz"
 */
const parseToken = (headerValue: string) => {
  const [token] = headerValue.split(' ').reverse();
  return token;
};

/**
 * Helper function for authorizing users.
 * @param req HTTP request data
 * @param requireToken boolean indicating if the token is required
 */
const checkToken = (req, requireToken: boolean) => {
  if (requireToken) {
    const token = parseToken(req.get('Authorization'));

    let validationResult = null;

    try {
      validationResult = jwtUtils.validateToken(token);
    } catch (ex) {
      throw new UnauthorizedError(ex.message);
    }

    if (!validationResult) {
      throw new UnauthorizedError('Invalid token!');
    }

    return validationResult;
  }

  return {};
};

/**
 * Gets all entries in the database.
 * @param router express.Router
 * @param url string - root URL
 * @param model Model or a subclass
 * @param requireToken boolean indicating if authorization is required
 */
export const getAll = (
  router: express.Router,
  url: string,
  model: typeof Model,
  requireToken: boolean = false,
) => {
  router.get(url, async (req, res) => {
    try {
      checkToken(req, requireToken);
    } catch (ex) {
      throw ex;
    }

    const result = await model.query();
    res.send(result);
  });
};

/**
 * Gets one entry in the database by the 'id' property.
 * @param router express.Router
 * @param url string - root URL
 * @param model Model or a subclass
 * @param requireToken boolean indicating if authorization is required
 */
export const getOne = (
  router: express.Router,
  url: string,
  model: typeof Model,
  requireToken: boolean = false,
) => {
  router.get(`${url}/:id`, async (req, res) => {
    try {
      checkToken(req, requireToken);
    } catch (ex) {
      throw ex;
    }

    const id = parseInt(req.params.id, 10);

    if (!id || !Number.isInteger(id)) {
      throw new BadRequestError(`Invalid ${model.name} id!`);
    }

    const result = await model.query().where({ id }).first();
    if (!result) {
      throw new NotFoundError(`No such ${model.name}!`);
    }

    res.send(result);
  });
};

export const insertOne = (
  router: express.Router,
  url: string,
  model: typeof Model,
  requireToken: boolean = false,
) => {
  router.post(`${url}/add`, async (req, res) => {
    let userData = null;

    try {
      userData = checkToken(req, requireToken);
    } catch (ex) {
      throw ex;
    }

    const data = { ...req.body.data };

    if (!!userData && !!userData.sub) {
      const { sub: username } = userData;
      const user = await User.query().where({ username }).first();
      if (!!user) {
        data.userId = user.id;
      }
    }

    try {
      const inputIsValid = validateInput(data, model);
      if (!inputIsValid) {
        return new BadRequestError('Invalid data!');
      }
    } catch (ex) {
    }

    const result = await model.query().insert(data);

    res.send(result);
  });
};
