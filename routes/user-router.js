const { Router } = require('express');
const { userAuthMiddleware } = require('../middleware/authorization-middleware');
const authenticationMiddleware = require('../middleware/authentication-middleware');
const { changePassword, viewProfile } = require('../service/user-service');
const userRouter = Router();

userRouter.get('/viewProfile/:id', authenticationMiddleware, userAuthMiddleware, viewProfile)
userRouter.patch('/changePassword/:id', authenticationMiddleware, userAuthMiddleware, changePassword)

module.exports = { userRouter }