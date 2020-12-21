# Redis rate-limiting example

![alt text](https://github.com/RemoteCraftsmen/redis-rate-limiting/blob/main/preview.png?raw=true)

## Prerequisites

-   Node - v12.19.0
-   NPM - v6.14.8
-   Docker - v19.03.13 (optional)

## Development

```
git clone https://github.com/RemoteCraftsmen/redis-rate-limiting/

# copy file and set proper data inside
cp .env.example .env

# install dependencies
npm cache clean && npm install

# run docker compose or install redis manually
docker network create global
docker-compose up -d --build

npm run dev

```

## Google cloud run deployment

[![Run on Google
Cloud](https://deploy.cloud.run/button.svg)](https://deploy.cloud.run/?git_repo=https://github.com/RemoteCraftsmen/redis-rate-limiting/tree/three-deploy-buttons)

## Heroku deployment (1 click install)

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?env[WEB_CONCURRENCY]=1)

## Vercel deployment

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2FRemoteCraftsmen%2Fredis-rate-limiting%2Ftree%2Fthree-deploy-buttons&env=REDIS_ENDPOINT_URI,REDIS_PASSWORD)
