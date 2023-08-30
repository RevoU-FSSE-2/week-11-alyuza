const { Router } = require('express');
const { userAuthMiddleware } = require('../middleware/authorization-middleware');
const { changePassword, viewProfile } = require('../service/user-service');
const userRouter = Router();

userRouter.get('/viewProfile/:id', userAuthMiddleware, viewProfile)
userRouter.patch('/changePassword/:id', userAuthMiddleware, changePassword)

module.exports = { userRouter }