import { Model } from 'objection';
import { tables } from '../../constants';
import { join } from 'path';

export default class User extends Model {
  static tableName = tables.USER_TABLE;

  readonly id!: number;
  username: string;
  name?: string;
  passwordHash!: string;

  static jsonSchema = {
    type: 'object',
    required: ['username', 'passwordHash'],

    properties: {
      id: { type: 'integer' },
      name: { type: 'string', minLength: 1, maxLength: 255 },
      passwordHash: { type: 'string', minLength: 1, maxLength: 1023 },
    },
  };
}
