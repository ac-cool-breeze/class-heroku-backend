exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('messages').del()
      .then(function () {
        // Inserts seed entries
        return knex('messages').insert([
          {id: 1, message: 'you are now connected to an unsecure chat...'},
          {id: 2, message: 'party on Andrew.'},
          {id: 3, message: 'party on Alex.'},
        ]);
      });
  };