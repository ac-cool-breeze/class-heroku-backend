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
  return (
    db('users')
    .where({ username: `${username}`})
    .select('id')
  )
}

router.get('/', function(req, res, next) {
  // get all from messages_user
  // get username from users where id is in messages_user
  // get message from messages where id is in messages_user
  /*
    SELECT users.name, messages.message FROM users
    LEFT JOIN messages_user ON users.id = messages_user.user_id
    LEFT JOIN messages ON messages.id = messages_user.message_id
*/

    // db.select('users.name, messages.message')
    //   .from('users')
    //   .leftJoin('messages_user', 'users.id', 'messages_user.user_id' )
    //   .then(data => res.status(200).json(data))
    //   .catch(err =>
    //     res.status(500).json({
    //       message: err
    //     })
    //   );

    db.select('*')
      .from('messages')
      .then(data => res.status(200).json(data))
      .catch(err =>
        res.status(500).json({
          message: err
        })
      );
  });

router.get('/dev', function(req, res, next) {
    // get all from messages_user
    // get username from users where id is in messages_user
    // get message from messages where id is in messages_user
    /*
      SELECT users.name, messages.message FROM users
      LEFT JOIN messages_user ON users.id = messages_user.user_id
      LEFT JOIN messages ON messages.id = messages_user.message_id
  */
  

      db.select('*').from('users')
        //.leftJoin('messages_user', 'users.id', 'messages_users.users_id' )
        .then(data => res.status(200).json(data))
        .catch(err =>
          res.status(500).json({
            message: err
          })
        );


    });




router.get('/alljoin', function(req,res,next){
  db.select('*')
  .from('messages_users')
  .then(data => res.status(200).json(data))
  .catch(err =>
    res.status(500).json({
      message: err
    })
  );
})


// takes username and message
router.post('/postmessage', function(req,res,next){
  console.log('messages post:', req.body)

  db('users')   // first select user id
  .where({ name: `${req.body.username}`})
  .select('id')
  .then( userId => {  // then insert message returning the id
    db('messages')
    .insert({ 
      message : `${req.body.message}`
    })
    .returning('id')
    .then(messageId => {  // finally insert into the join table
      console.log('messageId: ', messageId[0])
      console.log('userId: ', userId[0].id)
      db('messages_users')
      .insert({ 
        messages_id: `${messageId[0]}`, 
        users_id:`${userId[0].id}`
      })
      .then(data => res.status(200).json(data))
      .catch(err =>
        res.status(500).json({
          message: err
        })
      );
    })
  })
  
})

module.exports = router;
