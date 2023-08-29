const { Router } = require('express');
const { userAuthMiddleware } = require('../middleware/authorization-middleware');
const authenticationMiddleware = require('../middleware/authentication-middleware');
const { changePassword } = require('../service/user-service');
const userRouter = Router();

userRouter.patch('/changePassword/:id', authenticationMiddleware, userAuthMiddleware, changePassword)

module.exports = { userRouter }