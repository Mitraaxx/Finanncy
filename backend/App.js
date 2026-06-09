require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { db } = require('./db/db')
const { connectRedis } = require('./db/redisClient')
const path = require('path')
const {readdirSync} = require('fs')
const app = express()

const PORT = process.env.PORT
const publicPath = path.join(__dirname, 'public')
const routesPath = path.join(__dirname, 'routes')


// middlewares
app.use(express.json())
app.use(cors())

// routes
readdirSync(routesPath).map((route) => app.use('/api/v1', require(path.join(routesPath, route))))

// serve the frontend build from backend/public
app.use(express.static(publicPath))

app.get('/health', (req, res) => {
    res.status(200).send('Server is up and running!');
});

app.get('*', (req, res) => {
    if (req.path.startsWith('/api/')) {
        return res.status(404).json({ message: 'API route not found' });
    }

    res.sendFile(path.join(publicPath, 'index.html'));
});

const server = async () => {
    await db()
    await connectRedis()
    app.listen(PORT, ()=>{
        console.log('listening to port:', PORT)
    })
}

server()