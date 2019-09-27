# Demystifying Node and React - VIP GM 2019 Workshop
vip-gm2019-workshop-node

## Objectives

## How to use this repository

Set this repository up in your home directory

```bash
$ git clone https://github.com/Automattic/vip-gm2019-workshop-node.git
$ cd vip-gm2019-workshop-node
```

## Exercises

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


## Jumping to the end

We'll work backwards and forwards.

We have today just the WP and DB in docker compose.

Soon, we'll add the Node & React client/server code and a Docker file to create the node server image

Also, a starter DB image with a few test posts for the API will be set up, that goes in dbimport when starting up

For now, here are the steps to get WordPress (with no data) up and running

```bash
$ cd full-docker
$ git clone https://github.com/Automattic/vip-go-mu-plugins-built.git
$ git clone https://github.com/Automattic/vip-go-skeleton.git
$ docker-compose up
```

All the container logs will display in the same window
Open http://localhost:2000 to run WordPress
Open http://localhost:4000 to load the Node/React project

If the DB was not initialized, this will go through the usual WordPress set up steps.

To shell into the host:

```bash
$ docker exec -it full-docker_web_1 /bin/bash
```

To stop:

```bash
$ docker-compose down
```


