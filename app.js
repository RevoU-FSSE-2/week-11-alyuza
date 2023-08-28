require('dotenv').config();
const express = require('express')
const app = express();
const authRouter = require('./routes/auth-router.js');
const databaseMiddleware = require('./middleware/database-middleware');
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(databaseMiddleware);

app.get('/', (req, res) => {res.send('PROJECT MILESTONE 2 - ALYUZA SATRIO PRAYOGO')})
app.use('/auth', authRouter)

app.listen(port, () => {
    console.log(`Running on localhost: ${port}`)
})