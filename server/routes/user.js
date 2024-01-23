const express = require('express');
const route = express.Router();

const { signup } = require('../controllers/user');

route.post('/signup', signup);

module.exports = route; 