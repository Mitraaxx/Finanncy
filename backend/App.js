require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { db } = require('./db/db')
const {readdirSync} = require('fs')
const { route } = require('./routes/transactions')
const app = express()
const { createClient } = require('redis');

const PORT = process.env.PORT


// middlewares
app.use(express.json())
app.use(cors())

// routes
readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route)))

app.get("/", (req, res) => {
    res.status(200).send("Server is up and running!");
});

const server = () => {
    db()
    app.listen(PORT, ()=>{
        console.log('listening to port:', PORT)
    })
}

server()

const redisClient = createClient({
  url: process.env.REDIS_URL,
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));

async function connectRedis() {
  await redisClient.connect();
  console.log('Cloud Redis connected');
}

connectRedis();

module.exports = redisClient;