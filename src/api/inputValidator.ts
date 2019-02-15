import { Model } from 'objection';
import Todo from '../models/Todo';

const validateTodo = (data: any) => {
  const { title, userId } = data;
  return !!title && !!userId;
};

export const validateInput = (data: any, clazz: typeof Model): boolean => {
  if (clazz === Todo) {
    const res = validateTodo(data);
    return res;
  }

  return false;
};
