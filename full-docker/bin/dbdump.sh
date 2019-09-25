#!/bin/bash
docker exec vipgo_db_1 sh -c 'exec mysqldump --all-databases -uroot -p"demo"' > all-databases.sql
