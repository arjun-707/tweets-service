# Tweets Service

This service consist of two parts i.e APIs and Worker
APIs: Register, Login, Logout, createTask, listTask, completedTask
Worker: worker/consumer/recentTweets

## Prerequisite
* Node.Js (12.0^)
* MongoDB

## Quick Start

To run this project, simply clone:

```bash
git clone 
```

## Manual Work

Install the dependencies:

```bash
npm install
```

Set the environment variables:

```bash
cp .env.example .env

# open .env and modify the environment variables (if needed)
```

## Environment Variables

The environment variables can be found and modified in the `.env` file. They come with these default values:

```bash
# Port number
PORT=3000

# URL of the Mongo DB
MONGODB_URL=mongodb://127.0.0.1:27017/tweets-service

# JWT
# JWT secret key
JWT_SECRET=thisisaticketsystemsecret
# Number of minutes after which an access token expires
JWT_ACCESS_EXPIRATION_MINUTES=30
# Number of days after which a refresh token expires
JWT_REFRESH_EXPIRATION_DAYS=30

# Twitter credentials
TWITTER_CONSUMER_KEY=<CONSUMER-KEY>
TWITTER_CONSUMER_SECRET=<CONSUMER-SECRET>

# Redis Credentials
REDIS_HOST=localhost
REDIS_PORT=6379
```

## API Documentation

To view the list of available APIs and their specifications, run the server and go to `http://localhost:3000/v1/docs` in your browser. This documentation page is automatically generated using the [swagger](https://swagger.io/) definitions written as comments in the route files.

### API Endpoints

List of available routes:

**Auth routes**:\
`POST /v1/user/register` - register\
`POST /v1/user/login` - login\
`POST /v1/user/logout` - logout\

**User routes**:\
`POST /v1/tasks/createTask` - create a task\
`GET /v1/tasks/listTask` - get all task list\
`GET /v1/tasks/completedTask` - get completed task list\


### To run this project, do the following step:
1. clone this project
2. Open two terminals
3. Navigate to directory in both the terminal windows
4. Now Open the project directory and set the credentials in `.env` file
5. Go to terminal window 1 and hit this command `npm i && npm run dev`
5. Go to terminal window 2 and hit this command `npm run worker-dev`
6. open `http://localhost:3000/v1/docs` and play with swagger