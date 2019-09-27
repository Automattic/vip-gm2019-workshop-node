# Dockerfile for Node.js environment
# see https://github.com/BretFisher/node-docker-good-defaults for tips

# Node version 10
FROM node:10

# update Node to the latest version
RUN npm i npm@latest -g

# Install all the dependencies
RUN mkdir /opt/node_app && chown node:node /opt/node_app
WORKDIR /opt/node_app
# the official node image provides an unprivileged user as a security best practice
# but we have to manually enable it. We put it here so npm installs dependencies as the same
# user who runs the app. 
# https://github.com/nodejs/docker-node/blob/master/docs/BestPractices.md#non-root-user
USER node
# grab the package.json for the server
COPY server/package.json server/package-lock.json* ./
RUN npm install --no-optional && npm cache clean --force
ENV PATH /opt/node_app/node_modules/.bin:$PATH

# now copy all the files
WORKDIR /opt/node_app/app
COPY . .

# Start node
CMD [ "node", "./server/index.js" ]