const { Router } = require('express');
const adminRouter = Router();
const { getAllUsers, getUser, updateUser, deleteUser } = require('../service/admin-service');
const authenticationMiddleware = require('../middleware/authentication-middleware');
const { adminAuthMiddleware } = require('../middleware/authorization-middleware');
const { register } = require('../service/auth-service');

adminRouter.get('/getAllUsers', authenticationMiddleware, adminAuthMiddleware, getAllUsers)
adminRouter.get('/getUser/:id', authenticationMiddleware, adminAuthMiddleware, getUser)
adminRouter.post('/register', authenticationMiddleware, adminAuthMiddleware, register)
adminRouter.put('/update/:id', authenticationMiddleware, adminAuthMiddleware, updateUser)
adminRouter.delete('/delete/:id', authenticationMiddleware, adminAuthMiddleware, deleteUser)

module.exports = { adminRouter }
