# Application Daily Diet

## This application consists in control the users daily diet. NodeJS, Fastify, PostgreSQL, Docker, Vitest and Knex was used to build this application.

## Business rules

- [x] It can be possible to create an user
- [] It can be possible to identify an user on request calls
- [x] It can be possible to registry a meal
- [x] It can be possible to edit an existed meal
- [x] It can be possible to delete a meal
- [] It can be possible to list all user's meals
- [x] It can be possible to show up only one meal
- [] It can be possible to get user metrics

## Functional Requirements

- [x] To create an user it needs to pass the following data:
  - [x] User's name
  - [x] Email
  - [x] Password
- [x] Password needs be hashed
- [] User can only delete, read or edit meals created by them
- [x] A meal to be registered needs to be with the follow infos:
  - [x] Title
  - [x] Description
  - [x] Date and hour
  - [x] It's a diet meal or not
- [] The user metrics need to come listed with the following info:
  - [] Quantity of meals registered
  - [] Quantity of diet meals
  - [] Quantity of non-diet meals
  - [] Best streak of diet meals

## Non-functional Requirements

- [x] To hash user's password it has to use bcript lib
- [x] It'll be used PostgreSQL database
