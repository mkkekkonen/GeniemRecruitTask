import * as express from 'express';
import { Model, NotFoundError } from 'objection';
import { BadRequestError } from '../Errors';

/**
 * Gets all entries in the database.
 * @param router express.Router
 * @param url string - root URL
 * @param model Model or a subclass
 */
export const getAll = (router: express.Router, url: string, model: typeof Model) => {
  router.get(url, async (req, res) => {
    const result = await model.query();
    res.send(result);
  });
};

/**
 * Gets one entry in the database by the 'id' property.
 * @param router express.Router
 * @param url string - root URL
 * @param model Model or a subclass
 */
export const getOne = (router: express.Router, url: string, model: typeof Model) => {
  router.get(`${url}/:id`, async (req, res) => {
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
