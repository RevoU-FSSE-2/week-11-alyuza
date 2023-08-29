const { Router } = require('express');
const adminRouter = Router();
const { getAllUsers, getUser, updateUser, deleteUser } = require('../service/admin-service');
const authenticationMiddleware = require('../middleware/authentication-middleware');
const { adminAuthMiddleware } = require('../middleware/authorization-middleware');

adminRouter.get('/getAllUsers', authenticationMiddleware, adminAuthMiddleware, getAllUsers)
adminRouter.get('/getUser/:id', authenticationMiddleware, adminAuthMiddleware, getUser)
adminRouter.put('/update/:id', authenticationMiddleware, adminAuthMiddleware, updateUser)
adminRouter.delete('/delete/:id', authenticationMiddleware, adminAuthMiddleware, deleteUser)

module.exports = { adminRouter }
