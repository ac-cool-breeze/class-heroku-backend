var express = require('express');
var router = express.Router();

/* GET users listing. */

router.get('/', function(req, res, next) {
    knex
      .select('*')
      .from('messages')
      .then(data => res.status(200).json(data))
      .catch(err =>
        res.status(500).json({
          message:
            'problemo'
        })
      );
  });

module.exports = router;
