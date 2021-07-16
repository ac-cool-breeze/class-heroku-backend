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
  .then(data => res.status(200).json(data))
  .catch(err =>
    res.status(500).json({
      message: err
    })
  );
})

router.post('/login', function(req, res, next) {
  console.log('/login hit:', req.body)
  db('users')
  .where({ name: `${req.body.name}`, password: `${req.body.password}`} )
  .select({name: `${req.body.name}`})
  .then(data => res.status(200).json(data))
  .catch(err =>
    res.status(500).json({
      message: err
    })
  );
})

module.exports = router;
