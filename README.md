# 🌐 Social Network App Backend API  [![MIT](https://img.shields.io/badge/License-MIT-blue)](#license)

---

[![Typing SVG](https://readme-typing-svg.demolab.com?font=Fira+Code&weight=700&size=24&duration=2000&pause=1000&width=435&lines=++Welcom+To+My+Project+;Social+Network+App+Backend+API)](https://git.io/typing-svg)

---


## Introduction

The Social Network App Backend API serves as the backbone for your social networking platform, enabling seamless communication between the frontend and the database. It provides a robust set of endpoints for managing users, thoughts, reactions, and friendships.


## Table of Contents
- [Welcome](#welcome-to-the-social-network-app-backend-api)
- [Introduction](#introduction)
- [Features](#features-)
- [Demo](#demo)
- [Getting Started](#getting-started-️)
  - [Installation](#installation)
  - [API Endpoints](#api-endpoints)
- [Database](#database-)
  - [Users Collection](#users-collection)
  - [Thoughts Collection](#thoughts-collection)
  - [Reactions Schema](#reactions-schema)
- [Dependencies](#dependencies-️)
- [Contributing](#contributing-)
- [Questions](#questions)
- [License](#license-)

## Features 🚀

- **User Management**: Create, retrieve, and update user information.
- **Thought Operations**: Perform CRUD operations on thoughts, including reactions and comments.
- **Friendship Interactions**: Add and remove friends, explore connections.

## Demo

- A live demo video can be found at this link: [HERE](https://github.com/Jakefred6/social-network-app/blob/master/demo/Walkthrough.mkv)
- ## OR
  <img src='demo\Walkthrough.gif'>

## Getting Started 🛠️

### Installation

1. Clone the Social Network App Backend API repository:
   ```bash
   git clone https://github.com/Jakefred6/social-network-app.git
   cd social-network-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your MongoDB database. Update connection details in `config/db.js`.

4. Start the server:
   ```bash
   npm start
   ```

### API Endpoints

#### Friends

- **POST /api/users/:userId/friends/:friendId**
  - Description: Add a new friend to a user's friend list.
  - Controller: `addFriend` in `friendController`
  - Example: `POST /api/users/123/friends/456`

- **DELETE /api/friends/remove-friend**
  - Description: Remove a friend from a user's friend list.
  - Controller: `removeFriend` in `friendController`
  - Example: `DELETE /api/friends/remove-friend`

#### Reactions

- **POST /api/reactions/:thoughtId**
  - Description: Create a new reaction for a specific thought.
  - Controller: `createReaction` in `reactionController`
  - Example: `POST /api/reactions/789`

- **GET /api/reactions/:reactionId**
  - Description: Get details of a specific reaction.
  - Controller: `getOneReaction` in `reactionController`
  - Example: `GET /api/reactions/321`

- **PUT /api/reactions/:reactionId**
  - Description: Update details of a specific reaction.
  - Controller: `updateReaction` in `reactionController`
  - Example: `PUT /api/reactions/321`

- **DELETE /api/reactions/:reactionId/thoughts/:thoughtId**
  - Description: Remove a reaction from a specific thought.
  - Controller: `deleteReaction` in `reactionController`
  - Example: `DELETE /api/reactions/321/thoughts/789`

#### Thoughts

- **GET /api/thoughts/**
  - Description: Get all thoughts.
  - Controller: `getAllThoughts` in `thoughtController`
  - Example: `GET /api/thoughts`

- **GET /api/thoughts/:thoughtId**
  - Description: Get details of a specific thought.
  - Controller: `getOneThought` in `thoughtController`
  - Example: `GET /api/thoughts/789`

- **POST /api/thoughts/**
  - Description: Create a new thought.
  - Controller: `createThought` in `thoughtController`
  - Example: `POST /api/thoughts`

- **PUT /api/thoughts/:thoughtId**
  - Description: Update details of a specific thought.
  - Controller: `updateThought` in `thoughtController`
  - Example: `PUT /api/thoughts/789`

- **DELETE /api/thoughts/:thoughtId**
  - Description: Delete a specific thought.
  - Controller: `deleteThought` in `thoughtController`
  - Example: `DELETE /api/thoughts/789`

#### Users

- **GET /api/users/**
  - Description: Get all users.
  - Controller: `getAllUsers` in `userController`
  - Example: `GET /api/users`

- **POST /api/users/**
  - Description: Create a new user.
  - Controller: `createUser` in `userController`
  - Example: `POST /api/users`

- **GET /api/users/:userId**
  - Description: Get details of a specific user by ID.
  - Controller: `getOneUser` in `userController`
  - Example: `GET /api/users/123`

- **DELETE /api/users/:userId**
  - Description: Delete a specific user by ID.
  - Controller: `deleteUser` in `userController`
  - Example: `DELETE /api/users/123`

- **PUT /api/users/:userId**
  - Description: Update details of a specific user by ID.
  - Controller: `updateUser` in `userController`
  - Example: `PUT /api/users/123`

### Database 📊

#### Users Collection

- **username**: String, unique, required. The username of the user.
- **email**: String, unique, required. The email address of the user.
- **thoughts**: Array of ObjectIds referencing the Thoughts collection. Thoughts posted by the user.
- **friends**: Array of ObjectIds referencing the Users collection. Users who are friends with the user.

#### Thoughts Collection

- **thoughtText**: String, required, min length: 1, max length: 280. The text content of the thought.
- **createdAt**: Date, default: current date and time. The timestamp when the thought was created.
- **username**: String, required. The username of the user who posted the thought.
- **reactions**: Array of objects following the Reaction schema. Reactions to the thought.

#### Reactions Schema

- **reactionId**: ObjectId, default: autogenerated by MongoDB. The unique identifier for the reaction.
- **reactionBody**: String, required, max length: 280. The text content of the reaction.
- **username**: String, required. The username of the user who created the reaction.
- **createdAt**: Date, default: current date and time. The timestamp when the reaction was created.

## Dependencies 🛠️

- [express](https://www.npmjs.com/package/express): Fast, unopinionated, minimalist web framework for Node.js.
- [mongoose](https://www.npmjs.com/package/mongoose): MongoDB object modeling tool.

## Contributing 🤝

Contributions are welcome! If you have ideas for improvements or find bugs, please open an issue.


## Questions
or any questions related to the repo, you can reach out to me at [Jakefred6@yahoo.com](mailto:Jakefred6@yahoo.com)

You can also find me on GitHub: [Jakefred6](https://github.com/Jakefred6/)

## License 📄 [![MIT](https://img.shields.io/badge/License-MIT-blue)](#license)

This project is licensed under the [MIT License](LICENSE).

##
```
Happy coding!
```
