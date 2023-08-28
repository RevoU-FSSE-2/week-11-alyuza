const { Router } = require('express')
const { register, login } = require('../service/auth-service.js')
const authRouter = Router()

authRouter.post('/login', login)
authRouter.post('/register', register)

module.exports = authRouter