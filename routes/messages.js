var express = require('express');
var router = express.Router();
const db = require('../db')
/*const knex = require('knex')({
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
const getUserId=(username)=>{
  return (db('users')
  .where({ username: `${username}`})
  .select('id'))
}


router.get('/', function(req, res, next) {
    db.select('*')
      .from('messages')
      .then(data => res.status(200).json(data))
      .catch(err =>
        res.status(500).json({
          message: err
        })
      );
  });

// takes username and message
router.post('/postmessage', function(req,res,next){
  console.log('messages post:', req.body)
  let userId = getUserId(req.body.username)
  db('messages')
  .insert({ message : `${req.body.message}`})
  .then(res.status(200))
})

module.exports = router;
