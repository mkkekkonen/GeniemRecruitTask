import * as bcrypt from 'bcryptjs';
import { crypto } from '../../constants';

interface HashPasswordResult {
  password: string;
  hash: string;
}

export const hashPassword = async (password: string): Promise<HashPasswordResult> => {
  const hash = await bcrypt.hash(password, crypto.SALT_ROUNDS);
  return {
    password,
    hash,
  };
};

export const comparePassword = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};
