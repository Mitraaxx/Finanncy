const { createClient } = require('redis');

const redisUrl = process.env.REDIS_URL;
const redisClient = redisUrl ? createClient({ url: redisUrl }) : null;

if (redisClient) {
    redisClient.on('error', (err) => console.log('Redis Client Error', err));
}

async function connectRedis() {
    if (!redisClient) {
        console.log('REDIS_URL is not configured, cache is disabled');
        return;
    }

    try {
        if (!redisClient.isOpen) {
            await redisClient.connect();
        }
        console.log('Redis connected');
    } catch (error) {
        console.log('Redis connection failed, cache is disabled:', error.message);
    }
}

async function getCache(key) {
    if (!redisClient || !redisClient.isOpen) {
        return null;
    }

    try {
        return await redisClient.get(key);
    } catch (error) {
        console.log('Redis get skipped:', error.message);
        return null;
    }
}

async function setCache(key, ttl, value) {
    if (!redisClient || !redisClient.isOpen) {
        return;
    }

    try {
        await redisClient.setEx(key, ttl, value);
    } catch (error) {
        console.log('Redis set skipped:', error.message);
    }
}

async function deleteCache(key) {
    if (!redisClient || !redisClient.isOpen) {
        return;
    }

    try {
        await redisClient.del(key);
    } catch (error) {
        console.log('Redis delete skipped:', error.message);
    }
}

module.exports = {
    connectRedis,
    deleteCache,
    getCache,
    setCache,
};