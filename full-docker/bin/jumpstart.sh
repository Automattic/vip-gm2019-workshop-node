#!/bin/bash

echo "Cleaning up and moving bootstrap files into place"

read -p "Are you sure? " -n 1 -r
echo    # (optional) move to a new line
if [[ ! $REPLY =~ ^[Yy]$ ]]
then
    exit 1
fi

echo "removing old container data for DB, Redis, WP files and WP uploads"
rm -rf db_data redisdata uploads wp_data

echo "copying DB dump and Uploads files into place"
mkdir dbimport
cp demo_data/*.sql dbimport
tar zxfv demo_data/uploads.tar.gz

echo "cloning GitHub repos"
git clone https://github.com/Automattic/vip-go-mu-plugins-built.git
git clone https://github.com/Automattic/vip-go-skeleton.git

echo "adding custom WordPress plugin"
cp demo_data/node-refresh.php vip-go-skeleton/client-mu-plugins

echo "CLIENT_DIR=vip-go-skeleton" > .env
echo "your development repo is vip-go-skeleton, change it in .env"

echo "Starting all containers - open http://localhost:2000 for WordPress and :2000 for Node.js"
docker-compose up --build
