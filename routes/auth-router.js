const { Router } = require('express');
const authRouter = Router();
const { login } = require('../service/auth-service.js');

authRouter.post('/login', login);

module.exports = authRouter;