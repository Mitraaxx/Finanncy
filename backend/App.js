require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { db } = require('./db/db')
const { connectRedis } = require('./db/redisClient')
const {readdirSync} = require('fs')
const app = express()

const PORT = process.env.PORT


// middlewares
app.use(express.json())
app.use(cors())

// routes
readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route)))

app.get("/", (req, res) => {
    res.status(200).send("Server is up and running!");
});

const server = async () => {
    await db()
    await connectRedis()
    app.listen(PORT, ()=>{
        console.log('listening to port:', PORT)
    })
}

server()