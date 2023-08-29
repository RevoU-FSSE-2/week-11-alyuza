const { Router } = require('express');
const authRouter = Router();
const { register, login } = require('../service/auth-service.js');
const authenticationMiddleware = require('../middleware/authentication-middleware.js');
const { adminAuthMiddleware } = require('../middleware/authorization-middleware.js');

authRouter.post('/login', login);
authRouter.post('/register', authenticationMiddleware, adminAuthMiddleware, register);

module.exports = authRouter;