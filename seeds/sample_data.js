const {USER_TABLE, TODO_TABLE} = require('./../constants/tables')

const TODO_LIST = [
  {
    title: "Buy bread"
  }, {
    title: "Pay rent"
  }, {
    title: "Take the dog for a walk"
  }
];

const USER_LIST = [
  {
    username: "pentti",
    name: "Pentti",
    lastName: "Placeholder"
  }, {
    username: "milla",
    name: "Milla",
    lastName: "Mallikas"
  }, {
    username: "kaija",
    name: "Kaija",
    lastName: "Koodari"
  }
];

exports.seed = async function (knex) {
  await knex(USER_TABLE).insert(USER_LIST);
  const users = await knex(USER_TABLE).select('*')

  const promises = users.map( user => {
    const userTodos = TODO_LIST.map(baseItem => {
      const userTodoDetails = {
        userId: user.id,
        description: `${user.name} remember: ${baseItem.title}`
      }
      return Object.assign(userTodoDetails, baseItem)
    })
    return knex(TODO_TABLE).insert(userTodos)
  });
  await Promise.all(promises)
  console.log('seed done')
};
