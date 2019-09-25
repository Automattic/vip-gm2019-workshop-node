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

- copy the env-sample to .env and edit it
cp env-sample .env
- to clean up, rm the wp_data and db_data dirs (optional)
- grab a mysql dump and place the sql file in a dbinit directory here
cp db.sql dbinit
- clone your VIP GO repo (Or, optionally, the starter skeleton)
git clone https://github.com/Automattic/vip-go-skeleton.git
git clone https://github.com/wpcomvip/INSERT-REPO-NAME.git
- update submodules
cd INSERT-REPO-NAME
git submodule init
git submodule update
- update .env to reference your repo
- clone the VIP Go MU Plugins (built version)
git clone https://github.com/Automattic/vip-go-mu-plugins-built.git
- docker-compose up -d
- open localhost:2000 to access the site
- to shell into the web host
docker exec -it vipgo_web_1 /bin/bash

## Commands

Create a DB dump / snapshot:

$ docker exec some-mariadb sh -c 'exec mysqldump --all-databases -uroot -p"$MYSQL_ROOT_PASSWORD"' > /some/path/on/your/host/all-databases.sql

Restore a db:

$ docker exec -i some-mariadb sh -c 'exec mysql -uroot -p"$MYSQL_ROOT_PASSWORD"' < /some/path/on/your/host/all-databases.sql

