var express = require('express');
var router = express.Router();
const knex = require('knex')({
    client: 'pg',
    connection: process.env.DATABASE_URL,
    searchPath: ['knex', 'public'],
  });

/*
require('knex')({
  client: 'pg',
  connection: 'postgres://user:pass@localhost:5432/dbname'
})

*/


/* GET users listing. */

router.get('/', function(req, res, next) {
    knex
      .select('*')
      .from('messages')
      .then(data => res.status(200).json(data))
      .catch(err =>
        res.status(500).json({
          message: err
        })
      );
  });

module.exports = router;
