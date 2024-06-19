# Application Daily Diet

## This application consists in control the users daily diet. NodeJS, Fastify, PostgreSQL, Docker, Vitest and Knex was used to build this application.

## Business rules

- [x] It can be possible to create an user
- [] It can be possible to identify an user on request calls
- [] It can be possible to registry a meal
- [] It can be possible to edit an existed meal
- [] It can be possible to delete a meal
- [] It can be possible to list all user's meals
- [] It can be possible to show up only one meal
- [] It can be possible to get user metrics

## Functional Requirements

- [x] To create an user it needs to pass the following data:
  - [x] User's name
  - [x] Email
  - [x] Password
- [] Password needs to be hashed
- [] User can only delete, read or edit meals created by them
- [] A meal to be registered needs to be with the follow infos:
  - [] Tile
  - [] Description
  - [] Date and hour
  - [] It's a diet meal or not
- [] The user metrics need to come listed with the following info:
  - [] Quantity of meals registered
  - [] Quantity of diet meals
  - [] Quantity of non-diet meals
  - [] Best streak of diet meals

## Non-functional Requirements

- [] To hash user's password it has to use bcript lib
- [] It'll be used PostgreSQL database
