# Geniem backend recruit task

This is a backend recruit task based on [objection.js typescript example](https://github.com/Vincit/objection.js/tree/master/examples/express-ts)

This is the beginning of a very simple express todo - app backend that contains two tables, users and todo - items.

Feel free to change the folder stucture or the express app setup itself.

The app contains initial data and few example endpoints. 

# Basic setup

Make sure you have [NodeJS](https://nodejs.org/en/) and Git installed.

1. Clone the repo by running `git@github.com:devgeniem/backend-recruit-task.git`.
2. Run `npm run setup`. This installs the dependencies, sets up a SQLite db and creates some initial data.

# Goals

The basic task is to have a simple API that allows the API consumer to create todos for different users. The challenge is
that the API should actually recognise the users and only allow a user to operate on the given user's todos.

We have provided some basic setup that is required to achieve this: password hashing and checking and token issuing and checking.
The tokens issued by the token issuer function are by default valid for one hour.

## To get you started

Here are some things you should probably consider
1. The users' password hashes should be stored in the database.
1. There should be a login mechanism (endpoint) where a user can "log in" with their username and password and receive an access token.
1. On incoming requests, the user should be identified by the token
1. You should enforce that a user can not operate on another user's data (the todos).

If and when you need to modify the relations, you should probably create a new [knex migration](https://knexjs.org/#Migrations).

---
**NOTE about scope and JWTs!**

Please note that you're not required to come up with a production-ready authentication/authorization system. A simple system will do.
For example, you're not required to store a user's token history or provide token renewal methods or anything like that. It is sufficient
that the API can issue an access token in exchange of a user's credentials, and then it's the client's responsibility to keep that
token for further use.

---

## Criteria
There are of course many ways you can perform the required task, and you should feel free to use one that you like. However,
the overall cleanliness (architecture and code) of the solution should be considered important.

## Extras

These aren't in any way necessary, but extra points are awarded for the following tasks

1. Create a TodoList model, that the Todos are attached to (and the TodoList is then attached to a User).
1. Create an endpoint where an entire TodoList can be created at once (with all its Todos).
1. Host this in heroku or similar platform as a service - provider


# Readings

1. [Express.js](https://expressjs.com/)
1. [Objection.js](https://vincit.github.io/objection.js/).
1. [Json Web Tokens](jwt.io)
1. [knex.js](https://knexjs.org/).

# returning your work

To return your work for evaluation, either provide us with a github - link or just email the project back in a zip file.

