# VIP Go Local Development

## Requirements:
- Docker Desktop
- Git

## Components:
- a vanilla WordPress server
- a mariadb instance
- a memcached daemon server
- a visualizer

## Quickstart

### Manually

- to clean up, rm the wp_data and db_data dirs (optional)
- eventually this project will include a db dump and uploads zip
- grab a mysql dump and place the sql file in a dbinit directory here
cp db.sql dbinit
- unzip the uploads into that dir
- or, leave those out for a brand new site
- clone your VIP GO repo (Or, optionally, the starter skeleton)
git clone https://github.com/Automattic/vip-go-skeleton.git
git clone https://github.com/wpcomvip/INSERT-REPO-NAME.git
export CLIENT_DIR=vip-go-skeleton
- update submodules
cd INSERT-REPO-NAME
git submodule init
git submodule update
- update .env to reference your repo
- clone the VIP Go MU Plugins (built version)
git clone https://github.com/Automattic/vip-go-mu-plugins-built.git
docker-compose up -d --build
- open localhost:2000 to access the WordPress site
- to shell into the web host
docker exec -it vipgo_web_1 /bin/bash
- open localhost:4000 to run the React front-end app (which talks to Node.js, which talks to WordPress)

## Commands

Create a DB dump / snapshot:

$ docker exec some-mariadb sh -c 'exec mysqldump --all-databases -uroot -p"$MYSQL_ROOT_PASSWORD"' > /some/path/on/your/host/all-databases.sql

Restore a db:

$ docker exec -i some-mariadb sh -c 'exec mysql -uroot -p"$MYSQL_ROOT_PASSWORD"' < /some/path/on/your/host/all-databases.sql

