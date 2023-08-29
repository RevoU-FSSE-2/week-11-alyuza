require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const databaseMiddleware = require('./middleware/database-middleware');
const authRouter = require('./routes/auth-router.js');
const { adminRouter } = require('./routes/admin-router.js');
const { userRouter } = require('./routes/user-router.js');

app.use(express.json());
app.use(databaseMiddleware);

app.get('/', (req, res) => { res.send('PROJECT MILESTONE 2 - ALYUZA SATRIO PRAYOGO') });

app.use('/v1/auth', authRouter);
app.use('/v1/admin', adminRouter);
app.use('/v1/user', userRouter);

app.listen(port, () => {
    console.log(`Running on localhost: ${port}`);
})