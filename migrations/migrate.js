// 20210715155155_migrate.js

exports.up = function(knex) {
    return knex.schema.createTable('messages', table => {
      table.increments('id'); // adds an auto incrementing PK column
      table.string('message').notNullable();
      table.timestamps(true, true); // adds created_at and updated_at
    });
  };
  
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('messages');
};

exports.up = function(knex) {
    return knex.schema.createTable('users', table => {
      table.increments('id'); // adds an auto incrementing PK column
      table.string('name').notNullable();
      table.string('password').notNullable();
    });
  };

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users');
};

exports.up = function(knex) {
    return knex.schema.createTable('messages_users', table => {
      table.increments('id'); // adds an auto incrementing PK column
      table.integer('messages_id').notNullable();
      table.integer('users_id').notNullable();
    });
  };

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('messages_users');
};
  