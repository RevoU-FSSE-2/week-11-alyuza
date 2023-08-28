const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { JWT_SIGN } = require('../config/jwt.js')

// ========================== REGISTER =========================
const validRoles = ["user"]
const register = async (req, res) => {
    const { fullName, jobPosition, department, salary, joinDate, username, password, role } = req.body
    try {
        if (!username || username.trim() === "" || !/^[a-zA-Z0-9.]+$/.test(username)) {
            res.status(400).json({ message: "Username can't be blank and doesn't allow to enter of any special character except dot (.)" });
            return;
        }
        if (!password || password.length < 8) {
            res.status(400).json({ message: "Password must be at least 8 characters long" });
            return;
        }
        if (!validRoles.includes(role)) {
            throw new Error("Invalid role, can register with role 'user' only")
        }

        const user = await req.db.collection('users').findOne({ username })
        if (user) {
            throw new Error('Sorry, username already exists')
        }
        const hashedPassword = await bcrypt.hash(password, 10) //hashedpass : password yg sudah di encrypted
        const newUser = await req.db.collection('users').insertOne({ fullName, jobPosition, department, salary, joinDate, username, password: hashedPassword, role })
        res.status(200).json({
            message: `User ${username} successfully registered`,
            ID: newUser
        })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// ========================== LOGIN =========================
const login = async (req, res) => {
    const { username, password } = req.body
    const user = await req.db.collection('users').findOne({ username })
    if (!user) {
        res.status(400).json({ error: 'Username is not registered' });
        return;
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if (isPasswordCorrect) {
        const token = jwt.sign({ username: user.username, role: user.role }, JWT_SIGN)
        res.status(200).json({
            message: 'Successfully logged in',
            data: token
        });
    } else {
        res.status(400).json({ error: 'Password is incorrect' });
    }
}

module.exports = {
    register,
    login
}