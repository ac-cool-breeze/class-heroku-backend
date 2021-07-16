const environment = process.env.NODE_ENV || 'productions';   
const configuration = require('../knexfile')[environment];   
const db = require('knex')(configuration);
module.exports = db