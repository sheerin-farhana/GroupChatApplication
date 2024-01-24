const express = require('express');
const route = express.Router();

const { signup, login } = require('../controllers/user');
const { authenticate } = require('../middleware/auth');
const { postMessage } = require('../controllers/message');

route.post('/signup', signup);
route.post('/login', login);

route.post('/message', authenticate, postMessage);

module.exports = route; 