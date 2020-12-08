const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const redis = require('redis');
const RateLimit = require('express-rate-limit');
const RedisStore = require('rate-limit-redis');
const { promisify } = require('util');

require('dotenv').config();

const app = express();
const redisClient = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASS
});

redisClient.get = promisify(redisClient.get);
redisClient.set = promisify(redisClient.set);

app.use(bodyParser.json());
app.use(cors());

const pingEndpointController = {
    index(req, res) {
        return res.send('PONG');
    }
};

const setRedisRateLimitingController = {
    async index(req, res) {
        try {
            const { limit } = req.body;

            await redisClient.set('ratelimit', parseInt(limit));

            return res.send({ limit });
        } catch (err) {
            console.error(err);

            return res.sendStatus(500);
        }
    }
};

(async function () {
    const getLimiter = async (req, res, next) => {
        const limit = await redisClient.get('ratelimit');

        const limiter = new RateLimit({
            store: new RedisStore({
                client: redisClient,
                expiry: 10
            }),
            max: limit,
            windowMs: 10 * 1000
        });

        return limiter(req, res, next);
    };

    app.use('/', express.static(path.join(__dirname, './public')));

    app.get('/api/ping', getLimiter, (...args) => pingEndpointController.index(...args));
    app.put('/api/set-limit', (...args) => setRedisRateLimitingController.index(...args));

    app.listen(process.env.PORT, () => {
        console.log(`APP is listening on port: ${process.env.PORT}`);
    });
})();
