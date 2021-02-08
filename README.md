# Redis rate-limiting example

![alt text](https://github.com/redis-developer/basic-redis-rate-limiting-demo-nodejs/blob/main/preview.png?raw=true)

## Prerequisites

-   Node - v12.19.0
-   NPM - v6.14.8
-   Docker - v19.03.13 (optional)

## How it works
This app has been build usigng `exoress-rate-limit` and `rate-limit-redis` library which will block connections from a client after surpassing certain amount of requests (default: 10) per time (default: 10 sec)

The application will return after each request the following headers. That will let the user know how many requests they have remaining before the run over the limit.

```
X-RateLimit-Limit: 10
X-RateLimit-Remaining: 9
```

On the 10th run server should return an HTTP status code of **429 Too Many Requests**

### Available commands

```
"PEXPIRE", "MULTI", "DEL", "PTTL", "EXEC", "DECR", "INCR"
```

## Local installation

```
git clone https://github.com/redis-developer/basic-redis-rate-limiting-demo-nodejs/

# copy file and set proper data inside
cp .env.example .env

# install dependencies
npm cache clean && npm install

# run docker compose or install redis manually
docker network create global
docker-compose up -d --build

npm run dev

```

## Deployment

To make deploys work, you need to create free account in https://redislabs.com/try-free/ and get Redis' instance informations - REDIS_ENDPOINT_URI and REDIS_PASSWORD. You must pass them as environmental variables.

### Google Cloud Run

[![Run on Google
Cloud](https://deploy.cloud.run/button.svg)](https://deploy.cloud.run/?git_repo=https://github.com/redis-developer/basic-redis-rate-limiting-demo-nodejs.git)

### Heroku

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

### Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Fredis-developer%2Fbasic-redis-rate-limiting-demo-nodejs&env=REDIS_ENDPOINT_URI,REDIS_PASSWORD)
