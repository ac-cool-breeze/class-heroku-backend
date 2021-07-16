var express = require('express');
var router = express.Router();
const db = require('../db')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/newuser', function(req, res, next) {
  console.log(req.body)
  db('users')
  .insert({name: `${req.body.name}`, password: `${req.body.password}`})
  .onConflict(res.send('Error on user create.').status(400))
  .then(res.send('User created.').status(200))
})

router.post('/login', function(req, res, next) {
  console.log('/login hit:', req.body)
  db('users')
  .where({ name: `${req.body.name}`, password: `${req.body.password}`} )
  .select({name: `${req.body.name}`})
  .then(res.status(200))
})

module.exports = router;
