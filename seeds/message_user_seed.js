// seeds/initial_movies.js

  exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('messages_users').del()
      .then(function () {
        // Inserts seed entries
        return knex('users').insert([
          {id: 1, messages_id: 1, users_id: 1},
          {id: 2, messages_id: 2, users_id: 3},
          {id: 3, messages_id: 3, users_id: 2},
        ]);
      });
  };