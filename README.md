# Demystifying Node and React - VIP GM 2019 Workshop
vip-gm2019-workshop-node

## Objectives

Demonstrate a full Node.js, React, Redis stack interacting with WordPress

Show the differences between a node.js server, a React client, and the other components

Please use the slides!

## How to use this repository

Set this repository up in your home directory

```bash
$ git clone https://github.com/Automattic/vip-gm2019-workshop-node.git
$ cd vip-gm2019-workshop-node
```

## Desktop Exercises

### Setting up Node.js

Install NVM and Node:

Install [Node Version Manager](https://github.com/nvm-sh/nvm)

```bash
$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
```

Install Node.js LTS

```bash
$ nvm install 10
$ nvm use 10
$ nvm ls
```

Install Yarn, an alternative package manager (or use NPM if you prefer)

```bash
$ curl -o- -L https://yarnpkg.com/install.sh | bash
$ yarn --version
```

### Exercise 1: Creating a Node.js server: part one

In this exercise we'll create a Node.js server application that handles one request

Create a new folder and use npm (or yarn) to initialize

```bash
$ mkdir server
$ cd server
$ npm init -y
# or, with yarn
$ yarn init -y
```

Install Express.js

```bash
# install with npm
$ npm i express
# or install with yarn
$ yarn add express
```

Create a server.js file (it doesn't need to be named server, but it's more descriptive)

```bash
$ touch server.js
```

Copy the contents of [index.js](exercises/ex1-node-server/index.js) in the exercise directory into the new file

```javascript
// v1 - basic ping/pong demo

const express = require('express')
const port = 4000

// Express
const app = express()

// Define a route responding to GET requests for /ping
app.get('/ping', (req, res) => {
    return res.send('pong')
})

// Listen to traffic on a port
app.listen(port, () => {
    console.log(`listening on PORT ${port}`)
})
```

Execute the file ("run it")

```bash
$ node server.js
```

Test it using curl (in another Terminal window), or your browser

```bash
$ curl http://localhost:4000/ping
```

To stop the server, press CTRL-C


### Exercise 2 - Creating a Node.js server: Part Two

In this exercise we'll add some logging

Install morgan:

```bash
$ npm i morgan
# or (yarn)
$ yarn add morgan
```

Note that this modifies the package.json file and node_modules directory;
this happens every time you add/remove a package from your project.

Add morgan to your app

Require it (below the other require statements)

```javascript
const morgan = require('morgan');
```

And then after app is created:

```javascript
app.use( morgan('dev') );
```

Now run the server again and test it again. You should see each request logged.

If you have any problems, the code updates are in [Exercise 2](exercises/ex1-node-server/index.js)


### Exercise 3: Fetching data

This exercise will add a remote request to the project

Install axios and cors:

```bash
$ npm i axios cors
```

Require them in server.js:

```javascript
const axios = require('axios');
const cors = require('cors');
```

Then use cors and json (from Express.js) with the app:

```javascript
app.use( express.json() )
app.use( cors() );
```

Add a /users route:

```javascript
app.get( '/users', async (req, res) => {
    const count = req.query.count || 10;
    const response = await axios.get( 'https://randomuser.me/api?results=' + count );
    res.json( { data: response.data.results } );
})
```

Start the server again:

```bash
$ node server.js
```

Test using curl or your browser:

```bash
$ curl localhost:4000/users
$ curl localhost:4000/users?count=1
```






### Exercise 3 - Create a React app

Install the create-react-app globally

```bash
$ yarn global add create-react-app
// or
$ npm install -g create-react-app

$ create-react-app myApp
$ cd myApp

$ yarn start
// or
$ npm start
```

Replace your App.js file with this one:

```bash
$ cp vip-gm2019-workshop-node/exercises/ex4-react-node/App.js src/App.js
```

Now if you have the node server running on port 4000, your React project on port 3000 can make requests for users to it.

### Exercise 4 - Build and serve React with Node.js

Build the app for production

```bash
$ yarn build
// or 
$ npm run build
```

Back in the server (or index.js), define the static files to be served:

```javascript
// Import the path library
const path = require( ‘path’ );

// Serve client built files
app.use( express.static( path.join( __dirname, '../path/build/directory/' ) ) )
```

Respond to requests for / with our index file

```javascript
// map / to serve index.html
app.get( '/', ( req, res ) => {
    res.sendFile( 'index.html', {
        root: path.join( __dirname, '../path/build/directory' ) }
    );
} );
```

Now restart the server:

```bash
$ node index.js //or server.js
```

### Exercise 5 - Redis caching

Install redis

```bash
$ brew install redis
```

Two ways to start redis:

```bash
// redis as a backend service (opened automatically after reboot…)
$ brew services start redis

// redis as a simple service
$ redis-server /usr/local/etc/redis.conf
```

Start the cli:

```bash
$ redis-cli
> get foo
(nil)
> set foo bar
OK
> get foo
"bar"
> exit
$
```

Install redis client to the server project

```bash
$ npm install redis
// or
$ yarn add redis
```

Require the redis client class and create the client:

```javascript
const redis = require( 'redis' );
const client = redis.createClient( 6379 );
```

Replace the /users route with:

```javascript
app.get( '/users', async ( req, res ) => {
    const count = req.query.count || 10;
    const cacheKey = 'users-' + count;
    return client.get( cacheKey, async ( err, results ) => {
        if ( results ) {
            return res.json({ source: 'cache', data: JSON.parse(results) })
        }

        const response = await axios.get( `https://randomuser.me/api?results=${count}` )

        client.setex( cacheKey, 3600, JSON.stringify(response.data.results) )
        
        res.json( { source: 'api', data: response.data.results } )
   } )
} )
```

Restart your server, and try it:

```bash
$ curl localhost:4000/users?count=1
$ curl localhost:4000/users?count=1
$ curl localhost:4000/users?count=2
$ curl localhost:4000/users?count=2
```

The logs should display something like:

```
GET /users?count=1 200 315.831 ms - 1097
GET /users?count=1 200 0.964 ms - 1099
GET /users?count=2 200 135.653 ms - 2148
GET /users?count=2 200 0.618 ms - 2150
```


## Desktop Exercises Review

A complete project is in the [full-desktop](/exercises/full-desktop/) directory. 

Run these commands:

#### TK

## Docker exercises

This is a complete, working project that we'll go through so you understand what the pieces are,
and then you can modify and rebuild it

Here are the steps to get the full environment up and running

```bash
$ cd full-docker
$ ./bin/jumpstart.sh
```

All the container logs will display in the same window

Open http://localhost:2000 to run WordPress (user welcome/welcome)

Open http://localhost:4000 to load the Node/React project

### Customizing

You can modify or tailor the jumpstart commands to start with an empty WordPress DB -
if the DB is not initialized from the SQL dump, this will go through the usual WordPress set up steps.
You can also skip the uploads folder.

To shell into the host:

```bash
$ docker exec -it full-docker_web_1 /bin/bash
```

To stop & restart:

```bash
$ docker-compose down
$ docker-compose up --build
```

When customizing the client, be sure to run `yarn install` before testing, then `yard start` to test locally, and finally `yarn build` to build the files before restarting the docker compose containers and rebuilding the node container.

