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

### Exercise 1 - Learn Node.js

Install NVM and Node:

Install [Node Version Manager](https://github.com/nvm-sh/nvm)

```bash
$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
```

Install Node.js LTS

```bash
$ nvm install 10
$ nvm ls
```

Install Yarn, an alternative package manager (or use NPM if you prefer)

```bash
$ curl -o- -L https://yarnpkg.com/install.sh | bash
$ yarn --version
```

Create the index.js

Copy the index.js file in the exercise directory into the server dir, or edit the empty file.

### Exercise 2 - Fetch from an API

Copy the index.js from the ex2 dir or edit the existing file to match.

### Exercise 3 - Create a React app

Install the create-react-app globally



### Exercise 4 - Build and serve React with Node.js

### Desktop Exercises Review

A complete project is in the [full-desktop](/exercises/full-desktop/) directory. 

Run these commands:


## Docker exercises

After following the exercises above, here's a complete project.

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

